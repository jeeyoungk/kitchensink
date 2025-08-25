import { describe, expect, it } from "vitest";
import { chain, withDefaultOnError } from "./chain";

describe("chain", () => {
  it("should create a chain with a value", () => {
    const inner = (input: number) => {
      if (input == 5) throw new Error("5 is not allowed");
      return input * 2;
    };
    const fn = chain(inner).with(withDefaultOnError, 42).named("chainedFn");
    expect((fn as any).displayName).toBe("chainedFn");
    expect(fn.name).toBe("chainedFn");
    expect(fn(5)).toBe(42);
    expect(fn(6)).toBe(12);
  });
});
