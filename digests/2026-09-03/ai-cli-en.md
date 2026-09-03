# AI CLI Tools Community Digest 2026-09-03

> Generated: 2026-09-03 00:32 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# AI CLI Tools Ecosystem — Cross-Tool Comparison Report
**Date: 2026-09-03**

---

## 1. Ecosystem Overview

The AI developer CLI landscape is highly active, with four major tools (OpenAI Codex, Gemini CLI, GitHub Copilot CLI, Qwen Code) showing substantial daily issue/PR throughput. Three dominant themes cut across all communities: **agent reliability and trust** (false success reporting, destructive operations, quota accounting), **session/context integrity** (history loss, compaction failures, unbounded context growth), and **platform gaps on Windows** (WSL, sandbox, rendering). Security hardening also spiked today — Gemini CLI shipped six security PRs, Copilot CLI restricted Linux sandbox egress, and Qwen Code faces a repo-wide CVE audit failure. Three repos (Claude Code, OpenCode, Pi) had digest generation failures, limiting visibility into those ecosystems today.

---

## 2. Activity Comparison

| Tool | Issues (24h hot) | PRs (24h key) | Discussions | Releases |
|---|---|---|---|---|
| **OpenAI Codex** | 10 hot (incl. meta-tracker) | 10 active | 7+ active (ideas & show-and-tell) | 2 alphas (0.153.0-alpha.5/6) |
| **Gemini CLI** | 10 hot | 10 merged/active | No data this period | 1 nightly |
| **GitHub Copilot CLI** | 10+ hot | No PR detail available | No data this period | 2 patches (v1.0.83-2/-3) |
| **Qwen Code** | 10 hot | 10 active | No data this period | 1 (live-host-v0.2.0) |
| **Claude Code** | N/A — digest unavailable | N/A | N/A | N/A |
| **OpenCode** | N/A — digest unavailable | N/A | N/A | N/A |
| **Pi** | N/A — digest unavailable | N/A | N/A | N/A |

---

## 3. Shared Feature Directions

