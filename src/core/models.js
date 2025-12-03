export function createSymbol({ id, displayName, lastPrice = 0, statusFlags = [] }) {
  return {
    id,
    displayName: displayName ?? id,
    lastPrice,
    statusFlags: new Set(statusFlags)
  };
}

export function createKeyLevelSet({
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
}) {
  return {
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
  };
}


