function ScannerTableRow({ row }) {
  const hitLabel =
    row.hits.length > 0 ? row.hits.join(", ") : row.nearHits.length > 0 ? "Near" : "-";
  const hitClass =
    row.hits.length > 0
      ? "text-emerald-400"
      : row.nearHits.length > 0
        ? "text-amber-300"
        : "text-slate-500";

  return (
    <tr className="border-b border-slate-800/60 last:border-none">
      <td className="px-3 py-2 text-xs font-medium text-slate-100">{row.displayName}</td>
      <td className="px-3 py-2 text-xs text-slate-200">{row.price?.toFixed?.(2) ?? "-"}</td>
      <td className={`px-3 py-2 text-xs font-medium ${hitClass}`}>{hitLabel}</td>
    </tr>
  );
}

export default ScannerTableRow;


