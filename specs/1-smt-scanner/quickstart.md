# Quickstart: Bybit Futures SMT & Key-Level Real-Time Scanner (NY Time)

This quickstart describes how to run and use the SMT/key-level scanner during development once the
implementation is in place.

## Prerequisites

- Git checkout of the project repository on the `1-smt-scanner` branch.
- Node.js and a package manager (npm, pnpm, or yarn) installed.
- Bybit API keys only if required for increased rate limits (scanner should work with public data).

## Run the App (Dev Mode)

1. Install dependencies (example using npm):

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the app in your browser (usually `http://localhost:3000` or as configured).

## Using the Scanner

1. **Symbol Scanner Table**
   - On load, the table should populate with Bybit USDT futures symbols and their prices.
   - Columns include: Symbol, Price, PDH/PDL, PWH/PWL, PMH/PML, QTH/QTL, H4H/H4L, SMT status, and
     Status/Hits.

2. **SMT Panel**
   - Select 2–3 symbols and a timeframe (e.g., 5m, 15m, 1H).
   - Watch for SMT events (forming and confirmed) displayed with color-coded lines and labels.

3. **Alerts & Filters**
   - Toggle sound/visual alerts in the controls area.
   - Use “Only show coins hitting levels” to focus on symbols currently at or near key levels.

## Debugging & Observability

- Enable the debug view (if provided) to inspect:
  - WebSocket connection status and last message timestamps.
  - Key levels for a selected symbol.
  - Recent SMT events and their underlying pivots.

This quickstart will be extended with exact commands and paths once the concrete frontend stack and
tooling are chosen during implementation.