| Direction | Tools | Evidence |
|---|---|---|
| **Destructive-operation guardrails** | Codex (#42355 `git clean` wiped secrets dir), Gemini CLI (#22672 `git reset --force`), Qwen Code (shell guard config/audit demands) | All three communities demand confirmation gates, audit trails, and safer defaults around irreversible ops |
| **Quota/cost transparency** | Codex (#41220 quota meta-tracker, #42372 Luna Reserve), Copilot CLI (#4224 missing billing attributes in OTel spans) | Users demand per-request usage accounting; enterprises need accurate cost attribution |
| **Multi-model flexibility** | Codex (#42380 confirmation before silent model downgrade), Copilot CLI (multi-model fallback in v1.0.83-2, #3709 in-session switching, BYOK), Gemini CLI (model picker currency, #29172) | Model selection is becoming a first-class user control, not an opaque backend choice |
| **Session/memory integrity** | Codex (rollout/SQLite projection repairs #42369/#42378), Copilot CLI (OOM on resume, lost agent config on resume), Gemini CLI (Auto Memory immaturity #26522–26525), Qwen Code (unbounded context from pulses/MCP images) | Long-session state restoration and bounded context growth are universal pain points |
| **MCP ecosystem maturation** | Copilot CLI (protocol negotiation, OAuth churn, silent server failures), Qwen Code (#10834 unbounded MCP image budget), Codex (#42395 codex_version MCP metadata) | MCP is now critical infrastructure; protocol, auth, and resource-limit bugs surface everywhere |
| **Silent agent failure reporting** | Gemini CLI (#22323 MAX_TURNS reported as GOAL success), Codex (#41079 stale history) | Accurate agent status/telemetry is a trust prerequisite for orchestration workflows |

---

## 4. Differentiation Analysis

- **OpenAI Codex** — Broadest surface (TUI, desktop, app-server, daemon). Unique: pets feature (with fatigue), realtime sessions GA (#42377), experimental context management. Target: ChatGPT Pro consumer-pro users; heavy Windows desktop investment. Weakness: quota trust deficit and Windows instability.
- **Gemini CLI** — Security-first posture this period (Seatbelt isolation, NTFS SFN traversal, ACL checks, removed hardcoded CrUX API key). Differentiator: multi-agent orchestration (subagents, skills) and AST-aware tooling roadmap (#22745). Target: Linux/POSIX-leaning developers, extensibility users.
- **GitHub Copilot CLI** — Enterprise orientation: OTel billing attributes, org-managed default models (#4692), PowerShell ConstrainedLanguage support, proxy/OAuth flows. Multi-model fallback + `model-policy: required` for custom agents is governance-oriented. Weakness: Node.js resource leaks on long sessions.
- **Qwen Code** — Architecturally bold: ink→OpenTUI migration (#8662) and `qwen serve` daemon/Web Shell as first-class surfaces (turn navigation, environment panels, DingTalk multi-agent aggregation). Uniquely transparent AI review (coverage ledgers #9768). Challenges: hybrid-model XML leakage, strained self-hosted CI.

---

## 5. Community Momentum & Maturity

- **Most active / fastest iteration:** OpenAI Codex — two alpha releases in 24h plus 10 substantive PRs across daemon, history pipeline, and quota UX; richest discussion culture (planner/worker orchestration, session sharing).
- **Most disciplined/security-mature:** Gemini CLI — 10 focused PRs including six security hardenings; issues triaged P1/P2 with fast community PR turnaround (#29164→#29172 within a day).
- **Enterprise-stabilizing:** Copilot CLI — closed a long-standing agent bug (#2630); releases are frequent but PR-level transparency is low in this window; memory-leak cluster suggests a stability debt moment.
- **Rapidly modernizing:** Qwen Code — aggressive UI rewrite and serve-platform investment; self-healing fast on reported bugs, but CI infrastructure is visibly under strain (10+ per-commit failures in 48h).
- **Unknown:** Claude Code, OpenCode, Pi — digest failures; no conclusions should be drawn.

---

## 6. Trend Signals

1. **Trust is the new battleground.** Quota accounting (#41220), silent model downgrades (#42380), and false agent success reports (#22323) show users are auditing agent behavior. Tools exposing verifiable telemetry (Qwen's review coverage ledger, Codex's `CODEX_VERSION`) are converging on an observability standard.
2. **Windows parity is a lagging indicator of maturity.** Every major tool has active Windows-specific bug clusters (WSL, sandbox, rendering). Teams evaluating CLIs on Windows-first stacks should weight this heavily.
3. **Model flexibility is becoming table stakes.** Multi-model fallback, in-session switching, BYOK, and downgrade consent indicate the CLI is becoming a model-agnostic orchestration layer — lock-in concerns are shaping roadmaps.
4. **Context management is emerging as a product feature,** not an implementation detail: Codex's experimental token-budget context mode, Qwen's image budget enforcement, Copilot's compaction failures all signal "context economics" tooling in 2026.
5. **MCP is load-bearing but fragile.** Auth, protocol-version, and resource-limit bugs across Copilot and Qwen suggest the ecosystem needs standardized conformance testing before deep enterprise reliance.
6. **Practical guidance for developers:** pin stable releases (alpha lines carry regressions, e.g., Codex 26.820 rendering), monitor session memory on long-running tasks (Copilot v1.0.82 line), and adopt confirmation guardrails for agent-run destructive git operations regardless of tool choice.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills summary generation failed.

---

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-03

## 1. Today's Highlights
The Codex team shipped two alpha releases (0.153.0-alpha.5/6) alongside a rapid-fire batch of merged PRs focused on Windows daemon lifecycle management, rollout history robustness, and experimental context management. Meanwhile, community frustration is concentrated on two fronts: quota depletion and usage-accounting inconsistencies (#41220), and a cluster of Windows desktop bugs around WSL projects, click-through pets, and session history stalls.

## 2. Releases
- **[rust-v0.153.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.6)** and **[rust-v0.153.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.5)** — Two alpha builds landed in 24h; no detailed changelogs provided. Likely incorporates the heavy stream of merged Rust-side fixes (rollout decoding, app-server, Windows daemon support) described below.

## 3. Hot Issues

1. **[#41463 — [Windows + WSL] Cannot create projects: AbsolutePathBuf deserialized without base path](https://github.com/openai/codex/issues/41463)** (19 comments, 👍10) — Project creation is broken for Windows+WSL2 users, a core workflow. Highest-engagement bug of the day.
2. **[#41513 — [Windows] Floating pets become click-through and undraggable](https://github.com/openai/codex/issues/41513)** (18 comments, 👍6) — Affects both built-in and custom pets; the pets feature keeps generating interaction bugs.
3. **[#41079 — [Desktop][Windows] Paginated thread history stalls on duplicate ordinal](https://github.com/openai/codex/issues/41079)** (18 comments) — Local history projection shows stale snapshots despite complete rollout JSONL; directly addressed by PR #42369.
4. **[#41220 — [Meta] Abnormal quota depletion / usage-accounting inconsistencies](https://github.com/openai/codex/issues/41220)** (15 comments, 👍8) — Cross-report tracker for users burning quota faster than token evidence predicts. The single most consequential trust issue right now.
5. **[#32069 — Hide Pets menu item + configurable prompt polishing](https://github.com/openai/codex/issues/32069)** (14 comments, 👍16) — Long-running enhancement; strong sentiment that pets shouldn't dominate the account menu.
6. **[#39989 / #39897 / #41399 — Deleted conversations persist in Recents/sidebar](https://github.com/openai/codex/issues/39989)** (13, 12, 8 comments) — The same "deleted threads won't disappear" bug family across Windows and macOS; #41399 has 👍10, indicating real user annoyance.
7. **[#40878 — [Windows] Blank client area; `--disable-direct-composition` workaround](https://github.com/openai/codex/issues/40878)** (11 comments) — Rendering regression in 26.820.7780.0 with a community-discovered workaround.
8. **[#41541 — Codex 0.150 processes workloads ~1.6–1.8x faster, rapidly depleting Pro quota](https://github.com/openai/codex/issues/41541)** (7 comments) — Ties throughput changes to quota burn; complements the #41220 meta-tracker.
9. **[#42355 — Agent ran `git clean` on nested ignored paths, deleted entire ignored parent](https://github.com/openai/codex/issues/42355)** (3 comments) — Dangerous destructive-tool behavior (secrets directory wiped); highlights the need for guardrails on git operations.
10. **[#42224 — Pro Lite weekly quota depleted ~93% in one day after reset](https://github.com/openai/codex/issues/42224)** (2 comments, 👍2) — Fresh datapoint feeding the quota meta-tracker.

## 4. Key PR Progress

1. **[#42392 — Managed daemon updates on Windows](https://github.com/openai/codex/pull/42392)** + **[#42381 — Managed app-server lifecycle on Windows](https://github.com/openai/codex/pull/42381)** — Major push to close the Windows/Unix parity gap for the managed daemon; relevant to the orphaned `codex.exe` issues (#40972).
2. **[#42385 — Experimental context management activation](https://github.com/openai/codex/pull/42385)** — New `features.context_management.experimental_mode` config enabling token-budget context and history notes for eligible ChatGPT plans. A significant direction for long-session quality.
3. **[#42378 — Route rollout reads through canonical JSON decoder](https://github.com/openai/codex/pull/42378)** — Fixes sessions failing to resume due to nested decimal deserialization; complements #42369.
4. **[#42369 — Keep SQLite history projection moving past invalid records](https://github.com/openai/codex/pull/42369)** — Skips malformed/regressed rollout records instead of blocking; directly targets the history-stall bug family (#41079, #41995).
5. **[#42372 — Luna Reserve usage fallback in TUI](https://github.com/openai/codex/pull/42372)** — Auto-switches eligible users to a reserve quota when ordinary usage is exhausted, restoring the prior model on recovery. A concrete response to quota complaints.
6. **[#42380 — Require confirmation for safety-buffered retries](https://github.com/openai/codex/pull/42380)** — Confirmation before retrying with a server-selected faster (possibly less capable) model — addresses silent model downgrades.
7. **[#42391 — Authorize `apply_patch` in the executor path context](https://github.com/openai/codex/pull/42391)** — Fixes writable-root/permission misclassification from path-convention mismatches.
8. **[#42395 — Expose Codex version to commands and turn metadata](https://github.com/openai/codex/pull/42395)** — Adds `CODEX_VERSION` env var and `codex_version` MCP metadata; improves reproducibility of bug reports.
9. **[#42377 — Realtime sessions always available in app-server](https://github.com/openai/codex/pull/42377)** — Removes the per-thread feature gate; realtime conversation is now GA behavior.
10. **[#42375 — Clean up Windows sandbox resources on uninstall](https://github.com/openai/codex/pull/42375)** — Sandbox account/process teardown on package uninstall; hygiene fix for the Windows sandbox stack.

## 5. Hot Discussions

**Ideas**
- **[#40707 — "5 hours limit is back"](https://github.com/openai/codex/discussions/40707)** — Users push back on reinstated 5-hour rolling limits on top of weekly quotas.
- **[#41716 — ChatGPT Planner & Codex Worker orchestration](https://github.com/openai/codex/discussions/41716)** — Proposal for ChatGPT as persistent planner with Codex instances as execution workers.
- **[#25580 — Shared Codex sessions for teams](https://github.com/openai/codex/discussions/25580)** and **[#22356 — Thread sharing/hand-off across accounts](https://github.com/openai/codex/discussions/22356)** — Recurring demand for multi-user session collaboration.
- **[#42200 — "User-Only" mode for Skills](https://github.com/openai/codex/discussions/42200)** — Allow skills available on demand but never auto-selected by the model.

**Show and tell**
- **[#42041 — agent-watch](https://github.com/openai/codex/discussions/42041)** — Distinguishes DONE/FAILED/STALL for background `codex exec` workers.
- **[#41898 — Codex Task Title Organizer](https://github.com/openai/codex/discussions/41898)** — Desktop plugin generating project-aware task titles.
- **[#42277 — Two memory tools (rawmem / memdsl)](https://github.com/openai/codex/discussions/42277)** — stdio MCP tools for raw history and curated long-term memory.

## 6. Feature Request Trends
- **Quota transparency & control**: usage-accounting explanations (#41220), removal of 5-hour limits, reserve-fallback UX — the dominant theme.
- **Collaboration**: shared sessions and thread hand-off between accounts (#25580, #22356).
- **Multi-agent orchestration**: planner/worker patterns and external event injection into live sessions (#41716, #33556).
- **Desktop UX polish**: hide/disable pets (#32069), better window management (#27378), HTTPS-only transport for restricted networks (#27381).
- **Skills control**: opt-in-only ("user-only") skill usage (#42200).

## 7. Developer Pain Points
- **Windows desktop instability**: WSL project creation broken, blank rendering, splash hangs on ARM64, orphaned processes, and switcher UI overlaps — Windows remains the buggiest surface by far.
- **Session/history integrity**: deleted conversations reappearing, paginated history stalling, and heartbeat NOTIFY results vanishing — the rollout/SQLite projection pipeline is under active repair (PRs #42378/#42369).
- **Quota trust deficit**: repeated reports of quota burning faster than token logs justify, now consolidated in meta-tracker #41220; users want per-request accounting.
- **Destructive tool safety**: `git clean` wiping ignored directories (#42355) shows the agent needs stricter guardrails around irreversible operations.
- **Pets feature fatigue**: a steady stream of pet interaction bugs plus petitions to make the feature opt-out.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-03

## Today's Highlights
The repository saw a flurry of security-hardening PRs over the last 24 hours, with community contributors submitting fixes for path traversal, config file ownership checks, and sandbox isolation. Community frustration is mounting around the model picker missing Gemini 3.6/3.7 Flash ([#29164](https://github.com/google-gemini/gemini-cli/issues/29164)), which became the most-upvoted new issue overnight. Meanwhile, long-running agent reliability bugs (subagent hangs, false-success terminations) continue to dominate the comment counts.

## Releases
- **[v0.59.0-nightly.20260902.g4963a4456](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260902.g4963a4456)** — Includes one fix: improved destination validation and connection routing in web fetch utilities ([#29120](https://github.com/google-gemini/gemini-cli/pull/29120), first contribution from @diegogodinezr).

## Hot Issues
1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent reports GOAL success after MAX_TURNS (P1, 13 comments)** — `codebase_investigator` falsely reports success when interrupted, hiding failures from callers. Most-discussed issue; undermines trust in agent orchestration.
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs indefinitely (P1, 8 comments, 👍 8)** — Simple tasks like folder creation stall; users work around it by disabling subagents entirely.
3. **[#29164](https://github.com/google-gemini/gemini-cli/issues/29164) — Gemini 3.6/3.7 Flash missing from model picker (P1, 👍 9)** — Fresh issue with fast traction; a community PR ([#29172](https://github.com/google-gemini/gemini-cli/pull/29172)) is already open.
4. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell execution stuck at "Waiting input" (P1)** — Completed commands still show as awaiting input, a recurring usability blocker.
5. **[#29045](https://github.com/google-gemini/gemini-cli/issues/29045) — read-many-files substring-match bug inlines unrequested binaries (P1)** — Glob matching via substring containment causes unwanted image payloads and token waste.
6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Deterministic redaction for Auto Memory (P2, area/security)** — Secrets reach model context before redaction; flagged privacy risk.
7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland (P1)** — Linux desktop users get false GOAL terminations.
8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error with >128 tools (P2)** — Tool scope management needs smarter limiting; blocks heavy extension users.
9. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — Discourage destructive behavior (P2)** — Model reaches for `git reset --force` when safer options exist.
10. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC: AST-aware file reads/search/mapping (P2)** — Long-horizon investigation into reducing turns and token noise via AST tooling.

## Key PR Progress
1. **[#29115](https://github.com/google-gemini/gemini-cli/pull/29115)** — Strict permission/ownership (ACL) checks on system-wide config paths for Windows and POSIX.
2. **[#29170](https://github.com/google-gemini/gemini-cli/pull/29170)** — Hardened workspace boundary checks and symlink resolution in command safety and file discovery.
3. **[#29172](https://github.com/google-gemini/gemini-cli/pull/29172)** — Registers gemini-3.5/3.6/3.7-flash and promotes **gemini-3.8-flash** as default flash model — directly addresses #29164.
4. **[#29171](https://github.com/google-gemini/gemini-cli/pull/29171)** — Isolates temp directory for macOS Seatbelt sandbox so sandboxed processes don't share host tmp.
5. **[#29116](https://github.com/google-gemini/gemini-cli/pull/29116)** — Mitigates NTFS 8.3 short-name (SFN) path traversal bypasses in the AllowedPathChecker.
6. **[#29163](https://github.com/google-gemini/gemini-cli/pull/29163)** — Fixes startup crash in git repos under macOS Seatbelt / restricted permissions.
7. **[#29158](https://github.com/google-gemini/gemini-cli/pull/29158)** — Removes a **hardcoded Google CrUX API key** from chrome-devtools-mcp bundles — notable credential hygiene fix.
8. **[#29110](https://github.com/google-gemini/gemini-cli/pull/29110)** — Routes `read_file` through FileSystemService, enabling ACP remote filesystem support.
9. **[#29098](https://github.com/google-gemini/gemini-cli/pull/29098)** — Fixes impure React state updaters in `useInputHistoryStore` (closes #29046).
10. **[#29166](https://github.com/google-gemini/gemini-cli/pull/29166)** — Fixes broken extension update rollback: backup dir was always empty, so failed updates destroyed extensions.

## Feature Request Trends
- **Model availability & selection**: rapid demand for new Flash models in the picker (#29164, #29172).
- **Agent reliability & observability**: visible subagent trajectories via `/chat share` (#22598), subagent context in `/bug` reports (#21763), accurate termination reporting (#22323).
- **AST-aware codebase tooling**: better navigation and fewer wasted turns (#22745, #22746).
- **Safety guardrails**: discourage destructive git/DB operations (#22672), consent for extension environment changes.
- **Better subagent delegation**: model should proactively use skills/subagents (#21968).

## Developer Pain Points
- **False success / silent failure in agents**: MAX_TURNS reported as GOAL success (#22323), Wayland browser agent false positives (#21983) — users can't trust agent status.
- **Hangs and stuck states**: generalist agent hangs (#21409), shell "Waiting input" deadlock (#25166), vite interactive prompt stall (#22465).
- **Workspace pollution**: model scatters tmp scripts across directories (#23571), making clean commits painful.
- **Memory system immaturity**: Auto Memory retries low-signal sessions indefinitely (#26522), silently drops invalid patches (#26523), and leaks secrets pre-redaction (#26525).
- **Sandbox/Windows edge cases**: repeated PR flow around Seatbelt, NTFS SFN, and ACL issues shows platform-specific safety gaps are a current maintainer focus.

*No discussion data was provided for this period.*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-03

## 1. Today's Highlights

The v1.0.83 line shipped two patch releases in 24 hours, headlined by multi-model fallback support for custom agents (`model` lists + `model-policy: required`), claude-fable-5.1 support, and hardened Linux sandbox egress restrictions. Meanwhile, a cluster of memory-related bugs (OOM on session resume, leaked libuv handles, WSL2 31 GB RSS) emerged on v1.0.82, making session stability the dominant pain point this week. MCP reliability — OAuth token reuse, flaky server connections, and protocol version mismatches — also remains a hot area with multiple active reports.

## 2. Releases

- **[v1.0.83-3](https://github.com/github/copilot-cli/releases/tag/v1.0.83-3)** — General fixes and changes.
- **[v1.0.83-2](https://github.com/github/copilot-cli/releases/tag/v1.0.83-2)** — Notable changes:
  - **Added:** Custom agents can list several models in `model`, tried in order until one is available; `model-policy: required` pins model selection to that list. Support for `claude-fable-5.1`.
  - **Improved:** Linux sandboxes now restrict network egress to the configured proxy.

No PRs were updated in the last 24 hours.

## 3. Hot Issues

1. **[#2630 — Custom agent `mcp-servers` not connected in sub-agent/`--prompt` contexts](https://github.com/github/copilot-cli/issues/2630)** (CLOSED, 9 comments) — Long-running agent bug: custom agents only received basic tools when invoked as sub-agents. Now resolved; significant for anyone building modular agent workflows.
2. **[#3709 — Allow `/model` to switch models, incl. BYOK/local providers, within one session](https://github.com/github/copilot-cli/issues/3709)** (OPEN, 29 👍) — BYOK currently pins a session to a single model via `COPILOT_MODEL`. Highest community demand in this digest; ties directly into the new multi-model release feature.
3. **[#4664 — JS heap OOM when resuming a long-standing session](https://github.com/github/copilot-cli/issues/4664)** (5 comments) — Sessions become unrecoverable due to Node heap exhaustion; corroborated by #4699.
4. **[#4525 — Legacy `initialize` sent after modern `server/discover`, causing -32022](https://github.com/github/copilot-cli/issues/4525)** (5 comments) — MCP protocol version negotiation bug against Python MCP SDK 2.0.0 dual-era runners; blocks stdio MCP usage.
5. **[#4224 — OTel spans for subagent calls omit billing attributes](https://github.com/github/copilot-cli/issues/4224)** (4 comments) — `github.copilot.nano_aiu` / cost attributes missing, so external cost accounting undercounts real spend. Important for enterprise FinOps.
6. **[#4438 — `disable-model-invocation: true` makes a skill fully unreachable](https://github.com/github/copilot-cli/issues/4438)** (4 comments, 6 👍) — Intended "manual-only" semantics aren't implemented; explicit `skill()` invocation returns "Skill not found."
7. **[#4674 — Session resume doesn't restore the custom agent (regression of #917)](https://github.com/github/copilot-cli/issues/4674)** — Resumed sessions silently drop agent `mcp-servers` and tool allow-lists — a security-relevant regression.
8. **[#4695 — MCP OAuth tokens not reused across sessions; duplicate cache-keys force re-auth](https://github.com/github/copilot-cli/issues/4695)** — Cache-key hashing instability causes repeated OAuth logins for HTTP MCP servers.
9. **[#4692 — Enterprise default model (`MAI-Code-1.1-Flash`) rejected in CLI](https://github.com/github/copilot-cli/issues/4692)** — Org-managed default models work in VS Code/Desktop but not CLI; enterprise model parity gap.
10. **[#4686 — OOM crash after ~37 min with 31,965 leaked libuv handles](https://github.com/github/copilot-cli/issues/4686)** — Resource leak with detailed diagnostics; SEA build ignores `NODE_OPTIONS`, limiting user workarounds.

Also worth watching: [#4598 — MCP startup connects only 3 of 18 servers, no retry, and reloads kill live handles](https://github.com/github/copilot-cli/issues/4598); [#4683 — spurious errors on every shell command under PowerShell ConstrainedLanguage mode](https://github.com/github/copilot-cli/issues/4683).

## 4. Key PR Progress

No pull requests were updated in the last 24 hours. Release v1.0.83-3 ("Fixes and changes") presumably bundles merged work, but no per-PR detail is available in this window.

## 5. Hot Discussions

No discussion data was provided for this period.

## 6. Feature Request Trends

- **In-session model flexibility** is the top ask: mid-session switching across hosted/BYOK/local models ([#3709](https://github.com/github/copilot-cli/issues/3709)), an `/effort` shortcut for reasoning effort (closed after 9 👍, [#3074](https://github.com/github/copilot-cli/issues/3074)), per-agent provider endpoints ([#4703](https://github.com/github/copilot-cli/issues/4703)), and `contextTier` exposure in ACP mode ([#4275](https://github.com/github/copilot-cli/issues/4275)).
- **Configuration surface expansion:** configurable shell type on Windows ([#2271](https://github.com/github/copilot-cli/issues/2271)), enterprise default model support in CLI ([#4692](https://github.com/github/copilot-cli/issues/4692)), and honoring `skillDirectories` in ACP mode ([#4700](https://github.com/github/copilot-cli/issues/4700)).
- **Correct manual-only skill semantics** — `disable-model-invocation` should mean "manual only," not "unreachable" ([#4438](https://github.com/github/copilot-cli/issues/4438)).

## 7. Developer Pain Points

- **Memory/resource leaks on long sessions** (v1.0.82): OOM on resume ([#4664](https://github.com/github/copilot-cli/issues/4664), [#4699](https://github.com/github/copilot-cli/issues/4699)), leaked libuv handles ([#4686](https://github.com/github/copilot-cli/issues/4686)), and 31 GB RSS on WSL2 ([#4694](https://github.com/github/copilot-cli/issues/4694)). Compounding issues: `NODE_OPTIONS` ignored in SEA builds and crash dumps polluting the user's cwd.
- **MCP fragility:** protocol negotiation mismatches ([#4525](https://github.com/github/copilot-cli/issues/4525)), servers silently failing to connect or vanishing mid-session ([#4598](https://github.com/github/copilot-cli/issues/4598)), OAuth token/cache-key churn forcing re-auth ([#4695](https://github.com/github/copilot-cli/issues/4695), [#4203](https://github.com/github/copilot-cli/issues/4203)), and `/clear` leaking stdio child processes ([#4697](https://github.com/github/copilot-cli/issues/4697)).
- **Compaction failures:** repeated "received empty response from model" errors on `/compact` ([#2861](https://github.com/github/copilot-cli/issues/2861), [#4698](https://github.com/github/copilot-cli/issues/4698)).
- **Windows/enterprise environment gaps:** PowerShell ConstrainedLanguage noise ([#4683](https://github.com/github/copilot-cli/issues/4683)), path-separator dedup bugs ([#4702](https://github.com/github/copilot-cli/issues/4702)), truncated approval previews ([#4701](https://github.com/github/copilot-cli/issues/4701)), and proxy-related OAuth regression fixed in [#4671](https://github.com/github/copilot-cli/issues/4671).
- **State restoration reliability:** resumed sessions losing custom agents ([#4674](https://github.com/github/copilot-cli/issues/4674)) and dropped `allow-all` permissions after idle ([#4696](https://github.com/github/copilot-cli/issues/4696)).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-03

## 1. Today's Highlights

A new **live-host-v0.2.0** release shipped, while the OpenTUI migration (batch 4) continues to advance — now accompanied by submit-path parity fixes in [#10831](https://github.com/QwenLM/qwen-code/pull/10831). Security and reliability surfaced as major themes: a repo-wide **P1 CVE audit failure** on main's lockfile ([#10850](https://github.com/QwenLM/qwen-code/issues/10850)) and a pair of P1 bugs around monitor pulse storms starving interactive sessions. The CI Failure Patrol filed an unusual cluster of per-commit main-branch failures (10+ issues in 48h), prompting multiple CI hardening PRs.

## 2. Releases

- **[live-host-v0.2.0](https://github.com/QwenLM/qwen-code/releases/tag/live-host-v0.2.0)** — Qwen Live Host v0.2.0. Release notes are auto-generated; see the tag for the changelog.

## 3. Hot Issues

1. **[#8662](https://github.com/QwenLM/qwen-code/issues/8662) — Migrate TUI rendering from ink to OpenTUI (tracking)** — The highest-engagement issue (22 comments). The current ink 7 + React 19 stack carries a ~1,037-line patch and suffers structural flicker/rendering problems; this migration is the project's biggest UI architectural bet.
2. **[#10818](https://github.com/QwenLM/qwen-code/issues/10818) — Monitor pulse storm can DoS interactive sessions (P1)** — A runaway pulse loop produces a 25 MB transcript and starves user input; ESC cancellation is ineffective. Reliability-critical for daily use.
3. **[#10850](https://github.com/QwenLM/qwen-code/issues/10850) — Dependency CVE audit failing repo-wide (P1)** — New fast-uri/qs/uuid advisories (incl. 1 high severity) broke `npm audit` on main between 16:30–17:20Z on 09-02; needs urgent lockfile remediation.
4. **[#10860](https://github.com/QwenLM/qwen-code/issues/10860) / [#10859](https://github.com/QwenLM/qwen-code/issues/10859) — `qwen serve` shell guard overreach** — The daemon's built-in git/shell guard ignores approval mode, blocks read-only commands outside the session dir, and offers no configuration, audit trail, or operator surface. #10859 (closed) was the git-specific report; #10860 generalizes it.
5. **[#10692](https://github.com/QwenLM/qwen-code/issues/10692) — XML tool calls leak as plain text** — The fallback recovery misses the exact `<tool_call>` dialect the system prompt teaches models to emit — an embarrassing self-consistency gap.
6. **[#10791](https://github.com/QwenLM/qwen-code/issues/10791) / [#10797](https://github.com/QwenLM/qwen-code/issues/10797) / [#10700](https://github.com/QwenLM/qwen-code/issues/10700) — Content-sanitizer gap cluster** — Balanced `<thinking>` blocks, tool-result scaffolding tags, and orphaned closing tags all leak into user-visible output. Marked `welcome-pr`; a mini-workstream awaiting contributors.
7. **[#10834](https://github.com/QwenLM/qwen-code/issues/10834) — MCP tool images bypass the image budget** — Unlike `read_file`, MCP-returned images enter context at full resolution, unbounded — a context-window cost and DoS vector. `ready-for-agent`.
8. **[#10173](https://github.com/QwenLM/qwen-code/issues/10173) — Reload project config after `/cd` (closed)** — `/cd` now activates the target directory's full project-scoped settings, hooks, and trusted-folder state — a long-requested configuration correctness fix.
9. **[#10782](https://github.com/QwenLM/qwen-code/issues/10782) — Removed workspaces leave stale Channel selections (closed)** — Stale in-memory `committedSelection` entries blocked new Channel starts; fixed promptly after reporting.
10. **[#9942](https://github.com/QwenLM/qwen-code/issues/9942) — Hide skill commands from slash completion** — Popular UX request: installed skills flood the `/` completion menu, burying built-in commands. Under discussion (`need-discussion`).

## 4. Key PR Progress

1. **[#10831](https://github.com/QwenLM/qwen-code/pull/10831) — OpenTUI submit-path parity + E2E leg restored** — Closes four gaps vs. the ink renderer (raw text passthrough, `@`-mention file resolution, etc.) and restores OpenTUI's E2E test coverage. Key step for #8662.
2. **[#10861](https://github.com/QwenLM/qwen-code/pull/10861) — CI patrol reads status rollup per-PR** — Fixes the patrol hammering GitHub's API in one query; unreadable rollups are skipped with a stderr note instead of failing.
3. **[#10751](https://github.com/QwenLM/qwen-code/pull/10751) — Session turn navigation protocol (serve)** — Phase 1 of #10750: daemon/SDK contract with a bounded sparse turn index and signed workspace-bound snapshots for Web Shell history navigation.
4. **[#10842](https://github.com/QwenLM/qwen-code/pull/10842) — Stop one flaky test from failing stable releases** — Stable releases gain the same retry policy as nightly/preview, plus hardening of six known-flaky tests.
5. **[#10807](https://github.com/QwenLM/qwen-code/pull/10807) — Aggregate DingTalk background agent responses** — Buffers per-agent response text for blocked streaming so multi-agent background tasks render coherently.
6. **[#10627](https://github.com/QwenLM/qwen-code/pull/10627) — Web Shell environment panel state restoration** — Panel becomes a durable session-context entry point: attachments, artifacts, subagent inventory, background tasks, with skeletons and stable empty states.
7. **[#9768](https://github.com/QwenLM/qwen-code/pull/9768) — `/review` coverage as a sealed, classified ledger** — Review runs now report per-chunk coverage, why gaps exist, and how much of the diff was actually read — a big transparency upgrade for AI review.
8. **[#10136](https://github.com/QwenLM/qwen-code/pull/10136) / [#10169](https://github.com/QwenLM/qwen-code/pull/10169) — Review round shapes** — Re-review switches to a narrowed fix-audit mode under critical posture; `--fix` applications are audited via a `fix-delta` snapshot for unpinned assumptions.
9. **[#10575](https://github.com/QwenLM/qwen-code/pull/10575) / [#10756](https://github.com/QwenLM/qwen-code/pull/10756) — CI capacity work** — Seconds-long jobs move to a dedicated `ecs-light` lane; lint/static checks split into their own job to unblock the test pipeline.
10. **[#10347](https://github.com/QwenLM/qwen-code/pull/10347) — Auto-retry transient network EOF errors** — Wrapped 4xx network failures (e.g. `400 ... EOF`) are reclassified as retryable transport errors, removing the need for manual Ctrl+Y retries.

## 5. Hot Discussions

_No discussion data was provided for this period._

## 6. Feature Request Trends

- **Terminal UX modernization**: The ink → OpenTUI migration (#8662) dominates UI roadmapping, with batch-4 PRs and parity fixes landing steadily.
- **Daemon/Web Shell ergonomics**: Turn navigation (#10751), durable environment panels (#10627), session rotation (#8927), and cross-conversation responsiveness all point to heavy investment in `qwen serve` as a first-class surface.
- **Output hygiene for hybrid-thinking models**: Multiple requests to contain model-side XML leakage (thinking tags, tool-call dialects, orphaned tags) — clearly a priority given five related open issues.
- **Operational transparency & control**: Configurable, auditable shell guards; visible coverage ledgers for AI review; observable CI failures with named jobs.
- **CI infrastructure resilience**: Lane splitting, timeout ceilings, and per-PR API reads reflect a self-hosted ECS pool under strain.

## 7. Developer Pain Points

- **Flaky CI on shared self-hosted runners**: 10+ per-commit main-branch failure issues in two days (#10725–#10840), forcing a wave of fixes: retry policies, timeout ceilings, lane splitting, and better failure diagnostics (#10855 names the failing job/step).
- **Content sanitizer whack-a-mole**: Every fix for tag leakage exposes another unhandled shape; developers are frustrated that the `<tool_call>` format the tool itself teaches is the one that leaks.
- **Opaque security defaults**: The `qwen serve` shell guard blocks work silently with no override or audit path — a trust and workflow friction point for daemon users.
- **Unbounded context growth**: Monitor pulse storms (#10818) and full-resolution MCP images (#10834) both silently inflate sessions and transcripts.
- **Configuration staleness**: Until recently, `/cd` left project settings/hooks stale (#10173); skill-command clutter in slash menus (#9942) remains an open annoyance.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/lijiaming325-arch/agents-radar).*