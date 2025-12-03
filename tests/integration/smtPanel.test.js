import { describe, it, expect } from "vitest";
import { buildSmtEventList } from "../../src/state/smtViewModel.js";

describe("SMT view-model", () => {
  it("converts SMT events into list items", () => {
    const events = [
      {
        id: "1",
        direction: "BULLISH",
        timeframe: "5m",
        symbolPivots: {
          BTCUSDT: { type: "LL", price: 1, time: 1 },
          ETHUSDT: { type: "HH", price: 2, time: 2 }
        }
      }
    ];

    const list = buildSmtEventList(events);
    expect(list[0].symbols).toEqual(["BTCUSDT", "ETHUSDT"]);
  });
});


