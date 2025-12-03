import { describe, it, expect } from "vitest";
import { computeKeyLevelsFromKlines } from "../../../src/core/keyLevelsEngine.js";

describe("computeKeyLevelsFromKlines", () => {
  it("builds a KeyLevelSet with highs and lows from klines", () => {
    const symbolId = "BTCUSDT";
    const daily = [
      // [timestamp, open, high, low, close]
      [0, 0, 101, 99, 100],
      [0, 0, 105, 95, 100]
    ];

    const result = computeKeyLevelsFromKlines(
      symbolId,
      { daily, weekly: daily, monthly: daily, quarterly: daily, h4: daily },
      0.001
    );

    expect(result.symbolId).toBe(symbolId);
    expect(result.pdh).toBe(105);
    expect(result.pdl).toBe(95);
    expect(result.nearHitThreshold).toBe(0.001);
  });
});


