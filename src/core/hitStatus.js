export function computeHitAndNearHitFlags(price, levels, nearHitThresholdFraction) {
  if (price == null || !levels) {
    return { hits: [], nearHits: [] };
  }
  const t = nearHitThresholdFraction ?? levels.nearHitThreshold ?? 0;

  const levelEntries = [
    ["PDH", levels.pdh],
    ["PDL", levels.pdl],
    ["PWH", levels.pwh],
    ["PWL", levels.pwl],
    ["PMH", levels.pmh],
    ["PML", levels.pml],
    ["QTH", levels.qth],
    ["QTL", levels.qtl],
    ["H4H", levels.h4High],
    ["H4L", levels.h4Low]
  ];

  const hits = [];
  const nearHits = [];

  for (const [label, levelPrice] of levelEntries) {
    if (levelPrice == null) continue;
    if (price === levelPrice) {
      hits.push(label);
      continue;
    }
    if (t > 0) {
      const diffFrac = Math.abs(price - levelPrice) / levelPrice;
      if (diffFrac <= t) {
        nearHits.push(label);
      }
    }
  }

  return { hits, nearHits };
}


