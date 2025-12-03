# Data Model: Bybit Futures SMT & Key-Level Real-Time Scanner (NY Time)

**Feature**: `1-smt-scanner`  
**Source**: `specs/1-smt-scanner/spec.md`

## Entities

### Symbol

Represents a Bybit USDT futures contract tracked by the scanner.

- **Fields**:
  - `id` (string): Symbol identifier (e.g., `BTCUSDT`).
  - `displayName` (string): Human-readable name if different from `id`.
  - `lastPrice` (number): Latest traded price.
  - `priceChange24h` (number, optional): 24h change, for context only.
  - `keyLevels` (KeyLevelSet): Current key levels for this symbol.
  - `statusFlags` (set of enum): Current status indicators (e.g., `PDH_HIT`, `PDL_HIT`, `NEAR_LEVEL`,
    `SMT_ACTIVE`).

### KeyLevelSet

Represents the collection of key market levels for a given symbol and time context.

- **Fields**:
  - `symbolId` (string, FK → Symbol.id).
  - `pdh` / `pdl` (number): Previous Day High/Low.
  - `pwh` / `pwl` (number): Previous Week High/Low.
  - `pmh` / `pml` (number): Previous Month High/Low.
  - `qth` / `qtl` (number): Previous Quarter High/Low.
  - `h4High` / `h4Low` (number): Current 4H range high/low aligned to NY time.
  - `nearHitThreshold` (number): Global near-hit threshold fraction (e.g., 0.001 for 0.1%).
  - `lastUpdatedAt` (timestamp): When this set was last recomputed.

### SMTConfig

Represents a user-selected SMT setup (pair or trio) and timeframe.

- **Fields**:
  - `id` (string): Local identifier for this config.
  - `symbolIds` (array<string>): 2–3 symbol IDs participating in SMT comparison.
  - `timeframe` (enum): One of `1m`, `3m`, `5m`, `15m`, `30m`, `1H`, `2H`, `4H`, `1D`.
  - `enabled` (boolean): Whether this configuration is actively monitored.
  - `displayOptions` (object, optional): Flags for how to show SMT (e.g., show lines, labels).

### SMTEvent

Represents a single SMT divergence event.

- **Fields**:
  - `id` (string): Unique event identifier (local to browser).
  - `configId` (string, FK → SMTConfig.id).
  - `direction` (enum): `BULLISH` or `BEARISH`.
  - `state` (enum): `FORMING` or `CONFIRMED`.
  - `timeframe` (enum): Copied from SMTConfig for convenience.
  - `symbolPivots` (map<string, PivotInfo>): Per-symbol pivot data (HH/HL/LH/LL, prices, times).
  - `startedAt` (timestamp): When forming state was first detected.
  - `confirmedAt` (timestamp, optional): When event became confirmed (candle close).

#### PivotInfo

Helper structure for SMTEvent.

- **Fields**:
  - `type` (enum): `HH`, `HL`, `LH`, or `LL`.
  - `price` (number): Price at pivot.
  - `time` (timestamp): Time of pivot (NY-time-normalized).

### UserSettings

Represents persisted user preferences across sessions.

- **Fields**:
  - `version` (string): Schema version for migration.
  - `enabledSymbols` (array<string>): Subset of symbols the user wants to see, if filtered.
  - `smtConfigs` (array<SMTConfig>): Saved SMT configurations.
  - `alertSoundEnabled` (boolean): Whether sound alerts are enabled.
  - `visualAlertsEnabled` (boolean): Whether visual alerts (flashing rows/toasts) are enabled.
  - `onlyShowCoinsHittingLevels` (boolean): Whether the scanner table filters to hits/near hits.
  - `nearHitThreshold` (number): Global near-hit threshold fraction (e.g., 0.001 for 0.1%).
  - `lastViewedTimeframe` (enum, optional): Default timeframe for SMT views.

## Relationships

- **Symbol** 1 — 1 **KeyLevelSet** (per active key-level context; implementation may maintain one
  current set per symbol in memory).
- **SMTConfig** 1 — * **SMTEvent** (a config can generate multiple events over time).
- **UserSettings** 1 — * **SMTConfig** (settings own the currently persisted configs).

## State & Lifecycle Notes

- **Symbol / KeyLevelSet**:
  - Initialized when symbols are first loaded and candles fetched from Bybit REST.
  - Updated:
    - on scheduled NY time rollovers (daily/weekly/monthly/quarterly/4H),
    - or when a forced refresh is triggered (e.g., user reload).
- **SMTEvent**:
  - Created in `FORMING` state when divergence conditions begin during an open candle.
  - Transitioned to `CONFIRMED` on candle close if conditions still hold; otherwise event may be
    marked as discarded or removed from visible history.
- **UserSettings**:
  - Loaded from `localStorage` on app start; if `version` differs, migration logic either upgrades
    compatible fields or resets to defaults.


