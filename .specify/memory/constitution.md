<!--
Sync Impact Report
- Version change: N/A → 1.0.0
- Modified principles:
  - [PRINCIPLE_1_NAME] → Real-Time Accuracy & Determinism
  - [PRINCIPLE_2_NAME] → Zero-Cost, Browser-Only Architecture
  - [PRINCIPLE_3_NAME] → Explicit, Testable Market Logic
  - [PRINCIPLE_4_NAME] → Trader-Centric UX & Signal Clarity
  - [PRINCIPLE_5_NAME] → Observability, Time Discipline & Performance
- Added sections:
  - Architecture & Technology Constraints
  - Workflow, Specifications & Quality Gates
- Removed sections:
  - None (all template sections concretized)
- Templates:
  - .specify/templates/plan-template.md: ✅ updated (Constitution Check gates aligned to this constitution)
  - .specify/templates/spec-template.md: ✅ updated (guidance to reflect constitution-driven success criteria)
  - .specify/templates/tasks-template.md: ✅ updated (tasks phase includes observability & performance)
  - .specify/templates/commands/*: ✅ evaluated (no files present to update)
- Follow-up TODOs:
  - None (all required fields populated; future policy changes require version bump per Governance)
-->

# Bybit Futures Key-Level + SMT Real-Time Scanner (NY Time) Constitution

## Core Principles

### Real-Time Accuracy & Determinism

The system MUST provide fast, deterministic, and reproducible market signals for all supported
Bybit USDT futures symbols. All key levels (PDH/PDL, PWH/PWL, PMH/PML, QTH/QTL, H4 high/low) MUST
be computed from Bybit OHLC data aligned to New York (NY) time and refreshed exactly when the
relevant NY time partitions roll over. SMT divergence detection MUST be based on clear, documented
higher-high / lower-low rules and MUST NOT rely on hidden heuristics or opaque indicators.

**Rationale**: Traders depend on this scanner for precise execution decisions. If two users run the
tool at the same time, they MUST see identical levels and SMT events given the same data snapshot.
Deterministic rules and strict NY time alignment are required to avoid confusion and mistrust.

### Zero-Cost, Browser-Only Architecture

The system MUST run entirely in the browser with no custom backend or paid infrastructure. All
live price data MUST come directly from Bybit WebSocket v5, and historical OHLC data MUST come
from Bybit REST APIs. Local persistence (e.g., key levels cache, SMT logs, user settings) MUST use
browser storage such as `localStorage`. Any introduction of servers, databases, or paid services
MUST be explicitly justified, accepted in writing, and treated as a breaking governance change.

**Rationale**: A zero-cost, browser-only architecture keeps the tool simple to deploy, easy to
share, and resilient to vendor lock-in. It also reduces operational risk and aligns with the
project’s goal of being accessible to individual traders.

### Explicit, Testable Market Logic

All key-level calculations and SMT rules MUST be expressed as clear, testable logic. For each
level type and SMT pattern, the specification MUST define:

- input data required (symbols, timeframes, candle arrays, timezone assumptions)
- exact formulas or comparison rules (e.g., equality/near-hit thresholds, HH/HL/LL/LH definitions)
- conditions for triggering “forming” vs “confirmed” SMT states

Where rules are ambiguous or domain choices are unresolved, the specification MUST mark them as
`NEEDS CLARIFICATION` and they MUST be resolved before relying on the engine in production trading.

**Rationale**: Transparent, testable logic enables confidence, debugging, and future extensions.
Hidden assumptions make it impossible to validate SMT quality or compare behavior across releases.

### Trader-Centric UX & Signal Clarity

The user interface MUST be optimized for active scalpers and intraday traders. The dashboard MUST
prioritize:

- a fast, legible coin scanner table
- clear hit/near-hit status for each key level
- unambiguous SMT indicators and overlays

Visual encodings (colors, icons, flashing states, toasts, and sounds) MUST be consistent and
documented so a trader can interpret signals at a glance. Experimental or decorative UI elements
MUST NOT obscure or delay critical trading information.

**Rationale**: The tool is used under time pressure. Traders need to see which symbols are
approaching critical levels or forming SMT without reading long descriptions or guessing meanings.

### Observability, Time Discipline & Performance

The system MUST provide enough observability to understand what the scanner is doing in real time.
This includes:

- lightweight logging or debug views for incoming WebSocket data and computed signals
- the ability to inspect current key levels and SMT events for a given symbol/timeframe
- clear display or logging of the active NY time context (day/week/month/quarter and 4H buckets)

The implementation MUST be designed to hit:

- real-time latency targets (price-to-UI delay ideally <300 ms)
- SMT detection latency targets (forming signal within <1 s of divergence condition)

Performance or correctness trade-offs (e.g., throttling updates, dropping symbols) MUST be
explicitly documented in the plan and specification.

**Rationale**: Without observability and explicit performance targets, it is impossible to know if
SMT and key-level alerts are timely, correct, or silently failing.

## Architecture & Technology Constraints

The project MUST adhere to the following architectural constraints:

- **Frontend stack**: HTML, Tailwind CSS, and either vanilla JavaScript or React as the only
  application frameworks.
- **Execution environment**: Browser-only; no custom servers or cloud functions.
- **Data sources**:
  - Bybit WebSocket v5 for real-time prices.
  - Bybit REST API for historical OHLC data and initial key-level computation.
- **Timezone discipline**: All daily, weekly, monthly, quarterly, and 4H time partitions MUST be
  computed in New York time, with explicit handling for DST if needed.
- **Storage**:
  - Use `localStorage` for cached highs/lows, SMT logs, and user preferences.
  - Stored items MUST be versioned or namespaced so future changes do not corrupt user data.

Any deviation from these constraints MUST be justified in the implementation plan and specification
and treated as a potential governance change.

## Workflow, Specifications & Quality Gates

All work on this project MUST follow a lightweight but explicit workflow:

- Every feature or significant change MUST have:
  - a specification capturing user stories, functional requirements, and measurable success
    criteria aligned with this constitution
  - an implementation plan describing technical approach, structure, and performance/observability
    considerations
  - a tasks breakdown that can be executed in small, independently testable increments
- The specification MUST:
  - describe key user journeys (e.g., scanning multiple coins, monitoring favorite pairs, SMT panel
    operation)
  - include concrete acceptance scenarios for key levels and SMT behavior
  - define success criteria that reference latency, accuracy, and coverage (e.g., all Bybit futures
    symbols, supported timeframes)
- The implementation plan and tasks MUST:
  - respect the browser-only, zero-cost, and NY-time constraints
  - call out any areas where the constitution is not yet satisfied and explain how/when they will be
    addressed

Before significant work starts on any feature, a “Constitution Check” gate in the plan MUST confirm
that:

- time and data assumptions match NY-aligned Bybit behavior
- architectural choices remain browser-only and zero-cost
- key-level and SMT logic is specified clearly enough to be testable
- performance and observability implications have at least an initial plan.

## Governance

This constitution governs how the Bybit Futures Key-Level + SMT Real-Time Scanner (NY Time)
project is specified, implemented, and evolved. It supersedes ad-hoc practices and informal rules.

**Amendments & Versioning**

- Any change to principles, architecture constraints, or governance rules MUST be reflected in this
  file and accompanied by a version bump using semantic versioning:
  - **MAJOR**: Breaking or incompatible changes to principles, architecture, or governance (e.g.,
    introducing a backend, changing time model).
  - **MINOR**: New principles, new mandatory sections, or materially expanded guidance.
  - **PATCH**: Clarifications, wording fixes, or non-semantic refinements.
- The `Ratified` date represents the original adoption date of the constitution for this project.
- The `Last Amended` date MUST be updated whenever the constitution is edited in a way that changes
  meaning or obligations.

**Compliance & Review**

- All specifications, plans, and task lists generated for this repository MUST treat this
  constitution as a non-negotiable reference.
- The “Constitution Check” section in implementation plans MUST explicitly confirm compliance with:
  - real-time accuracy and NY time alignment
  - browser-only, zero-cost architecture
  - explicit, testable key-level and SMT logic
  - trader-centric UX and clear signaling
  - observability and performance expectations.
- If a feature temporarily violates one or more principles (e.g., introducing a prototype backend),
  the plan MUST record the violation, rationale, and intended timeline for removal or formal
  ratification via a MAJOR/MINOR version bump.

**Runtime Guidance**

- Runtime engineering practices (e.g., naming conventions, detailed logging formats, component
  structure) MAY be documented in additional guidance files such as `README.md` or per-feature
  quickstarts.
- Those documents MUST remain consistent with this constitution. In any conflict, this
  constitution prevails.

**Version**: 1.0.0 | **Ratified**: 2025-12-03 | **Last Amended**: 2025-12-03
