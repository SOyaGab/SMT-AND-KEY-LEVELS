import { createKeyLevelSet } from "./models.js";
import { getNyPartitionStart } from "../utils/timezoneNy.js";

export function computeKeyLevelsFromKlines(symbolId, { daily, weekly, monthly, quarterly, h4 }, nearHitThreshold) {
  const [pdh, pdl] = highLowFromKlines(daily);
  const [pwh, pwl] = highLowFromKlines(weekly);
  const [pmh, pml] = highLowFromKlines(monthly);
  const [qth, qtl] = highLowFromKlines(quarterly);
  const [h4High, h4Low] = highLowFromKlines(h4);

  const now = Date.now();
  const lastUpdatedAt = getNyPartitionStart(now, "day").getTime();

  return createKeyLevelSet({
    symbolId,
    pdh,
    pdl,
    pwh,
    pwl,
    pmh,
    pml,
    qth,
    qtl,
    h4High,
    h4Low,
    nearHitThreshold,
    lastUpdatedAt
  });
}

function highLowFromKlines(klines) {
  if (!klines || klines.length === 0) {
    return [null, null];
  }
  let high = -Infinity;
  let low = Infinity;
  for (const k of klines) {
    const h = Number(k[2]);
    const l = Number(k[3]);
    if (!Number.isNaN(h) && h > high) high = h;
    if (!Number.isNaN(l) && l < low) low = l;
  }
  if (high === -Infinity || low === Infinity) return [null, null];
  return [high, low];
}


