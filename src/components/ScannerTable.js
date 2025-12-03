import ScannerTableRow from "./ScannerTableRow.js";

function ScannerTable({ rows }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60">
      <table className="min-w-full border-collapse text-left text-xs">
        <thead className="bg-slate-900/80">
          <tr className="border-b border-slate-800/80">
            <th className="px-3 py-2 font-medium text-slate-300">Symbol</th>
            <th className="px-3 py-2 font-medium text-slate-300">Price</th>
            <th className="px-3 py-2 font-medium text-slate-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="px-3 py-6 text-center text-xs text-slate-500"
              >
                No symbols loaded yet.
              </td>
            </tr>
          ) : (
            rows.map((row) => <ScannerTableRow key={row.id} row={row} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ScannerTable;


