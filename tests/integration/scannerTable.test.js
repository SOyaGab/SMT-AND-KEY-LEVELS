import { describe, it, expect } from "vitest";
import { buildScannerRows } from "../../src/state/scannerViewModel.js";

describe("scanner table view-model", () => {
  it("marks hits and near-hits based on price and levels", () => {
    const symbols = [{ id: "BTCUSDT", displayName: "BTCUSDT", lastPrice: 100 }];
    const keyLevelsBySymbol = {
      BTCUSDT: {
        pdh: 100,
        pdl: 90,
        nearHitThreshold: 0.1
      }
    };

    const rows = buildScannerRows({
      symbols,
      keyLevelsBySymbol,
      nearHitThreshold: 0.1
    });

    expect(rows[0].hits).toContain("PDH");
  });
});


