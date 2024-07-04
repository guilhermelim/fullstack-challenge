// src/utils/math.test.ts
import { sum } from "./math";

describe("sum function", () => {
  it("adds two numbers correctly", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("adds two negative numbers correctly", () => {
    expect(sum(-1, -2)).toBe(-3);
  });
});
