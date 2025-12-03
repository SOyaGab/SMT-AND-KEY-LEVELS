import DashboardPage from "./pages/DashboardPage.js";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Bybit SMT & Key-Level Scanner
            </h1>
            <p className="text-xs text-slate-400">
              Real-time NY-aligned key levels and SMT divergence dashboard
            </p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Prototype shell
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <DashboardPage />
      </main>
    </div>
  );
}

export default App;


