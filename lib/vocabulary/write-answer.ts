import { normaliseVocabularyAnswer } from "./game-engine";

const phrasalObjectTokens = new Set(["someone", "something", "someone/something"]);
const phrasalObjectPattern = "(?:\\S+(?:\\s+\\S+)*)";
const postParticleObjectPattern = "(?!(?:me|you|him|her|it|us|them)(?:\\s|$))(?:\\S+(?:\\s+\\S+)*)";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function expandOptionalWrittenAnswerVariants(expected: string, isPhrasal: boolean) {
  if (!isPhrasal || !/\([^)]+\)/.test(expected)) return [expected];

  const withOptional = expected.replace(/\(([^)]+)\)/g, "$1").replace(/\s+/g, " ").trim();
  const withoutOptional = expected.replace(/\s*\([^)]+\)/g, "").replace(/\s+/g, " ").trim();
  return Array.from(new Set([withOptional, withoutOptional]));
}

function writeAnswerTokenPattern(token: string, allowPhrasalObject = false) {
  if (allowPhrasalObject && phrasalObjectTokens.has(token)) return phrasalObjectPattern;

  switch (token) {
    case "one's":
      return "(?:one's|my|your|his|her|our|their|someone's|somebody's)";
    case "someone's":
      return "(?:someone's|somebody's|my|your|his|her|our|their)";
    case "someone/something":
      return "(?:someone|somebody|something|me|you|him|her|us|them|it|this|that)";
    case "someone":
      return "(?:someone|somebody|me|you|him|her|us|them)";
    case "something":
      return "(?:something|it|this|that)";
    default:
      if (token.includes("/")) {
        return `(?:${token.split("/").map(escapeRegExp).join("|")})`;
      }
      return escapeRegExp(token);
  }
}

export function isAcceptableWrittenAnswer(
  value: string,
  expected: string,
  isPhrasal = false,
  phrasalType?: string,
) {
  const actual = normaliseVocabularyAnswer(value);

  for (const expectedVariant of expandOptionalWrittenAnswerVariants(expected, isPhrasal)) {
    const canonical = normaliseVocabularyAnswer(expectedVariant);
    if (actual === canonical) return true;

    const tokens = canonical.split(" ");
    const pattern = tokens
      .map((token) => writeAnswerTokenPattern(token, isPhrasal))
      .join("\\s+");

    if (new RegExp(`^${pattern}$`, "i").test(actual)) return true;

    const isSimpleSeparablePattern =
      isPhrasal &&
      phrasalType?.startsWith("S") &&
      tokens.length === 3 &&
      phrasalObjectTokens.has(tokens[1]);

    if (isSimpleSeparablePattern) {
      const verbPattern = writeAnswerTokenPattern(tokens[0]);
      const particlePattern = writeAnswerTokenPattern(tokens[2]);
      const objectBetweenPattern = `${verbPattern}\\s+${phrasalObjectPattern}\\s+${particlePattern}`;
      const objectAfterPattern = `${verbPattern}\\s+${particlePattern}\\s+${postParticleObjectPattern}`;

      if (
        new RegExp(`^${objectBetweenPattern}$`, "i").test(actual) ||
        new RegExp(`^${objectAfterPattern}$`, "i").test(actual)
      ) {
        return true;
      }
    }
  }

  return false;
}
