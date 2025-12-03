import { describe, it, expect } from "vitest";
import { detectTwoPairSmt } from "../../../src/core/smtEngine.js";

describe("detectTwoPairSmt", () => {
  it("detects a simple bullish SMT pattern", () => {
    const candlesA = [
      [1, 0, 0, 0, 100],
      [2, 0, 0, 0, 90],
      [3, 0, 0, 0, 95]
    ];
    const candlesB = [
      [1, 0, 0, 0, 100],
      [2, 0, 0, 0, 110],
      [3, 0, 0, 0, 105]
    ];

    const evt = detectTwoPairSmt({
      symbolA: "A",
      symbolB: "B",
      candlesBySymbol: { A: candlesA, B: candlesB },
      timeframe: "5m"
    });

    expect(evt?.direction).toBe("BULLISH");
    expect(Object.keys(evt.symbolPivots)).toEqual(["A", "B"]);
  });
});


