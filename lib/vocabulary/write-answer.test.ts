import { describe, expect, it } from "vitest";
import { isAcceptableWrittenAnswer } from "./write-answer";

describe("isAcceptableWrittenAnswer", () => {
  it("accepts slash alternatives from the source notation", () => {
    expect(isAcceptableWrittenAnswer("drop in", "drop in / by / over", true, "I")).toBe(true);
    expect(isAcceptableWrittenAnswer("drop by", "drop in / by / over", true, "I")).toBe(true);
    expect(isAcceptableWrittenAnswer("drop over", "drop in / by / over", true, "I")).toBe(true);
  });

  it("accepts optional phrasal segments with or without the optional word", () => {
    expect(isAcceptableWrittenAnswer("check out", "check out (of)", true, "I")).toBe(true);
    expect(isAcceptableWrittenAnswer("check out of", "check out (of)", true, "I")).toBe(true);
    expect(isAcceptableWrittenAnswer("check out from", "check out (of)", true, "I")).toBe(false);
  });

  it("accepts real multi-word objects without an arbitrary word limit", () => {
    expect(isAcceptableWrittenAnswer("count on my very best friend from university", "count on somebody", true, "I")).toBe(true);
    expect(isAcceptableWrittenAnswer("bring the extremely complicated financial problem from yesterday up", "bring something up", true, "S")).toBe(true);
    expect(isAcceptableWrittenAnswer("bring up the extremely complicated financial problem from yesterday", "bring something up", true, "S")).toBe(true);
  });

  it("accepts both noun-object positions for simple separable phrasal verbs", () => {
    expect(isAcceptableWrittenAnswer("call the match off", "call something off", true, "S")).toBe(true);
    expect(isAcceptableWrittenAnswer("call off the match", "call something off", true, "S")).toBe(true);
    expect(isAcceptableWrittenAnswer("pick Sarah up", "pick someone up", true, "S")).toBe(true);
    expect(isAcceptableWrittenAnswer("pick up Sarah", "pick someone up", true, "S")).toBe(true);
    expect(isAcceptableWrittenAnswer("pick up her sister", "pick someone up", true, "S")).toBe(true);
    expect(isAcceptableWrittenAnswer("call off her meeting", "call something off", true, "S")).toBe(true);
  });

  it("requires pronoun objects to stay between verb and particle", () => {
    expect(isAcceptableWrittenAnswer("call it off", "call something off", true, "S")).toBe(true);
    expect(isAcceptableWrittenAnswer("call off it", "call something off", true, "S")).toBe(false);
    expect(isAcceptableWrittenAnswer("pick her up", "pick someone up", true, "S")).toBe(true);
    expect(isAcceptableWrittenAnswer("pick up her", "pick someone up", true, "S")).toBe(false);
    expect(isAcceptableWrittenAnswer("pick herself up", "pick someone up", true, "S")).toBe(true);
    expect(isAcceptableWrittenAnswer("pick up herself", "pick someone up", true, "S")).toBe(false);
  });

  it("keeps somebody and someone interchangeable in phrasal placeholders", () => {
    expect(isAcceptableWrittenAnswer("count on someone", "count on somebody", true, "I")).toBe(true);
    expect(isAcceptableWrittenAnswer("count on him", "count on somebody", true, "I")).toBe(true);
  });

  it("does not relax ordinary non-phrasal answers", () => {
    expect(isAcceptableWrittenAnswer("reliable", "reliable")).toBe(true);
    expect(isAcceptableWrittenAnswer("very reliable", "reliable")).toBe(false);
  });
});
