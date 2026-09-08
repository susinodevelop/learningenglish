import type { StudyGroup, VocabularyProgress } from "./study-groups";
import type { StudyAttemptInput } from "./study-db";

export type RemoteStudyState = {
  authenticated: boolean;
  userEmail?: string | null;
  groups: StudyGroup[];
  progress: VocabularyProgress;
};

const DEVICE_ID_KEY = "learningenglish:device-id:v1";
const PENDING_GROUPS_KEY = "learningenglish:pending-groups:v1";
const PENDING_ATTEMPTS_KEY = "learningenglish:pending-attempts:v1";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getDeviceId() {
  if (typeof window === "undefined") return "server";
  const existing = window.localStorage.getItem(DEVICE_ID_KEY);
  if (existing) return existing;

  const generated = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? `device-${crypto.randomUUID()}`
    : `device-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(DEVICE_ID_KEY, generated);
  return generated;
}

async function parseState(response: Response): Promise<RemoteStudyState> {
  if (response.status === 401) {
    return { authenticated: false, groups: [], progress: {} };
  }
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Study sync failed with HTTP ${response.status}.`);
  }
  return response.json() as Promise<RemoteStudyState>;
}

export async function fetchRemoteStudyState() {
  const response = await fetch("/api/study/state", {
    method: "GET",
    cache: "no-store",
    credentials: "same-origin",
  });
  return parseState(response);
}

export async function migrateLocalStudyStateRemote(
  groups: StudyGroup[],
  progress: VocabularyProgress,
) {
  const response = await fetch("/api/study/migrate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      deviceId: getDeviceId(),
      groups,
      progress,
    }),
  });
  return parseState(response);
}

export async function saveRemoteStudyGroups(groups: StudyGroup[]) {
  const response = await fetch("/api/study/groups", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ groups }),
  });

  if (response.status === 401) return false;
  if (!response.ok) throw new Error(await response.text());
  return true;
}

export async function saveRemoteVocabularyAttempt(attempt: StudyAttemptInput) {
  const response = await fetch("/api/study/attempts", {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(attempt),
  });

  if (response.status === 401) return false;
  if (!response.ok) throw new Error(await response.text());
  return true;
}

export function queuePendingGroups(groups: StudyGroup[]) {
  writeJson(PENDING_GROUPS_KEY, groups);
}

export function queuePendingAttempt(attempt: StudyAttemptInput) {
  const current = readJson<StudyAttemptInput[]>(PENDING_ATTEMPTS_KEY, []);
  current.push(attempt);
  writeJson(PENDING_ATTEMPTS_KEY, current.slice(-2000));
}

export async function flushPendingStudyChanges() {
  const pendingGroups = readJson<StudyGroup[] | null>(PENDING_GROUPS_KEY, null);
  if (pendingGroups) {
    const saved = await saveRemoteStudyGroups(pendingGroups);
    if (!saved) return false;
    window.localStorage.removeItem(PENDING_GROUPS_KEY);
  }

  const pendingAttempts = readJson<StudyAttemptInput[]>(PENDING_ATTEMPTS_KEY, []);
  if (pendingAttempts.length > 0) {
    let completed = 0;
    for (const attempt of pendingAttempts) {
      try {
        const saved = await saveRemoteVocabularyAttempt(attempt);
        if (!saved) return false;
        completed += 1;
      } catch {
        break;
      }
    }

    if (completed > 0) {
      const remaining = pendingAttempts.slice(completed);
      if (remaining.length === 0) window.localStorage.removeItem(PENDING_ATTEMPTS_KEY);
      else writeJson(PENDING_ATTEMPTS_KEY, remaining);
    }
  }

  return true;
}

export async function initialiseRemoteStudyState(
  groups: StudyGroup[],
  progress: VocabularyProgress,
) {
  const migrated = await migrateLocalStudyStateRemote(groups, progress);
  if (!migrated.authenticated) return migrated;

  await flushPendingStudyChanges();
  return fetchRemoteStudyState();
}
