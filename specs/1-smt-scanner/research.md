# Research: Bybit Futures SMT & Key-Level Real-Time Scanner (NY Time)

**Feature**: `1-smt-scanner`  
**Date**: 2025-12-03

This document resolves key unknowns and `NEEDS CLARIFICATION` items from the plan’s Technical
Context and prepares for detailed design and contracts.

## Decisions

### Charting / Visualization Library

- **Decision**: Use a lightweight time-series charting library such as uPlot or similar minimalist
  canvas-based library, wrapped behind an internal chart adapter.
- **Rationale**:
  - Keeps bundle small and rendering performance high when many data points update rapidly.
  - Easier to integrate into a custom Tailwind-based layout than heavyweight full platforms.
  - Internal adapter allows future replacement (e.g., TradingView lightweight charts) without
    rewriting SMT or key-level logic.
- **Alternatives considered**:
  - **Chart.js**: Simple API but less optimized for very frequent updates; heavier bundle.
  - **TradingView lightweight charts**: Strong trading focus but tighter licensing/embedding
    constraints; can be adopted later behind the adapter if needed.

### Testing Stack

- **Decision**: Use a JavaScript unit test runner (e.g., Jest or Vitest) for core logic and a
  browser-focused E2E tool such as Playwright or Cypress for integration journeys.
- **Rationale**:
  - Key-level and SMT engines are pure logic and benefit from fast, isolated unit tests.
  - User journeys (scanner table, SMT panel, alerts) need browser automation to validate timing and
    visual behavior.
- **Alternatives considered**:
  - Relying only on manual testing: too risky for subtle SMT or NY time bugs.
  - Using only unit tests: would miss critical UI/interaction regressions.

### Bybit Data Assumptions

- **Decision**:
  - Use Bybit REST kline endpoints for initial and backfill OHLC data.
  - Use Bybit WebSocket v5 ticker or trade streams for real-time last price updates.
  - Normalize all timestamps to New York time for key-level computation.
- **Rationale**:
  - Matches project constitution: free, real-time WebSocket + REST.
  - Separates initial history loading from ongoing real-time streaming.
- **Alternatives considered**:
  - Polling REST for prices: less real-time, higher risk of rate-limit issues.
  - Deriving candles solely from trades: more complex and unnecessary for this phase.

### SMT Rule Formalization

- **Decision**:
  - Represent each symbol’s price series per timeframe as a sequence of pivots labelled HH, HL, LH,
    LL based on recent swing highs/lows or candle extrema.
  - For 2-pair SMT:
    - **Bullish**: A makes LL while B makes HL or equal low over the same window.
    - **Bearish**: A makes HH while B makes LH or equal high over the same window.
  - For 3-pair SMT:
    - Bullish/bearish events require at least two confirming pairs and at least one deviating pair,
      as defined in the spec.
- **Rationale**:
  - Closely follows PRD wording and is testable via unit tests on candle arrays.
  - Keeps rules transparent and reproducible.
- **Alternatives considered**:
  - Using complex indicator-based SMT approximations: less transparent and harder to validate.

### Observability & Logging

- **Decision**:
  - Provide a developer/debug panel that can show:
    - the latest WebSocket connection status and last message timestamps,
    - current key levels for a selected symbol,
    - recent SMT events and their underlying pivots.
  - Implement lightweight logging hooks which can be toggled or throttled in production.
- **Rationale**:
  - Satisfies constitution’s observability principle without adding backend infrastructure.
  - Makes it easier to diagnose NY time alignment or SMT misfires.
- **Alternatives considered**:
  - No explicit observability: high risk of silent logic issues.

## Open Items

The following items remain design-level choices and can be decided during implementation planning:

- Exact charting library name (any lightweight option is acceptable as long as it fits the adapter).
- Specific test runner choice (Jest vs Vitest) and E2E tool (Playwright vs Cypress); both pairs
  satisfy requirements.


