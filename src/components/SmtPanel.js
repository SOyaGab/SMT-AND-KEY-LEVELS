import { useEffect } from "react";
import { buildSmtEventList } from "../state/smtViewModel.js";
import { appStore } from "../state/store.js";

function SmtPanel() {
  const [state, setState] = React.useState(appStore.state);

  useEffect(() => {
    const unsub = appStore.subscribe(setState);
    return unsub;
  }, []);

  const events = buildSmtEventList(state.smtEvents);

  return (
    <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100">SMT Panel</h3>
        <span className="text-xs text-slate-500">
          Configs: {state.smtConfigs.length} · Events: {events.length}
        </span>
      </div>
      {events.length === 0 ? (
        <p className="text-xs text-slate-500">
          No SMT events yet. Configure pairs and feed candle data to see divergence.
        </p>
      ) : (
        <ul className="space-y-1 text-xs">
          {events.map((evt) => (
            <li
              key={evt.id}
              className="flex items-center justify-between rounded border border-slate-800/80 bg-slate-900/80 px-2 py-1"
            >
              <span
                className={
                  evt.direction === "BULLISH"
                    ? "text-emerald-300"
                    : "text-rose-300"
                }
              >
                {evt.direction} SMT
              </span>
              <span className="text-slate-400">
                {evt.timeframe} · {evt.symbols.join(", ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SmtPanel;


