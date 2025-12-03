export function createPivotInfo({ type, price, time }) {
  return { type, price, time };
}

export function detectSimplePivots(candles) {
  if (!candles || candles.length < 3) return [];
  const pivots = [];
  for (let i = 1; i < candles.length - 1; i++) {
    const prev = Number(candles[i - 1][4]);
    const curr = Number(candles[i][4]);
    const next = Number(candles[i + 1][4]);
    const ts = Number(candles[i][0]);
    if (curr > prev && curr > next) {
      pivots.push(createPivotInfo({ type: "HH", price: curr, time: ts }));
    } else if (curr < prev && curr < next) {
      pivots.push(createPivotInfo({ type: "LL", price: curr, time: ts }));
    }
  }
  return pivots;
}


