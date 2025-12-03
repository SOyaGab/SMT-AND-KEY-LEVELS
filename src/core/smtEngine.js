import { detectSimplePivots } from "./pivots.js";

function latestPivot(pivots) {
  if (!pivots || pivots.length === 0) return null;
  return pivots[pivots.length - 1];
}

export function detectTwoPairSmt({ symbolA, symbolB, candlesBySymbol, timeframe }) {
  const pivotsA = detectSimplePivots(candlesBySymbol[symbolA] || []);
  const pivotsB = detectSimplePivots(candlesBySymbol[symbolB] || []);
  const lastA = latestPivot(pivotsA);
  const lastB = latestPivot(pivotsB);
  if (!lastA || !lastB) return null;

  if (lastA.type === "LL" && (lastB.type === "HH" || lastB.type === "HL")) {
    return {
      direction: "BULLISH",
      timeframe,
      symbolPivots: {
        [symbolA]: lastA,
        [symbolB]: lastB
      }
    };
  }
  if (lastA.type === "HH" && (lastB.type === "LL" || lastB.type === "LH")) {
    return {
      direction: "BEARISH",
      timeframe,
      symbolPivots: {
        [symbolA]: lastA,
        [symbolB]: lastB
      }
    };
  }
  return null;
}


