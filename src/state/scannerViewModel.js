import { computeHitAndNearHitFlags } from "../core/hitStatus.js";

export function buildScannerRows({ symbols, keyLevelsBySymbol, nearHitThreshold }) {
  return symbols.map((symbol) => {
    const levels = keyLevelsBySymbol[symbol.id];
    const { hits, nearHits } = computeHitAndNearHitFlags(
      symbol.lastPrice,
      levels,
      nearHitThreshold
    );

    return {
      id: symbol.id,
      displayName: symbol.displayName,
      price: symbol.lastPrice,
      hits,
      nearHits
    };
  });
}


