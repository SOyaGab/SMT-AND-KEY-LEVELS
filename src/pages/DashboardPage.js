import { useEffect, useState } from "react";
import { appStore } from "../state/store.js";
import { buildScannerRows } from "../state/scannerViewModel.js";
import ScannerTable from "../components/ScannerTable.js";
import { initializeDemoSymbols } from "../state/symbolsController.js";
import SmtPanel from "../components/SmtPanel.js";
import ChartWithSmtOverlay from "../components/ChartWithSmtOverlay.js";
import { bootstrapUserSettings } from "../state/userSettingsController.js";

function DashboardPage() {
  const [state, setState] = useState(appStore.state);

  useEffect(() => {
    initializeDemoSymbols();
    bootstrapUserSettings();
    const unsubscribe = appStore.subscribe(setState);
    return unsubscribe;
  }, []);

  return (
    <div className="space-y-4">
      <section>
        <h2 className="text-base font-semibold text-slate-100">
          Scanner Overview
        </h2>
        <p className="text-sm text-slate-400">
          This is the starting point for the Bybit futures SMT & key-level
          real-time scanner. Implementation will follow the structured tasks in
          <code className="ml-1 rounded bg-slate-900 px-1.5 py-0.5 text-xs">
            specs/1-smt-scanner/tasks.md
          </code>
          .
        </p>
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
        <p className="mb-2 font-medium text-slate-200">Next steps</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Implement Bybit API client and NY time helpers.</li>
          <li>Build the key-level engine and SMT detection logic.</li>
          <li>Add the scanner table, SMT panel, and alert controls.</li>
        </ul>
        <div className="mt-4 text-xs text-slate-500">
          <p>Symbols loaded: {state.symbols.length}</p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-semibold text-slate-100">
          User Story 1 – Scanner Table (Prototype)
        </h2>
        <ScannerTable
          rows={buildScannerRows({
            symbols: state.symbols,
            keyLevelsBySymbol: state.keyLevelsBySymbol,
            nearHitThreshold: 0.001
          })}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-slate-100">
            User Story 2 – SMT Panel
          </h2>
          <SmtPanel />
        </div>
        <div className="space-y-2">
          <h2 className="text-base font-semibold text-slate-100">Chart View</h2>
          <ChartWithSmtOverlay />
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;


