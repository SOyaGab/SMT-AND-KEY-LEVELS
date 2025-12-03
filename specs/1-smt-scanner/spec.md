# Feature Specification: Bybit Futures SMT & Key-Level Real-Time Scanner (NY Time)

**Feature Branch**: `1-smt-scanner`  
**Created**: 2025-12-03  
**Status**: Draft  
**Input**: User description: "Build a zero-cost, browser-based real-time Bybit Futures scanner that tracks NY-time-aligned key levels and SMT divergence with clear trader-facing alerts and visualization."

## Clarifications

### Session 2025-12-03

- Q: How should the default “near-hit” threshold for key levels be defined and controlled? → A: User-configurable single global threshold, default 0.1%.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scan All Futures for Key Levels (Priority: P1)

An intraday trader wants to monitor all Bybit USDT futures contracts in one dashboard and see, in
real time, which coins are hitting or approaching important market structure levels (PDH/PDL,
PWH/PWL, PMH/PML, QTH/QTL, H4 high/low) computed in New York time.

**Why this priority**: This is the core value of the tool: a fast, accurate key-level scanner that
helps the trader decide which symbols deserve attention right now.

**Independent Test**: A tester can open the scanner, load all available futures symbols, and
validate that when price feeds are replayed or simulated, the table correctly reflects key levels
and hit/near-hit statuses for each symbol without needing SMT features.

**Acceptance Scenarios**:

1. **Given** the user opens the scanner during live market hours  
   **When** the system loads all Bybit USDT futures symbols and their last traded prices  
   **Then** each row shows the symbol, current price, and all configured key levels
   (PDH/PDL/PWH/PWL/PMH/PML/QTH/QTL/H4H/H4L) computed from NY-time candles.

2. **Given** a symbol’s price moves from far away to exactly match a key level (e.g., PDH)  
   **When** new price data arrives  
   **Then** the row for that symbol updates within a short delay and clearly indicates a “hit”
   state for the relevant level (e.g., PDH HIT) using consistent text and visual encoding.

3. **Given** a symbol’s price moves within the configured global near-hit threshold (default
   ±0.1%) of any key level  
   **When** new price data arrives  
   **Then** the row for that symbol shows a “near level” state for that level and continues to
   update as price moves closer or further away.

---

### User Story 2 - Detect SMT Divergence Between Selected Pairs (Priority: P2)

A trader wants to select 2–3 futures pairs (e.g., BTCUSDT, ETHUSDT, and a third altcoin) and see
when their price action diverges according to SMT rules (bullish and bearish) on chosen timeframes
such as 1m, 5m, 15m, 1H, 4H, or 1D.

**Why this priority**: SMT divergence is a specialized, high-value signal that builds on the
existing price data and timeframes, allowing the trader to anticipate potential reversals or
continuations.

**Independent Test**: A tester can configure a small set of pairs and timeframes, feed in known
historical candles that contain SMT patterns, and confirm that the SMT panel and chart overlays
display the expected events without relying on the multi-coin scanner table.

**Acceptance Scenarios**:

1. **Given** the user selects two pairs (A and B) and a timeframe (e.g., 5m)  
   **When** the latest candle data for both pairs shows that A makes a lower low while B makes a
   higher low or equal low  
   **Then** the system records and displays a bullish SMT event for that configuration, marks the
   relevant pivots (LL/HL), and highlights the event in the SMT panel.

2. **Given** the user selects three pairs (A, B, C) and a timeframe  
   **When** at least two of the three pairs confirm a higher high pattern while at least one pair
   fails to make a higher high (lower high or equal high)  
   **Then** the system records and displays a bearish SMT event and clearly labels which pairs are
   confirming and which are deviating.

3. **Given** an SMT divergence begins forming during a live candle (wick forms and conditions start
   to satisfy SMT rules)  
   **When** the divergence condition is tentatively met before candle close  
   **Then** the SMT panel and chart show a “forming SMT” indication that is visually distinct from
   a confirmed SMT event, and this state is updated to “confirmed” or removed once the candle
   closes.

---

### User Story 3 - Act on Alerts and Focus Only on Relevant Symbols (Priority: P3)

A trader wants to be notified when symbols hit key levels or form SMT divergence so they can focus
only on relevant opportunities, optionally filtering the table and controlling sound/visual
distractions.

**Why this priority**: Alerts and filtering amplify the value of the scanner by helping the trader
avoid information overload and react quickly.

**Independent Test**: A tester can enable alerts, provoke key-level hits and SMT events for a small
subset of symbols, and verify that notifications, sound, and filtering work as expected even
without scanning all symbols.

**Acceptance Scenarios**:

1. **Given** alerts are enabled and a symbol hits any configured key level  
   **When** the hit condition occurs  
   **Then** the scanner triggers a visual alert (e.g., row highlight or toast), optionally plays a
   sound if enabled, and clearly indicates which level was hit and on which symbol.

