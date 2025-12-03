export function buildSmtEventList(events) {
  return (events || []).map((evt, idx) => ({
    id: evt.id ?? String(idx),
    direction: evt.direction,
    timeframe: evt.timeframe,
    symbols: Object.keys(evt.symbolPivots || {})
  }));
}


