# AI CLI Tools Community Digest 2026-08-28

> Generated: 2026-08-28 15:10 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison Report — 2026-08-28

## 1. Ecosystem Overview

The AI CLI ecosystem remains in a rapid-release phase, with four of the tracked tools (Claude Code, OpenAI Codex, GitHub Copilot CLI, OpenCode) shipping releases within the last 24 hours. Two dominant themes cut across all communities: **multi-agent orchestration reliability** (subagent delegation, wake-on-completion, parallel-run stability) and **enterprise-grade trust** (sandboxing, approval policies, auditability, auth for data-residency tenants). Windows remains the weakest platform across every ecosystem, with launch, packaging, and update pipelines generating the highest-traffic issues. Notably, three repos (Gemini CLI, Pi, Qwen Code) had no digest data available today, so this report covers the four active ecosystems.

## 2. Activity Comparison

| Tool | Issues (24h signal) | PRs (24h) | Discussions | Releases |
|---|---|---|---|---|
| **Claude Code** | ~10 hot issues (2 closed, incl. #86275) | 0 updated | N/A (none reported) | 2 (v2.1.248, v2.1.250) |
| **OpenAI Codex** | ~10+ hot issues (up to 37 comments) | 10+ merged/updated | Active (Ideas/Q&A/Show-and-tell, 4 threads) | 2 (v0.151.0-alpha.7/.8) |
| **GitHub Copilot CLI** | ~10 hot issues (heavy triage) | 0 updated (recent merges in v1.0.81) | N/A (none reported) | 2 (v1.0.81 GA, v1.0.82-0 pre) |
| **OpenCode** | ~10 hot issues + same-day bug burst | 10 PRs (several merged same-day) | N/A (discussed in issues) | 2 (v1.18.24, v1.18.25) |
| **Gemini CLI** | N/A — no digest data available | N/A | N/A | N/A |
| **Pi** | N/A — no digest data available | N/A | N/A | N/A |
| **Qwen Code** | N/A — no digest data available | N/A | N/A | N/A |

## 3. Shared Feature Directions

- **Multi-agent orchestration ergonomics** — Claude Code (delegation to existing tmux sessions, #86338), Codex (subagent wake-on-completion, #15723; service-tier propagation, #41308), Copilot CLI (TUI freeze under parallel subagents, #4533), OpenCode (subagent ID discoverability, #36761). All four are converging on agentic workflows and all four have reliability gaps there.
- **Execution transparency & auditability** — Codex's top request is uncollapsed command output (#39903, 👍63); Copilot CLI wants verifiable review records with model provenance (#4621); Claude Code users want non-hallucinated transcripts (#79293). Auditing agent actions is a universal demand.
- **Long-running / non-interactive runs** — Claude Code `--restricted` mode (v2.1.248), Codex 5-hour limit conflicts (#40905), Copilot CLI `-p` 401s on GHEC (#4527), OpenCode silent stalls (#32149). Automation is a first-class use case everywhere, but tooling and rate limits lag.
- **Silent failure / fail-silent behavior** — Claude Code queued-input data loss (#85924), Copilot CLI silently dropped model params (#4645), OpenCode pre-runner failures only logged (#45959). Users consistently demand delivery guarantees and visible errors.
- **Cost/usage transparency** — Codex usage-drain complaints (#40067), OpenCode usage percentage errors (#45858) and cost-in-picker request (#14524), Copilot CLI tool-search token reduction (#4649). Billing and context-cost trust is eroding across vendors.
- **Upgrade/regression churn** — slash autocomplete regression in Claude Code (#90102), Codex tools disappearing post-update (#41145) and hard config breaks (#39973), Copilot CLI breaking chroma-mcp on a minor release (#4647). Every ecosystem needs better release gating and rollback.

## 4. Differentiation Analysis

- **Claude Code** — Focused on safety boundaries (`--restricted` sandboxing, settings isolation) and desktop/IDE polish; targets security-conscious deployments and CI. Strong release discipline but Linux and Windows desktop testing is thin.
- **OpenAI Codex** — Deepest engineering investment: Guardian approval-review hardening, MCP tool-cache correctness, app-server v2 architecture unifying CLI/Desktop. Most active PR cadence (20+ merges). Targets complex multi-agent and remote/mobile workflows; Windows packaging is its Achilles' heel.
- **GitHub Copilot CLI** — Enterprise-first: GHEC data residency, managed settings, OpenTelemetry hooks, MCP 2026-07-28 spec support across all clients. Weaknesses are fail-closed behavior and prerelease-channel stability — hostile failure modes for exactly its enterprise audience.
- **OpenCode** — Most community-driven (contributors landing fixes same-day, issue authors submitting PRs) and most transparent on cost. Broad provider flexibility (Azure Entra ID, Bedrock, Kimi); but a V1→V2 transition with migration failures and beta instability creates platform risk.

## 5. Community Momentum & Maturity

- **Fastest iteration:** Codex and OpenCode, each with 10+ PRs merged/updated in 24h and two releases. OpenCode shows the healthiest community contribution loop.
- **Steady enterprise cadence:** Claude Code and Copilot CLI shipped releases with zero PR activity reported — triage-driven days suggesting mature but slower-moving codebases, or lulls between merge waves.
- **Highest engagement signals:** Codex #40700 (37 comments) and #39903 (👍63); OpenCode #6536 (👍50); Claude Code #86275 (15 comments). Codex has the largest raw community volume; OpenCode has the strongest per-issue passion.
- **Data gaps:** Gemini CLI, Pi, and Qwen Code digests failed to generate — cannot assess their momentum today; treat as unknown, not inactive.

## 6. Trend Signals

1. **Agentic workflows are outpacing infrastructure.** Every tool's top pain points involve multi-agent runs (delegation, async completion, parallel TUI stability, orchestration timeouts). Teams building on these tools should expect orchestration-layer churn through at least year-end.
2. **Security models are being formalized — unevenly.** Claude Code ships `--restricted`; Codex hardens Guardian review and terminal permissions; Copilot CLI enforces managed settings fail-closed (perhaps too aggressively). Conversely, Codex's un-deprecated `approval_policy` removal (#39973) shows safety changes still land without migration paths — pin versions and test upgrades in staging.
3. **Windows is the cross-ecosystem weak point.** Launch failures, packaging (AppX), update-relaunch, and input bugs dominate Windows reports everywhere. Windows-first teams should weight this in tool selection.
4. **Usage/billing trust is becoming a competitive factor.** Suspected accounting regressions (Codex #40067) and misleading limits (OpenCode #45897) mirror consumer-SaaS dynamics; expect transparency (cost-in-picker, usage APIs) to become table stakes.
5. **Practical guidance for developers:** (a) prefer tools with atomic auth/config writes and rollback paths before long autonomous runs; (b) don't trust silent success — add transcript/audit verification; (c) for CI, Claude Code's `--restricted` and Copilot CLI's managed settings are currently the most explicit sandboxing stories; (d) for multi-provider flexibility and cost visibility, OpenCode currently leads.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills summary generation failed.

---

# Claude Code Community Digest — 2026-08-28

## 1. Today's Highlights

Anthropic shipped two releases in 24h: **v2.1.250** (general bug fixes/reliability) and **v2.1.248**, which introduced a notable new `--restricted` mode that hardens Claude Code for sandboxed/automation environments by stripping command-execution and web tools and ignoring user settings files. The issue tracker saw heavy activity — most notably the closure of the Windows desktop cross-session messaging bug (#86275, 15 comments) and a fresh regression report on slash-command autocomplete (#90102). No PRs were updated in the window, so attention today is on releases and issue triage.

## 2. Releases

- **[v2.1.250](https://github.com/anthropics/claude-code/releases/tag/v2.1.250)** — Bug fixes and reliability improvements only.
- **[v2.1.248](https://github.com/anthropics/claude-code/releases/tag/v2.1.248)** — Added `--restricted` (or `CLAUDE_CODE_RESTRICTED=1`): removes built-in command/code-execution tools and `WebFetch` (unless explicitly allowlisted via `--tools`), confines file tools to the working directory, refuses `bypassPermissions`, and ignores user/project/local settings files. This is a significant option for CI, shared hosts, and security-conscious deployments.

## 3. Hot Issues

1. **[#86275 — Windows desktop: cross-session send_message silently fails](https://github.com/anthropics/claude-code/issues/86275)** (CLOSED, 15 comments, 👍7) — Messages to other local sessions reported success but were never delivered after the 2.1.222→2.1.227 runtime auto-update. Now closed; the highest-engagement issue of the day.
2. **[#58933 — No in-session determinism mechanism; automation pushed to metered Agent SDK](https://github.com/anthropics/claude-code/issues/58933)** (CLOSED, 11 comments) — Long-running debate over automation usage semantics vs. subscriber limits; closure will matter to heavy-scripting users.
3. **[#85924 — Queued composer text silently discarded on mobile (Android)](https://github.com/anthropics/claude-code/issues/85924)** (OPEN, 9 comments, 👍4) — Queued input vanishes when a turn ends or the session updates; a data-loss bug in the mobile app.
4. **[#79293 — Model fabricates user turn and system-reminder blocks past end of turn](https://github.com/anthropics/claude-code/issues/79293)** (OPEN, 8 comments, Windows) — A model-behavior bug with hallucinated context structure; concerning for anyone parsing transcripts.
5. **[#86338 — Agent tool spawns new pane subagents instead of delegating to existing tmux sessions](https://github.com/anthropics/claude-code/issues/86338)** (OPEN, 4 comments, Linux) — Fleet-of-sessions orchestration pain; no way to direct work to already-running teammates.
6. **[#83146 — Renamed project root: session registry never revalidates cwd](https://github.com/anthropics/claude-code/issues/83146)** (OPEN, 3 comments) — Stale path silently breaks settings/hooks/memory and recreates deleted directories.
7. **[#90102 — Regression: slash autocomplete no longer triggers mid-input](https://github.com/anthropics/claude-code/issues/90102)** (OPEN, Windows, regression) — Only fires when `/` is the first character; previously fixed once in v2.1.136 and now back.
8. **[#89298 — Remote Control never auto-enables on Pro/Max plans](https://github.com/anthropics/claude-code/issues/89298)** (CLOSED, macOS desktop, regression) — Managed-settings gate evaluated before the personal-plan short-circuit; fixed after 3 days.
9. **[#86853 — Bash tool never surfaces stdout on Linux; bare Exit code 1](https://github.com/anthropics/claude-code/issues/86853)** (OPEN, regression suspicion) — Even `echo`/`pwd` fail; severe if confirmed across fresh sessions.
10. **[#90359 — Cowork & Dispatch hang on infinite spinner on Linux](https://github.com/anthropics/claude-code/issues/90359)** (OPEN) — App opens its own storage dirs with `O_DIRECT`; ext4 returns `EINVAL`. A fresh report with a clear root-cause hypothesis.

## 4. Key PR Progress

No pull requests were updated in the last 24 hours. Activity was concentrated in releases and issue resolution.

## 5. Hot Discussions

No discussion data was provided for this period.

## 6. Feature Request Trends

- **Sandboxing & restricted operation** — The `--restricted` flag in v2.1.248 directly addresses the automation/sandboxing use case echoed in #58933's concerns about deterministic, non-interactive runs.
- **Agent orchestration ergonomics** — Repeated asks around multi-agent workflows: delegating to existing tmux sessions (#86338), per-call `worktree.baseRef` overrides (#74091), per-agent/per-phase goals in Workflow (#74142), and mid-run hot-reload steering (#74146). Several of these were just closed.
- **Desktop app UX polish** — Session tabbing, nested sidebar folders, visit-history navigation (#74124/#74127/#74129), last-updated timestamps (#74168), and compact diff summaries in VS Code (#74175).
- **Context control** — Requests for shell modes that never touch model context (#74095) and self-monitoring activity summaries (#69136) show users want tighter control over what enters the context window.
- **Model behavior calibration** — Requests to stop unintended model switching (#74166, #74137) and forbidden advisory paragraphs (#90044).

## 7. Developer Pain Points

- **Windows desktop reliability** — A cluster of Windows-specific issues: silent cross-session message loss (#86275), autocomplete regression (#90102), VS Code split-panel focus ping-pong (#89975), and console window flashing (#74107).
- **Silent failures / data loss** — Queued mobile input discarded (#85924), stale project roots breaking settings (#83146), and notifications going silent across context compaction (#89248). Users want delivery guarantees and visible error states.
- **Linux rough edges** — Bash stdout never surfacing (#86853) and `O_DIRECT`/ext4 hang (#90359) suggest limited Linux desktop/cowork testing.
- **Regression churn** — Bugs fixed once and reappearing (slash autocomplete) plus regressions from auto-updates (desktop runtime 2.1.222→2.1.227) erode trust in update cadence.
- **Model adherence & determinism** — CLAUDE.md instructions being ignored (#90044) and fabricated turns (#79293), compounded by the long-standing determinism/automation debate in #58933.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-08-28

## 1. Today's Highlights

The repo saw two alpha releases in the 0.151.0 line (`alpha.7`, `alpha.8`) alongside a heavy merge cadence of 20+ PRs, with significant investment in Guardian approval/review safety logic and MCP tool-cache handling. Community attention remains focused on Windows Desktop stability — four of the top issues involve launch failures, app-server crashes, or update problems on Windows — and on a contentious config breaking change that retired `approval_policy = "untrusted"` without deprecation.

## 2. Releases

- **[rust-v0.151.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.8)** and **[rust-v0.151.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.7)** — two rapid alpha iterations in the 0.151.0 series, presumably shipping the wave of MCP cache, Guardian review, and history-backend fixes merged today. No detailed release notes provided.

## 3. Hot Issues

1. **[#40700](https://github.com/openai/codex/issues/40700)** — *Windows Desktop cannot start: bundled codex.exe relocation from WindowsApps fails* (37 comments). Windows AppX packaging blocks the bundled binary from relocating, preventing launch entirely. The highest-traffic issue today; part of a broader Windows Desktop launch-failure cluster.
2. **[#39903](https://github.com/openai/codex/issues/39903)** — *Add option to disable "Ran N commands" collapsing* (35 comments, 👍 63). Users want full visibility into executed commands instead of collapsed summaries. Strongest 👍-to-comment signal of the day; a clear UX transparency demand.
3. **[#31987](https://github.com/openai/codex/issues/31987)** — *Auto-recharge of credits keeps getting re-enabled automatically* (20 comments). A long-running billing/UX complaint: the auto-recharge toggle silently flips back on. Persistent since July and still unresolved.
4. **[#15723](https://github.com/openai/codex/issues/15723)** — *Background subprocesses/subagents do not wake the calling agent on completion* (19 comments). A March-era architectural gap in async agent orchestration that's becoming more visible as agentic workflows grow.
5. **[#39973](https://github.com/openai/codex/issues/39973)** — *Retiring `approval_policy="untrusted"` without deprecation weakens the execution-approval boundary* (11 comments, 👍 30). Codex 0.149.0 hard-fails on this config with no migration path, and critics argue the replacement weakens the security model. High community resonance on both safety and DX grounds.
6. **[#24047](https://github.com/openai/codex/issues/24047)** — *Windows Desktop update installs but does not relaunch* (13 comments). Five-month-old update-relaunch bug still active — emblematic of the Windows update pipeline's issues.
7. **[#39678](https://github.com/openai/codex/issues/39678)** / **[#40002](https://github.com/openai/codex/issues/40002)** — *Android Remote fails with project trust errors* (12 / 9 comments). Remote sessions from Android fail trust verification against macOS and Windows hosts respectively; #40002 is specifically a case-sensitivity bug in Windows path lookup. Remote workflows are the fastest-growing surface for trust/path bugs.
8. **[#39280](https://github.com/openai/codex/issues/39280)** — *macOS: Chrome tabs claimable, but every real-page action fails policy verification* (10 comments), paired with the regression **[#39972](https://github.com/openai/codex/issues/39972)** — *Browser controls no longer working*. Browser-use functionality is effectively broken on macOS across two parallel reports.
9. **[#40905](https://github.com/openai/codex/issues/40905)** — *5-hour usage limit interrupts long-running GPT-5.6 Sol agent tasks* (8 comments). The rolling usage window conflicts with multi-hour autonomous runs; a product-policy issue gaining traction as agent runtimes lengthen.
10. **[#40067](https://github.com/openai/codex/issues/40067)** — *GPT-5.6 Plus weekly usage drained from ~99% to 0% within hours* (7 comments). Suspected usage-accounting regression; combined with #40905, rate-limit trust is a rising frustration theme. Also notable: **[#41145](https://github.com/openai/codex/issues/41145)** reports shell execution tools disappearing after updating to 0.150.1 — watch this one for regression reports.

## 4. Key PR Progress

1. **[#41344](https://github.com/openai/codex/pull/41344)** / **[#41336](https://github.com/openai/codex/pull/41336)** — *MCP tool-cache handling during binding capture* (two complementary fixes). Ensure refreshed and cached tool catalogs are handled correctly when bindings wait on multiple MCP servers, so newly available tools aren't omitted from the first model request.
2. **[#41309](https://github.com/openai/codex/pull/41309)** — *Honor required reviews when reusing Guardian scores*. Fixes a real security hole: a cached low-risk score could let an action bypass a required full review after a model switch. Part of today's Guardian hardening wave (see also [#41322](https://github.com/openai/codex/pull/41322)).
3. **[#41328](https://github.com/openai/codex/pull/41328)** — *Review terminal input against retained permissions*. `write_stdin` calls now account for the sandbox/grants a terminal had at launch, closing a permission-drift gap.
4. **[#41308](https://github.com/openai/codex/pull/41308)** — *Subagents follow the root service tier*. Service-tier selection now propagates across the entire agent tree, including remote compaction — relevant to anyone running multi-agent workflows with tiered routing.
5. **[#41243](https://github.com/openai/codex/pull/41243)** — *Configurable gating for the sleep tool*. New stable `sleep_tool` feature flag (`model_driven` / `always_on`), decoupling the sleep tool from the clock tool — a signal that built-in tool sets are becoming more modular/configurable.
6. **[#41239](https://github.com/openai/codex/pull/41239)** — *Surface auth recovery progress*. New `modelProvider/authRecoveryStarted`/`Completed` events so clients can show credential-refresh state instead of appearing hung.
7. **[#41292](https://github.com/openai/codex/pull/41292)** — *Forward history note images to the model*. Image attachments in history notes now become `input_image` items, with malformed-attachment rejection and log sanitization.
8. **[#41260](https://github.com/openai/codex/pull/41260)** — *History backend enforces tool output budgets*. Removes redundant client-side truncation that could reject already-bounded responses — a fix for spurious tool-result failures.
9. **[#41313](https://github.com/openai/codex/pull/41313)** — *Decouple HTTP retry backoff from overload integration testing*. Retry/backoff now verified under paused Tokio time; better test reliability for overload handling.
10. **[#10192](https://github.com/openai/codex/pull/10192)** — *Migrate TUI to app-server v2* (long-running, updated today). Bolinfest's architectural effort to make the TUI speak the app-server protocol remains active after ~7 months — foundational for unifying CLI and Desktop on one server.

## 5. Hot Discussions

**Ideas**
- **[#25630](https://github.com/openai/codex/discussions/25630)** — *Switch Between Accounts*: request for a one-click account switcher instead of full sign-out/sign-in cycles.

**Q&A**
- **[#40740](https://github.com/openai/codex/discussions/40740)** — *Does rollout tracing capture which path produced a Declined exec status?* Deep-dive into `rollout/src/policy.rs` persistence semantics for approval/decline events — of interest to anyone building tooling on rollout traces.
- **[#41314](https://github.com/openai/codex/discussions/41314)** — *codex*: inquiry (in Chinese) about the status of the Codex desktop pet — see also today's pet bug [#41306](https://github.com/openai/codex/issues/41306).

**Show and tell**
- **[#41319](https://github.com/openai/codex/discussions/41319)** — *Click*: an open-source Codex plugin by grapefruit0205 that stops agents from re-planning and over-verifying after work is already complete — an interesting ecosystem response to agent-efficiency complaints.

## 6. Feature Request Trends

- **Execution transparency**: the top-requested change (👍 63) is surfacing full command output instead of collapsed summaries ([#39903](https://github.com/openai/codex/issues/39903)) — users want auditability of agent actions.
- **Async agent orchestration**: wake-on-completion for subagents ([#15723](https://github.com/openai/codex/issues/15723)) and longer uninterrupted agent runs (rate-limit relief, [#40905](https://github.com/openai/codex/issues/40905)) reflect demand for long-running autonomous workflows.
- **Security-policy clarity**: community wants a proper deprecation/migration path for approval policies rather than hard breaks ([#39973](https://github.com/openai/codex/issues/39973)).
- **Account/billing control**: account switching ([#25630](https://github.com/openai/codex/discussions/25630)) and auto-recharge persistence ([#31987](https://github.com/openai/codex/issues/31987)) keep recurring.
- **Configurable built-in tools**: the `sleep_tool` gating PR ([#41243](https://github.com/openai/codex/pull/41243)) suggests the team is already moving toward user-tunable tool registration.

## 7. Developer Pain Points

- **Windows Desktop is the dominant pain point**: launch failures from AppX relocation ([#40700](https://github.com/openai/codex/issues/40700), [#41096](https://github.com/openai/codex/issues/41096)), no relaunch after updates ([#24047](https://github.com/openai/codex/issues/24047)), startup loops ([#39364](https://github.com/openai/codex/issues/39364)), app-server crashes during tool calls ([#40400](https://github.com/openai/codex/issues/40400)), and node.exe access violations ([#40913](https://github.com/openai/codex/issues/40913)). The Windows update/packaging pipeline needs systematic attention.
- **Remote/cross-device trust is fragile**: Android-to-desktop sessions repeatedly fail project-trust verification ([#39678](https://github.com/openai/codex/issues/39678), [#40002](https://github.com/openai/codex/issues/40002)), and mobile SSH sessions don't live-sync ([#29094](https://github.com/openai/codex/issues/29094)).
- **Rate-limit reliability**: sudden usage drain ([#40067](https://github.com/openai/codex/issues/40067)) and mid-task interruptions ([#40905](https://github.com/openai/codex/issues/40905)) erode confidence in usage accounting.
- **Upgrade regressions**: tools disappearing after CLI updates ([#41145](https://github.com/openai/codex/issues/41145)), hard config breaks without migration ([#39973](https://github.com/openai/codex/issues/39973)), and the macOS browser-extension regression ([#39972](https://github.com/openai/codex/issues/39972)) — users want better release gating and rollback paths.
- **Session/state hygiene**: stale sessions ([#24217](https://github.com/openai/codex/issues/24217)), undeletable threads ([#39897](https://github.com/openai/codex/issues/39897), [#40313](https://github.com/openai/codex/issues/40313)), and bulk-delete no-ops ([#28298](https://github.com/openai/codex/issues/28298)) keep surfacing across platforms.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-08-28

## 1. Today's Highlights

The plugins dashboard reached general availability in v1.0.81 (via `/plugin`, `/mcp`, `/skills`), alongside MCP 2026-07-28 spec support shipped across CLI, SDK, IDE, and in-memory clients. However, the release cycle is showing stability strain: a cluster of enterprise auth regressions on GHEC data-residency tenants and multiple TUI/runtime failure modes (runaway FileWatch loops, frozen UI during parallel subagents) dominated community attention today. No PRs were updated in the last 24h, suggesting a lull in merged activity despite heavy issue triage traffic.

## 2. Releases

- **v1.0.82-0** — prerelease; "Fixes and changes" (no detailed changelog).
- **v1.0.81** (2026-08-27):
  - Plugins dashboard now available to everyone — run `/plugin`, `/mcp`, or `/skills`. Opt out with `PLUGINS_DASHBOARD=false` (also disables the `copilot plugins` command).
  - MCP 2026-07-28 spec support shipped to CLI, SDK, IDE, and in-memory clients.
  - Hooks can now receive the current OpenTelemetry context.

## 3. Hot Issues

1. **[#4480 — Atlassian MCP OAuth fails with "Incompatible authorization server (RFC 8414 §3.3)" (CLOSED)](https://github.com/github/copilot-cli/issues/4480)** — Highest-engagement issue this cycle (7 comments, 👍6). A regression from 1.0.71 broke remote MCP OAuth issuer validation against Atlassian; now closed, likely fixed by the MCP 2026-07-28 spec support in v1.0.81.

2. **[#4612 — Runaway FileWatch host-event loop freezes TUI, grows debug log to 13 GB (OPEN)](https://github.com/github/copilot-cli/issues/4612)** — Severe: long-running/resumed sessions enter a tight "No connection accepted a host event" loop, freezing the terminal and ballooning logs to 13 GB. Critical stability report.

3. **[#4535 — `store_memory` fails in v1.0.81 prereleases: "Instance id is required" (OPEN)](https://github.com/github/copilot-cli/issues/4535)** — Memory tooling completely broken in prereleases due to missing instance ID in the native memory writer. 7 comments and active debugging.

4. **[#4527 — `copilot -p` 401 on GHEC data residency since 1.0.81-1 (OPEN)](https://github.com/github/copilot-cli/issues/4527)** — Prompt-mode model-catalog fetch hits `api.githubcopilot.com` instead of the tenant endpoint. Interactive mode works; only `-p` breaks. 👍4 — part of today's enterprise auth regression cluster (see also #4650, #4654).

5. **[#4533 — TUI stops consuming events when a turn spawns parallel subagents (OPEN)](https://github.com/github/copilot-cli/issues/4533)** — Input and scroll go dead while the Rust runtime keeps processing; results only recoverable after minutes. Points to an event-loop backpressure bug in the UI layer.

6. **[#4647 — v1.0.81 broke compatibility with chroma-mcp (OPEN)](https://github.com/github/copilot-cli/issues/4647)** — Fresh 1.0.80→1.0.81 regression affecting stdio MCP server configs; follows the general pattern of MCP transport changes disrupting third-party servers.

7. **[#4602 — `store_memory` fails and MCP servers are stripped: `managedSettings` fails closed on `serverFetchFailed` flap (OPEN)](https://github.com/github/copilot-cli/issues/4602)** — Well-argued issue linking multiple open reports to a single root cause: managed-settings fetch flaps cause fail-closed behavior killing memory and MCP entirely.

8. **[#4639 — Event-storage exhaustion retry storm drives session into GC/compaction loop and Node OOM (OPEN)](https://github.com/github/copilot-cli/issues/4639)** — Exporter retries 500-event flushes against exhausted storage, triggering memory pressure and thousands of bridge acknowledgments. Needs backoff/circuit-breaker logic.

9. **[#4486 — Edit permission request "times out" (OPEN)](https://github.com/github/copilot-cli/issues/4486)** — Permission prompts now expire if not answered immediately, breaking overnight and multi-session workflows. Authored by dscho (Git maintainer) — notable signal.

10. **[#4649 — Tool search reports enabled on Grok but defers nothing; Gemini never enables it (OPEN)](https://github.com/github/copilot-cli/issues/4649)** — Follow-up to closed #4588. The token-reduction fix landed only for GPT (43.1k → 21.0k tokens); Grok silently no-ops and Gemini never activates. Important for cost/latency parity across model families.

## 4. Key PR Progress

No pull requests were updated in the last 24 hours. Notable merged work reflected in the latest release:

1. **Plugins dashboard GA** — `/plugin`, `/mcp`, `/skills` surfaces shipped to all users in v1.0.81, with an `PLUGINS_DASHBOARD=false` opt-out.
2. **MCP 2026-07-28 spec support** — shipped uniformly across CLI, SDK, IDE, and in-memory clients.
3. **Hooks receive OpenTelemetry context** — hooks now get the current OTel trace context, enabling correlated observability in hook scripts.

## 5. Hot Discussions

No discussion data was provided for this period.

## 6. Feature Request Trends

- **Session ergonomics**: `--name` should create-or-resume in one flag ([#4642](https://github.com/github/copilot-cli/issues/4642)); `session.resume` should honor a passed `model` parameter ([#4645](https://github.com/github/copilot-cli/issues/4645)).
- **Auditability & records**: verifiable, persistent records of rubber-duck/agent reviews including model provenance ([#4621](https://github.com/github/copilot-cli/issues/4621)).
- **Configuration tooling**: an official JSON Schema for `settings.json` to enable editor validation ([#4641](https://github.com/github/copilot-cli/issues/4641), 👍2).
- **Cost/token efficiency**: extend tool-search deferral to Grok and Gemini, not just GPT ([#4649](https://github.com/github/copilot-cli/issues/4649)).
- **Model/compaction transparency**: accurate context-window reporting (#4638), meaningful compaction checkpoints (#4643).
- **BYOK polish**: `/model` command missing in BYOK mode (#4651) suggests growing demand for custom-provider support.

## 7. Developer Pain Points

- **Enterprise/GHEC auth fragility**: A cluster of regressions (#4527, #4650, #4654) where prompt mode (`-p`) and `--agent` flows hit non-enterprise endpoints and 401. Enterprise users are currently blocked from non-interactive automation — the highest-impact pain this cycle.
- **Prerelease-channel instability**: TUI freeze during parallel subagents (#4533), runaway FileWatch loops with 13 GB logs (#4612), event-storage retry storms causing OOM (#4639). Long-running and resumed sessions are disproportionately affected.
- **MCP ecosystem breakage across upgrades**: OAuth regressions (#4480), chroma-mcp breakage in 1.0.81 (#4647), and fail-closed managed settings stripping all MCP servers (#4602). Users report each minor release can silently break server configurations.
- **Memory/context subsystem bugs**: `store_memory` failing on instance ID (#4535) and premature compaction at ~20% context with no checkpoint recorded (#4643) undermine trust in long-session workflows.
- **Fail-silent behavior**: `session.resume` dropping the model parameter without error (#4645), silent marketplace registration bail (#4556), and skipped hooks for steering messages (#4640) — a recurring theme of actions taken without feedback.
- **Windows/localization gaps**: AltGr key input swallowed (#4653), sandbox unsupported warnings on Windows 25H2 (#4652), continuing Windows platform friction.

*Digest generated 2026-08-28. Sources: github.com/github/copilot-cli (issues #4480–#4654, releases v1.0.81/v1.0.82-0).*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-08-28

## 1. Today's Highlights

Two rapid-fire releases shipped in the last 24 hours, with **v1.18.24** bringing Azure CLI / Microsoft Entra ID sign-in (no more API-key-only Azure) and a fix for corrupted Bedrock replay state. On the V2 front, `optamus-ai` landed a series of session-stability PRs, while a burst of same-day bug reports around the `muse-spark-1.2-contributor` model and billing usage display suggests the "Go" subscription stack is under strain.

## 2. Releases

- **[v1.18.24](https://github.com/anomalyco/opencode/releases/tag/v1.18.24)**
  - Bedrock reasoning responses no longer cache into unreplayable empty messages.
  - Azure providers can authenticate via Microsoft Entra ID through the Azure CLI; V1 now reads supported V2 config fields for forward compatibility.
- **[v1.18.25](https://github.com/anomalyco/opencode/releases/tag/v1.18.25)**
  - Fixed Azure authentication so Azure CLI sign-in works without requiring Bun.

## 3. Hot Issues

1. **[#32149 — Opencode stops processing requests without response](https://github.com/anomalyco/opencode/issues/32149)** (OPEN, 20 comments, 👍9). The highest-engagement open bug: prompts enter "thinking" but never complete. Long-lived, high-impact reliability issue still active two months on.
2. **[#6536 — Mobile app feature request](https://github.com/anomalyco/opencode/issues/6536)** (CLOSED, 16 comments, 👍50). The most-upvoted item today; users strongly want native mobile access beyond the mobile browser.
3. **[#14970 — SQLite corruption ("database disk image is malformed") on NFS](https://github.com/anomalyco/opencode/issues/14970)** (OPEN, 12 comments, 👍23). Concurrent sessions corrupt the shared `opencode.db` on NFS-mounted home dirs — serious for enterprise/remote dev setups.
4. **[#31377 — Auto-discover skills from nested subdirectories](https://github.com/anomalyco/opencode/issues/31377)** (OPEN, 7 comments). Skills discovery currently only walks upward; monorepo users want downward traversal.
5. **[#14524 — Display model cost in the model picker](https://github.com/anomalyco/opencode/issues/14524)** (OPEN, 7 comments, 👍11). Cost transparency at model selection — high demand, cheap win for the TUI.
6. **[#36761 — Expose valid subagent IDs to the model](https://github.com/anomalyco/opencode/issues/36761)** (OPEN, 5 comments). V2 `subagent` tool hides configured agent IDs, so models guess and delegation fails — a core V2 usability gap.
7. **[#42923 — Subagent stuck in infinite thinking loop (drains credits)](https://github.com/anomalyco/opencode/issues/42923)** (OPEN, 3 comments). `mimo-v2.5` subagents loop forever and burn credits with no timeout — cost + reliability risk.
8. **[#45858 — Usage percentage display errors on Go plan billing page](https://github.com/anomalyco/opencode/issues/45858)** (OPEN, 4 comments). Percentages don't match usage ÷ quota; paired with [#45897](https://github.com/anomalyco/opencode/issues/45897) accusing misleading "$30/week" marketing vs $7.50 actual, billing trust is a hot topic.
9. **[#45829 — V1 migration fails every startup with SQLite syntax error](https://github.com/anomalyco/opencode/issues/45829)** (OPEN, 2 comments). The V1→V2 migration never completes on `opencode2`, leaving legacy data unmigrated — V2 migration path needs attention.
10. **[#41354 — Search across message history](https://github.com/anomalyco/opencode/issues/41354)** (OPEN, 4 comments). With hundreds of sessions, users have no way to find past decisions/instructions — a growing need as usage matures.

## 4. Key PR Progress

1. **[#45931 — Preserve CRLF endings when splicing patch hunks](https://github.com/anomalyco/opencode/pull/45931)** — fixes [#45926](https://github.com/anomalyco/opencode/issues/45926): `apply_patch` was turning CRLF files into mixed line endings via LF-only matching. Fast same-day turnaround.
2. **[#45942 — Bound shell output to 50 KiB preview for LLM](https://github.com/anomalyco/opencode/pull/45942)** — fixes sessions stranded by shell output bypassing the tool-output limit.
3. **[#45951 — Preserve Anthropic thinking for errored same-model replay](https://github.com/anomalyco/opencode/pull/45951)** — fixes replay failures where thinking metadata was lost, producing invalid requests.
4. **[#45955 — Serialize V2 prompt settlement around event publication](https://github.com/anomalyco/opencode/pull/45955)** — fixes a V2 concurrency race in `Form`/`PermissionV2`/`QuestionV2`.
5. **[#45959 — Surface pre-runner failures as durable Step.Failed](https://github.com/anomalyco/opencode/pull/45959)** — V2 errors like `ModelUnavailableError` are now surfaced instead of silently logged.
6. **[#40010 — Recover stalled model streams](https://github.com/anomalyco/opencode/pull/40010)** — addresses endpoints that return headers but never stream a body, ending the "waits forever" hang.
7. **[#45949 — Serialize and atomically write auth.json](https://github.com/anomalyco/opencode/pull/45949)** — flock-guarded reads plus atomic tmp-rename writes to prevent auth-file corruption under concurrency.
8. **[#45952 — Share model visibility between TUI and web UI](https://github.com/anomalyco/opencode/pull/45952)** — community fix (issue author themselves) removing a 6-month recency filter that hid older models in the web UI.
9. **[#45818 — Refactor(core): separate config file editing](https://github.com/anomalyco/opencode/pull/45818)** — enables deliberate editing of project/custom config files instead of the first file-backed document.
10. **[#45828 — Add first-class TestLLM controls](https://github.com/anomalyco/opencode/pull/45828)** (CLOSED/merged) — fixes test-LLM streams consuming scripted responses on construction, improving V2 test determinism.

## 5. Hot Discussions

*(No separate Discussions data was provided; notable conversational threads from Issues this cycle:)*

- **Ideas:** [Mobile app demand](https://github.com/anomalyco/opencode/issues/6536) remains the loudest product direction despite closure. Termux support ([#45870](https://github.com/anomalyco/opencode/issues/45870)) echoes the same "use OpenCode anywhere" theme, with pushback on bot-closed issues.
- **Q&A:** [#17703](https://github.com/anomalyco/opencode/issues/17703) (agent interrupting mid-tool-call, needing "continue") and [#45053](https://github.com/anomalyco/opencode/issues/45053) (muse-spark model hanging) drew community troubleshooting on expected vs. actual agent behavior.

## 6. Feature Request Trends

- **Mobile & remote access**: mobile app ([#6536](https://github.com/anomalyco/opencode/issues/6536)), Termux ([#45870](https://github.com/anomalyco/opencode/issues/45870)) — by far the most-upvoted theme.
- **Cost transparency**: model costs in the picker ([#14524](https://github.com/anomalyco/opencode/issues/14524)), correct usage reporting ([#45858](https://github.com/anomalyco/opencode/issues/45858)).
- **History & knowledge retrieval**: cross-session message search ([#41354](https://github.com/anomalyco/opencode/issues/41354)).
- **Provider/auth flexibility**: native Kimi/Moonshot auth ([#12156](https://github.com/anomalyco/opencode/issues/12156), now closed), Azure CLI/Entra ID (shipped in v1.18.24).
- **Skills & agent ergonomics**: downward skill discovery ([#31377](https://github.com/anomalyco/opencode/issues/31377)), subagent ID exposure ([#36761](https://github.com/anomalyco/opencode/issues/36761)).
- **Filesystem/config flexibility**: configurable root-file directory ([#43700](https://github.com/anomalyco/opencode/issues/43700), closed), Dev Drive path handling ([#44929](https://github.com/anomalyco/opencode/issues/44929)).

## 7. Developer Pain Points

- **Silent hangs and stalls** dominate: prompts that never respond ([#32149](https://github.com/anomalyco/opencode/issues/32149), [#27755](https://github.com/anomalyco/opencode/issues/27755)), stalled model streams ([#40010](https://github.com/anomalyco/opencode/pull/40010)), infinite subagent thinking loops draining credits ([#42923](https://github.com/anomalyco/opencode/issues/42923)).
- **Agent interruptions**: tasks halting mid-run and requiring manual "continue" recur across multiple issues.
- **Concurrency & storage fragility**: SQLite corruption on NFS ([#14970](https://github.com/anomalyco/opencode/issues/14970)), V1 migration failing every startup ([#45829](https://github.com/anomalyco/opencode/issues/45829)), racy in-place updater causing ENOEXEC ([#41495](https://github.com/anomalyco/opencode/issues/41495)).
- **Billing/subscription trust**: usage percentage errors and complaints that actual limits fall short of advertised ([#45858](https://github.com/anomalyco/opencode/issues/45858), [#45897](https://github.com/anomalyco/opencode/issues/45897)), plus rate-limit errors immediately after subscribing ([#45893](https://github.com/anomalyco/opencode/issues/45893)).
- **Cross-platform friction**: Windows Dev Drive path mismatch ([#44929](https://github.com/anomalyco/opencode/issues/44929)), CRLF handling in patches ([#45926](https://github.com/anomalyco/opencode/issues/45926), fix in flight), Desktop renderer freezes ([#43355](https://github.com/anomalyco/opencode/issues/43355)).
- **V2 beta instability**: subagent discoverability, permission overrides not working ([#43669](https://github.com/anomalyco/opencode/issues/43669)), and the recurring migration failures indicate V2 needs hardening before general availability.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/lijiaming325-arch/agents-radar).*