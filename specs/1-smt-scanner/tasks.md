# Tasks: Bybit Futures SMT & Key-Level Real-Time Scanner (NY Time)

**Input**: Design documents from `/specs/1-smt-scanner/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Include core unit and integration tests where they provide significant value for key-level
and SMT logic and for primary user journeys.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of
each story.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

 - [X] T001 Create project structure under `src/`, `public/`, and `tests/` per `specs/1-smt-scanner/plan.md`
- [X] T002 Initialize JavaScript frontend project with Tailwind CSS in `package.json` and `tailwind.config.js`
- [X] T003 [P] Configure linting and formatting tools (e.g., ESLint + Prettier) with config files in repo root

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Create Bybit REST/WebSocket API client module in `src/api/bybitClient.js`
- [X] T005 [P] Implement NY-time and DST alignment helpers in `src/utils/timezoneNy.js`
- [X] T006 [P] Implement global state container for symbols, key levels, SMT configs, and events in `src/state/store.js`
- [X] T007 Implement `localStorage` persistence helpers for `UserSettings` in `src/utils/storage.js`
- [X] T008 Configure basic routing or single-page entry in `src/pages/DashboardPage.js`
- [X] T009 Setup basic logging/debug utility (with toggles) in `src/utils/logging.js`

**Checkpoint**: Foundation ready – user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Scan All Futures for Key Levels (Priority: P1) 🎯 MVP

**Goal**: Real-time scanner table for all Bybit USDT futures showing price and NY-time-aligned key levels with hit/near-hit statuses.

**Independent Test**: With WebSocket/REST data (live or mocked), the table shows all symbols, correct levels, and correctly updates hit/near-hit statuses without SMT or alerts enabled.

### Tests for User Story 1 (core tests)

- [X] T010 [P] [US1] Implement unit tests for key-level computation engine in `tests/unit/core/keyLevels.test.js`
- [X] T011 [P] [US1] Implement integration test for scanner table rendering and updates in `tests/integration/scannerTable.test.js`

### Implementation for User Story 1

- [X] T012 [P] [US1] Implement `Symbol` and `KeyLevelSet` data structures and mappers in `src/core/models.js`
- [X] T013 [P] [US1] Implement key-level computation engine (daily/weekly/monthly/quarterly/H4 NY-aligned) in `src/core/keyLevelsEngine.js`
- [X] T014 [US1] Implement symbol loading and subscription logic using Bybit client in `src/state/symbolsController.js`
- [X] T015 [US1] Implement scanner table component (rows, columns, basic styling) in `src/components/ScannerTable.js`
- [X] T016 [US1] Wire key-level engine outputs into scanner table view-model in `src/state/scannerViewModel.js`
- [X] T017 [US1] Implement hit and near-hit status calculation (using global near-hit threshold) in `src/core/hitStatus.js`
- [X] T018 [US1] Add visual status encodings (colors/icons) for hit and near-hit levels in `src/components/ScannerTableRow.js`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Detect SMT Divergence Between Selected Pairs (Priority: P2)

**Goal**: SMT panel and chart overlays that detect and display bullish/bearish SMT divergence for 2–3 selected pairs across supported timeframes.

**Independent Test**: With configured pairs and timeframe plus controlled candle data, the SMT panel and chart show expected forming/confirmed SMT events without relying on alerts or table filtering.

### Tests for User Story 2 (core tests)

- [X] T019 [P] [US2] Implement unit tests for SMT pivot detection and event rules in `tests/unit/core/smtEngine.test.js`
- [X] T020 [P] [US2] Implement integration test for SMT panel behavior with mock data in `tests/integration/smtPanel.test.js`

### Implementation for User Story 2

- [X] T021 [P] [US2] Implement SMT pivot identification helpers (`PivotInfo`) in `src/core/pivots.js`
- [X] T022 [P] [US2] Implement SMT engine for 2- and 3-pair configurations in `src/core/smtEngine.js`
- [X] T023 [US2] Implement SMT configuration management (create/update/enable) in `src/state/smtConfigController.js`
- [X] T024 [US2] Implement SMT panel UI for selecting pairs and timeframe in `src/components/SmtPanel.js`
- [X] T025 [US2] Implement chart adapter and SMT overlay rendering in `src/components/ChartWithSmtOverlay.js`
- [X] T026 [US2] Wire SMT events into panel list and chart overlays in `src/state/smtViewModel.js`
- [X] T027 [US2] Implement storage and retrieval of SMT configs/events via `UserSettings` in `src/state/userSettingsController.js`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Act on Alerts and Focus Only on Relevant Symbols (Priority: P3)

**Goal**: Alerting and filtering so traders can focus on symbols hitting levels or forming SMT, with control over sounds and visual intensity.

**Independent Test**: With alerts enabled and controlled events, alerts fire correctly, filters hide/show rows appropriately, and settings persist across reloads.

### Tests for User Story 3 (core tests)

- [ ] T028 [P] [US3] Implement integration test for alert triggering and filter behavior in `tests/integration/alertsAndFilters.test.js`

### Implementation for User Story 3

- [ ] T029 [P] [US3] Implement alert state management (queue, deduplication, cooldowns) in `src/state/alertsStore.js`
- [ ] T030 [US3] Implement visual alert components (toasts, row highlighting) in `src/components/AlertsLayer.js`
- [ ] T031 [US3] Implement sound alert playback module using browser Audio API in `src/utils/soundAlerts.js`
- [ ] T032 [US3] Implement control panel UI for toggling sound/visual alerts and filters in `src/components/ControlPanel.js`
- [ ] T033 [US3] Wire scanner filter “Only show coins hitting levels” into table view-model in `src/state/scannerFilters.js`
- [ ] T034 [US3] Persist alert and filter settings using `UserSettings` in `src/state/userSettingsController.js`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T035 [P] Documentation updates in `docs/` and `specs/1-smt-scanner/quickstart.md`
- [ ] T036 Code cleanup and refactoring across `src/` to reduce duplication
- [ ] T037 Performance optimization for symbol loading, WebSocket handling, and rendering in `src/api/` and `src/components/`
- [ ] T038 [P] Additional unit tests for edge cases in key-level and SMT engines in `tests/unit/`
- [ ] T039 Security and robustness hardening (e.g., input validation, defensive coding) throughout `src/`
- [ ] T040 Run `quickstart.md` validation end-to-end and adjust docs/tests accordingly in `specs/1-smt-scanner/quickstart.md`
- [ ] T041 [P] Verify real-time latency and WebSocket reliability against project targets and document results against SC-001/SC-002 in `tests/perf/latencyAndRealtime.test.js`
- [ ] T042 [P] Add or validate logging/observability for key-level and SMT engines in `src/utils/logging.js` and debug views
- [ ] T043 [P] Validate SMT detection accuracy against backtest datasets and document coverage for SC-003 in `tests/perf/smtAccuracy.test.js`
- [ ] T044 [P] Implement edge-case handling for WebSocket reconnects and delayed messages in `src/api/bybitClient.js` with tests in `tests/unit/api/bybitClientEdgeCases.test.js`
- [ ] T045 [P] Implement explicit handling and tests for NY boundary and DST edge cases in `src/utils/timezoneNy.js` and `tests/unit/utils/timezoneNyBoundaries.test.js`
- [ ] T046 [P] Implement explicit handling and tests for `localStorage` full/disabled scenarios in `src/utils/storage.js` and `tests/unit/utils/storageEdgeCases.test.js`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies – can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion – BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
  - User stories can proceed in priority order (P1 → P2 → P3) and may be developed in parallel if
    team capacity allows.
- **Polish (Final Phase)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) – no dependency on other stories.
- **User Story 2 (P2)**: Depends on foundational infra and basic symbol/key-level flow; can run in
  parallel with late-stage US1 work.
- **User Story 3 (P3)**: Depends on events from US1 (hits/near hits) and US2 (SMT events) but should
  be testable using mocked events if needed.

### Within Each User Story

- Tests (if included) SHOULD be written and run before or alongside implementation.
- Models and core logic before UI wiring.
- State/controller code before final UI polish.
- Story complete before marking its phase done.

### Parallel Opportunities

- All Setup tasks marked `[P]` can run in parallel.
- All Foundational tasks marked `[P]` can run in parallel within Phase 2.
- Within each user story:
  - Tests and core engines (`core/` modules) can be developed in parallel by different contributors.
  - UI components and state wiring can proceed in parallel once data shapes are stable.
- Polish tasks marked `[P]` can be distributed across team members.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (CRITICAL – blocks all stories).
3. Complete Phase 3: User Story 1 (scanner table with key levels and hit/near-hit logic).
4. **STOP and VALIDATE**: Test User Story 1 independently against success criteria.
5. Deploy/demo if ready.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready.
2. Add User Story 1 → Test independently → Deploy/Demo (MVP).
3. Add User Story 2 → Test independently → Deploy/Demo.
4. Add User Story 3 → Test independently → Deploy/Demo.
5. Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together.
2. Once Foundational is done:
   - Developer A: User Story 1 (scanner table and key levels).
   - Developer B: User Story 2 (SMT engine and panel).
   - Developer C: User Story 3 (alerts and filters).
3. Stories complete and integrate independently, with final polish and performance work in Phase N.


