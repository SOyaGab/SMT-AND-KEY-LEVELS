# Implementation Plan: Bybit Futures SMT & Key-Level Real-Time Scanner (NY Time)

**Branch**: `1-smt-scanner` | **Date**: 2025-12-03 | **Spec**: `specs/1-smt-scanner/spec.md`  
**Input**: Feature specification from `/specs/1-smt-scanner/spec.md`

**Note**: This plan follows the project constitution (real-time NY-aligned key levels, browser-only,
zero-cost, explicit SMT logic, trader-centric UX, observability and performance targets).

## Summary

A browser-only dashboard that connects directly to Bybit WebSocket v5 and REST APIs to:

- scan all Bybit USDT futures in real time for NY-time-aligned key levels (PDH/PDL, PWH/PWL,
  PMH/PML, QTH/QTL, H4 high/low),
- detect bullish/bearish SMT divergence for user-selected 2–3 pairs across multiple timeframes, and
- surface the results via a fast table, SMT panel, chart overlays, and configurable alerts.

Implementation will use HTML, Tailwind CSS, and a small JavaScript application (vanilla JS or React)
running entirely in the browser, with `localStorage` used for user preferences, cached key levels,
and SMT logs.

## Technical Context

**Language/Version**: JavaScript (ES2020+) running in modern browsers  
**Primary Dependencies**: Tailwind CSS plus a lightweight time-series charting library (e.g., uPlot) wrapped behind an internal chart adapter  
**Storage**: Browser `localStorage` for cached key levels, SMT events/logs, and user settings  
**Testing**: JavaScript unit tests (e.g., Jest or Vitest) plus browser E2E tests (e.g., Playwright or Cypress)  
**Target Platform**: Desktop-class modern browsers (latest Chrome/Edge/Firefox) on typical trading machines  
**Project Type**: web (single-page frontend only)  
**Performance Goals**: Match spec success criteria (UI updates <300 ms for price changes, SMT detection <1 s) and remain responsive with all Bybit USDT futures symbols loaded  
**Constraints**: Browser-only, zero backend; must respect Bybit rate limits; UI must remain usable on a single monitor while trading  
**Scale/Scope**: All Bybit USDT futures; real-time scanning; SMT for a small set of user-selected pair groups per user session

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

For this project, every plan MUST explicitly verify:

- **Time & data alignment**: All daily/weekly/monthly/quarterly and 4H partitions are computed in
  New York time using Bybit data, and any DST handling is understood.
- **Architecture constraints**: The design remains browser-only and zero-cost (HTML + Tailwind CSS
  + vanilla JS or React; no custom backend or paid infra), or any deviation is clearly justified as
  a constitutional violation requiring governance review.
- **Explicit market logic**: Key-level and SMT rules used in this feature are written in clear,
  testable form (inputs, formulas, trigger conditions) and any `NEEDS CLARIFICATION` items are
  called out.
- **Trader-centric UX**: Planned UI surfaces (scanner table, SMT panel, chart overlays, alerts)
  keep signals legible and do not bury critical information behind optional visuals.
- **Observability & performance**: There is at least an initial plan for how this work will meet
  latency goals (e.g., <300 ms price-to-UI, <1 s SMT detection) and how it will be debugged in
  practice (logs, debug views, or similar).

**Gate evaluation (pre-design)**:

- Time & data alignment: **PASS** – Spec defines NY-time-aligned levels; research will refine DST
  handling and Bybit candle behavior.
- Architecture constraints: **PASS** – Plan is browser-only with Bybit WebSocket/REST and
  `localStorage`.
- Explicit market logic: **PARTIAL** – SMT and key-level rules are conceptually defined; research
  and data-model/contracts will formalize equations and pivot detection.
- Trader-centric UX: **PASS** – Spec focuses on scanner table, SMT panel, chart overlays, alerts.
- Observability & performance: **PARTIAL** – Success criteria exist; research will select concrete
  observability approach and load strategy.

No gate-blocking violations are present; Phase 0 research is required to turn PARTIAL items into
fully specified decisions.

## Project Structure

### Documentation (this feature)

```text
specs/1-smt-scanner/
├── plan.md              # This file (/speckit.plan output)
├── research.md          # Phase 0 output (decisions on data, SMT rules, charting, testing)
├── data-model.md        # Phase 1 output (entities, fields, relationships, state)
├── quickstart.md        # Phase 1 output (how to run/use the scanner in dev/prod)
├── contracts/           # Phase 1 output (Bybit usage notes, internal data contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks - not created here)
```

### Source Code (repository root)

```text
src/
├── api/                 # Bybit WebSocket + REST wrappers (fetch, parsing, error handling)
├── core/                # Key-level and SMT engines (pure logic, testable functions)
├── state/               # Application state management (symbols, settings, events)
├── components/          # UI components (table, SMT panel, chart wrapper, controls)
├── pages/               # Entry views (main dashboard)
└── utils/               # Timezone helpers (NY alignment, DST), formatting, logging

public/
├── index.html           # Root HTML document
└── assets/              # Icons, sounds (alert tones), static assets

tests/
├── unit/                # Pure logic tests (key-level computation, SMT detection)
├── integration/         # End-to-end flows (scanner table, SMT panel behavior)
└── perf/                # Optional performance/load checks for many symbols
```

**Structure Decision**: Single-page web app in `src/` with clear separation between pure logic
(`core/`), data access (`api/`), state (`state/`), and UI (`components/`, `pages/`), to keep SMT and
key-level engines testable and independent of the rendering layer.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| _None currently identified_ | N/A | N/A |