2. **Given** alerts are enabled and an SMT divergence (forming or confirmed) is detected for a
   selected pair set  
   **When** the SMT condition occurs  
   **Then** the scanner triggers a distinct SMT alert (e.g., SMT icon, color-coded status) and the
   SMT panel shows enough context (timeframe, pairs, direction) for the trader to evaluate it.

3. **Given** the user activates “Only show coins hitting levels” and/or similar filters  
   **When** no symbols are currently in hit/near-hit or SMT states  
   **Then** the table reflects that state (e.g., empty or minimal rows) and automatically repopulates
   as soon as new qualifying events occur.

---

### Edge Cases

- What happens when Bybit data for a symbol or timeframe is temporarily unavailable or returns
  incomplete candle history?
- How does the system handle WebSocket disconnects, reconnects, and bursts of delayed messages
  without freezing the UI or mislabeling hit/near-hit/SMT states?
- What happens around New York session boundaries, including daylight saving time changes, when
  candles or key levels may shift in a way that could double-count or miss events?
- How does the system behave if the number of supported futures symbols grows significantly (e.g.,
  hundreds of symbols) while the browser is under resource constraints?
- What happens if localStorage is full, disabled, or contains data from an older version of the
  tool with incompatible formats?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST load and display all supported Bybit USDT futures symbols in a
  scanner table, including symbol name, last price, and all configured key levels for each symbol.
- **FR-002**: The system MUST compute and maintain PDH/PDL, PWH/PWL, PMH/PML, QTH/QTL, and H4
  high/low levels per symbol using Bybit OHLC candles aligned to New York time, updating exactly
  when the respective NY time periods roll over.
- **FR-003**: The system MUST detect and visually indicate when a symbol’s current price hits or is
  within a user-configurable single global near-hit threshold (default ±0.1%) of any key level,
  using consistent text and color/icon conventions.
- **FR-004**: The system MUST allow users to configure 2–3 futures pairs and a timeframe, and for
  those configurations MUST detect bullish and bearish SMT divergence events based on documented
  HH/HL/LL/LH rules, showing both forming and confirmed states.
- **FR-005**: The system MUST provide an SMT panel and chart overlays that show SMT events with
  clear directional coloring (e.g., bullish vs bearish), labeled pivot points, and time context.
- **FR-006**: The system MUST provide alerts (visual and optional sound) when symbols hit key
  levels or when SMT divergence is forming or confirmed, and MUST allow users to toggle alert
  types and filters such as “Only show coins hitting levels.”
- **FR-007**: The system MUST persist key user preferences (e.g., selected pairs, timeframes,
  alert toggles, filter options) in browser storage so that they are restored on the next visit,
  subject to versioning of stored data.

### Key Entities *(include if feature involves data)*

- **Symbol**: Represents a Bybit USDT futures contract tracked by the scanner. Attributes include
  identifier (e.g., `BTCUSDT`), current price, and references to associated key-levels and SMT
  events.
- **KeyLevelSet**: Represents the collection of key market levels for a given symbol and time
  context (daily/weekly/monthly/quarterly/H4). Attributes include level type (PDH, PDL, PWH, etc.),
  price value, timeframe basis, NY time boundaries, and last updated timestamp.
- **SMTConfig**: Represents a user-selected SMT setup: a set of 2–3 symbols, a chosen timeframe,
  and any display or filtering options for SMT events.
- **SMTEvent**: Represents a single SMT divergence event, including direction (bullish/bearish),
  involved symbols, timeframe, timestamps, pivot prices (HH/HL/LL/LH), state (forming/confirmed),
  and any validation details (e.g., which pairs confirmed vs deviated).
- **UserSettings**: Represents persisted user preferences, including selected SMT configurations,
  alert toggles (sound/visual), filters, and any default scanner layout options.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: For typical network conditions, traders see updates to prices and key-level hit or
  near-hit statuses reflected in the UI within **300 milliseconds** of new market data arrival for
  at least 95% of events during normal operation.
- **SC-002**: SMT divergence events (forming and confirmed) are detected and displayed within
  **1 second** of the underlying divergence condition appearing in the candle data for at least 95%
  of cases in supported timeframes.
- **SC-003**: Over a representative backtest period or controlled dataset, SMT detection accuracy
  (correctly identifying bullish/bearish SMT events according to the documented rules) is at least
  **95%**, with any known limitations or edge cases documented.
- **SC-004**: The scanner supports **all currently listed Bybit USDT futures** symbols without the
  UI becoming unusably slow or unresponsive on a typical modern laptop running a current browser.
- **SC-005**: In user testing or pilot usage, at least **80% of surveyed traders** report that they
  can quickly understand which symbols are hitting levels or forming SMT just by glancing at the
  dashboard, without needing additional explanations.
- **SC-006**: Key-level values and NY time boundaries are consistent and reproducible across
  sessions; given the same date range and data snapshot, two separate runs of the tool produce
  identical key-level values for all symbols and timeframes under test.


