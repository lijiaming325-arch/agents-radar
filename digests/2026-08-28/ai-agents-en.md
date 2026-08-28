# OpenClaw Ecosystem Digest 2026-08-28

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-08-28 15:10 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

⚠️ Summary generation failed.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Ecosystem
**Date:** 2026-08-28 · **Scope:** OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

> ⚠️ **Data availability note:** Daily digest generation failed for OpenClaw, IronClaw, QwenPaw, and ZeroClaw. Only **Hermes Agent** has a usable summary today. Sections 2–3 below therefore combine the single verified dataset with explicit gaps. Cross-project claims are limited to avoid unfounded inference.

---

## 1. Ecosystem Overview
The open-source personal AI assistant space in late August 2026 is defined by a shift from "chatbot wrappers" toward **persistent personal infrastructure**: gateways (Telegram/Slack), multi-profile isolation, local model runtimes, and scheduled delegation are now table stakes. Hermes Agent's digest reflects a project scaling through rapid-issue-intake (50 issues + 50 PRs/24h) with disciplined campaign-style maintenance. The dominant engineering battlegrounds are **Windows platform parity**, **session-state/prefix-cache correctness** (direct cost impact), and **delegation durability** — themes likely echoed across peer projects given shared architectural patterns in this ecosystem. The space's maturation is visible in user expectations: reliability of updates, privacy isolation, and API-cost transparency now outweigh raw feature velocity.

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | PR Throughput | Releases (24h) | Health | Data Status |
|---|---|---|---|---|---|---|
| **Hermes Agent** | 50 | 50 | 28% (14/50 closed) | None | Active / responsive; hotspots: Windows, session-state | ✅ Verified |
| OpenClaw | — | — | — | — | — | ❌ Digest failed |
| IronClaw | — | — | — | — | — | ❌ Digest failed |
| QwenPaw | — | — | — | — | — | ❌ Digest failed |
| ZeroClaw | — | — | — | — | — | ❌ Digest failed |

**Recommendation:** Re-run digest generation for the four failed projects before drawing rankings; today's report should not be used for comparative benchmarking.

## 3. OpenClaw's Position
No summary data available for 2026-08-28; OpenClaw's relative advantages, technical approach, and community size cannot be assessed from today's digest. As the designated "core reference" project of this ecosystem, it merits priority re-evaluation once data is restored.

## 4. Shared Technical Focus Areas
Cross-project confirmation is impossible today, but Hermes's data reveals ecosystem-level requirements worth monitoring in peer projects:

- **Update/install reliability** (Hermes) — stale-code skew post-update (systemd dashboards 500s, SSH backends stale) and Windows SCM-service aborts; any agent with self-update mechanics faces this class of failure.
- **Session-state & cache correctness** (Hermes) — `null` system prompts defeating prefix caching (P0 #96570) shows state management directly affects user API spend; cross-profile leakage (#66887) is privacy-adjacent.
- **Provider expansion & local runtimes** (Hermes) — Mistral provider demand (👍27) and a managed llama.cpp runtime signal the "any model, local-first" expectation.
- **Cross-surface consistency** (Hermes) — unified slash-command registry across CLI/TUI/gateway/desktop.

## 5. Differentiation Analysis
With only one dataset, differentiation cannot be empirically stated. Hermes Agent's observable profile: **gateway-centric personal-assistant architecture** (multiplexed gateways, profiles, Telegram/Slack/cron/SSH), aggressive feature velocity balanced by campaign-driven stabilization. Peer differentiation TBD.

## 6. Community Momentum & Maturity
- **Hermes Agent — "rapid iteration + active stabilization."** Very high intake (50/50) with 28% throughput, no releases (all work on main), completed 29-PR Desktop multi-gateway campaign, same-day fixes for same-day reports. Maturity signal: disciplined campaign maintenance, but a Windows/install bug backlog indicates the platform-hardening phase is unfinished.
- **OpenClaw, IronClaw, QwenPaw, ZeroClaw — unclassified** pending data recovery.

## 7. Trend Signals
Extractable trends relevant to agent developers (Hermes-verified):

1. **Cost transparency is a product feature.** A single cache-affinity bug (#96570) silently inflated user API bills to P0 severity — prefix-cache correctness is now an SLA concern, not an optimization.
2. **Windows is no longer optional.** PATH, SCM services, Electron launch, symlinks — Windows parity bugs dominate the backlog; "macOS/Linux-first" agents are losing trust with a large user segment.
3. **Async delegation needs durability semantics.** Orphaned in-flight tasks with no retry/surfacing "feel like silent data loss" — agents require job-lifecycle management akin to workflow engines.
4. **Multi-profile isolation = privacy requirement.** State leakage across profiles (#66887) is the personal-assistant analog of multi-tenancy isolation; expect it as a baseline expectation.
5. **Local + heterogeneous model support drives engagement.** Demand for Mistral, relaxed context minimums for low-RAM Ollama, and managed llama.cpp confirm local-first flexibility as a primary adoption driver.
6. **Users deploy agents as infrastructure, not toys.** SSH-remote backends, cron reports, multiplexed messaging — reliability engineering (watchdogs, update verification) is becoming the differentiator over raw capability.

---

**Action items for the analyst pipeline:** (1) investigate digest-generation failures for the four other projects; (2) re-issue this comparison once data is available; (3) monitor Hermes P0 #96570 fix (PR #97158) as a leading indicator of session-state engineering maturity across the ecosystem.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-08-28

## 1. Today's Overview
Hermes Agent shows **very high activity** with 50 issues and 50 PRs updated in the last 24 hours, though only 14 of 50 PRs reached merged/closed state (28% throughput). No new releases shipped today, so all work landed on the main development line. The project is in an active stabilization phase: a large wave of issues created on 2026-08-28 itself (PRs/issues numbered 96,xxx–97,xxx) indicates rapid issue intake, with strong maintainer-driven campaigns (e.g., the 29-PR Desktop multi-gateway campaign closing out). Dominant themes today are **Windows platform fragility**, **session-state/prefix-cache correctness**, and **delegation durability**. Overall health is good but the bug backlog in Windows/install-update paths is clearly a hotspot.

## 2. Releases
No new releases in the last 24 hours. *(Omitted per policy.)*

## 3. Project Progress
- **14 of 50 PRs merged/closed today.** Notable completions:
  - [#96862](https://github.com/NousResearch/hermes-agent/pull/96862) (CLOSED) — **fix(gateway): skip paused/non-running SCM services instead of aborting update** — directly addresses the Windows update blocker [#96360](https://github.com/NousResearch/hermes-agent/issues/96360)/[#96860](https://github.com/NousResearch/hermes-agent/issues/96860) (a follow-up duplicate PR [#97238](https://github.com/NousResearch/hermes-agent/pull/97238) also appeared).
  - **Issue #94724** (CLOSED) — Desktop persistent multi-gateway connections campaign declared complete: **29 PRs merged**, 2 same-day regressions fixed, all salvage clusters shipped.
  - **#24328** (CLOSED) — Tool-message orphaning after message drops causing Moonshot/Kimi 400 errors.
  - **#94704** (CLOSED, duplicate) — Pre-call sanitizer accepting historical tool results for DeepSeek replay; fix in flight via [PR #97241](https://github.com/NousResearch/hermes-agent/pull/97241).
  - **#93718** (CLOSED) — Local profile not remembered when switching back from a remote Desktop connection.
  - **#58357** (CLOSED) — Consolidation of `_sanitize_tool_pairs` into canonical agent runtime sanitizers.
- Active feature engineering: managed llama.cpp local runtime ([PR #85852](https://github.com/NousResearch/hermes-agent/pull/85852)), task-scoped async delegation closeout ([PR #97039](https://github.com/NousResearch/hermes-agent/pull/97039)), and cross-profile global memory policy ([PR #97231](https://github.com/NousResearch/hermes-agent/pull/97231)).

## 4. Community Hot Topics
- **[#20859](https://github.com/NousResearch/hermes-agent/issues/20859) — Mistral as LLM provider** (13 comments, 👍27, open since May). The highest-engagement item; users want native Mistral LLM support since voice models are already integrated. Signals broad provider-expansion demand.
- **[#94724](https://github.com/NousResearch/hermes-agent/issues/94724) — Desktop multi-gateway campaign tracker** (12 comments) — now closed as complete; showcases an unusually disciplined, campaign-style maintenance workflow.
- **[#66887](https://github.com/NousResearch/hermes-agent/issues/66887) — Multiplexed gateway: secondary-profile Telegram sessions persist in default profile's state.db** (12 comments, P1). Users running multi-profile gateways need strict config/memory/storage isolation — a correctness/scope-leak issue central to the "personal assistant" use case.
- **[#60323](https://github.com/NousResearch/hermes-agent/issues/60323) — macOS backend misses `HERMES_BACKEND_READY` and times out** (12 comments, P1). Desktop boot reliability on macOS.
- **[#96692](https://github.com/NousResearch/hermes-agent/issues/96692) — Unified slash-command registry** (7 comments, filed 8/27). Architectural proposal for one versioned command catalog across CLI/TUI/gateway/desktop — signals the community wants cross-surface consistency.

## 5. Bugs & Stability (ranked by severity)
1. **P0 — [#96570](https://github.com/NousResearch/hermes-agent/issues/96570)**: Group-chat sessions store `null` system prompt every turn → prefix cache always misses (cost impact). Fix path exists: [PR #97158](https://github.com/NousResearch/hermes-agent/pull/97158) (P0 cache affinity-key fix). **Highest priority.**
2. **P1 — [#66887](https://github.com/NousResearch/hermes-agent/issues/66887)**: Cross-profile session-state leakage in multiplexed gateways (privacy/isolation). No fix PR visible.
3. **P1 — [#60323](https://github.com/NousResearch/hermes-agent/issues/60323)**: macOS backend-ready race causing desktop boot timeout. No fix PR visible.
4. **P1 — [#48820](https://github.com/NousResearch/hermes-agent/issues/48820)**: Windows gateway 3-fragility cluster (no watchdog, env override, aiohttp trust_env). Partially addressed by [PR #97237](https://github.com/NousResearch/hermes-agent/pull/97237) (relaunch verification) and closed PR #96862.
5. **P1 — [#96360](https://github.com/NousResearch/hermes-agent/issues/96360)** / dup [#96860](https://github.com/NousResearch/hermes-agent/issues/96860): Windows update aborts on any non-running SCM service — fix merged today (#96862).
6. **P2 — [#92244](https://github.com/NousResearch/hermes-agent/issues/92244)**: `/model` picker blocks 25–50s due to serial pricing fetches (perf).
7. **P2 — [#86207](https://github.com/NousResearch/hermes-agent/issues/86207)** / [#97046](https://github.com/NousResearch/hermes-agent/issues/97046): post-update stale code-skew (systemd dashboard 500s; SSH backends stale). Fix in [PR #97062](https://github.com/NousResearch/hermes-agent/pull/97062).
8. **P2 — [#94921](https://github.com/NousResearch/hermes-agent/issues/94921)**: Ghostty terminal Shift+letter key regression leaking raw escape sequences.
9. **P2 — [#97202](https://github.com/NousResearch/hermes-agent/issues/97202)**: Renderer reload orphans in-flight async delegations; no retry/surfacing. Related work: [PR #97234](https://github.com/NousResearch/hermes-agent/pull/97234), [PR #68499](https://github.com/NousResearch/hermes-agent/pull/68499).
10. **P2 — [#97230](https://github.com/NousResearch/hermes-agent/issues/97230)**: cron duplicates messages after ambiguous adapter writes.
11. Notable new Windows fixes opened today: [PR #97186](https://github.com/NousResearch/hermes-agent/pull/97186) (browser PATH), [PR #97235](https://github.com/NousResearch/hermes-agent/pull/97235) (Win10 Electron launch).

## 6. Feature Requests & Roadmap Signals
- **Mistral provider** ([#20859](https://github.com/NousResearch/hermes-agent/issues/20859), 👍27) — most likely next provider addition given existing voice integration.
- **Lower minimum context_length** ([#53347](https://github.com/NousResearch/hermes-agent/issues/53347)) — warn instead of hard 64K failure; enables low-RAM local Ollama setups.
- **Unified slash-command registry** ([#96692](https://github.com/NousResearch/hermes-agent/issues/96692)) — architectural consolidation candidate for an upcoming minor release.
- **In-flight features likely landing soon**: one-click managed llama.cpp local runtime ([PR #85852](https://github.com/NousResearch/hermes-agent/pull/85852)), task-scoped async delegation closeout ([PR #97039](https://github.com/NousResearch/hermes-agent/pull/97039)), global cross-profile memory policy ([PR #97231](https://github.com/NousResearch/hermes-agent/pull/97231)), read_file schema-diet/token optimization ([PR #97195](https://github.com/NousResearch/hermes-agent/pull/97195)).

## 7. User Feedback Summary
- **Use case diversity is growing**: Telegram gateway multiplexing with profiles, SSH-remote backends from macOS to Windows, bot-mode shared rooms, cron-driven Slack reports — Hermes is being used as serious personal infrastructure, not a toy.
- **Top pain points**: (1) **update/install reliability** — repeated stale-code, launcher, and Windows SCM failures erode trust in `hermes update`; (2) **Windows as first-class platform** still lags (PATH, services, desktop entry symlinks); (3) **cost/transparency** — prefix-cache misses (#96570) directly hit users' API bills; (4) **durability** — orphaned async delegations with no retry feel like silent data loss.
- **Positives**: the completed 29-PR desktop campaign and same-day fixes for freshly reported bugs (multiple issues filed and PRs opened on 8/28) reflect strong maintainer responsiveness.

## 8. Backlog Watch
- **[#20859](https://github.com/NousResearch/hermes-agent/issues/20859)** — Mistral provider: 3.5+ months old, highest 👍 count (27), `needs-decision` label; overdue for a maintainer ruling.
- **[#48820](https://github.com/NousResearch/hermes-agent/issues/48820)** — Windows gateway fragility trio: open since June, still P1; fixes partially landed but issue remains open.
- **[#66887](https://github.com/NousResearch/hermes-agent/issues/66887)** — Profile state isolation: open since July, P1 with 12 comments, no fix PR — a privacy-adjacent issue that shouldn't linger.
- **[#60323](https://github.com/NousResearch/hermes-agent/issues/60323)** — macOS boot timeout: open since early July, blocks desktop adoption on macOS.
- **[#68499](https://github.com/NousResearch/hermes-agent/pull/68499)** — Delegation lifecycle/outcome separation: open since July 21, P2, tagged blast-broad — needs review priority given delegation bugs keep recurring (#97202, #97234).
- **[#68033](https://github.com/NousResearch/hermes-agent/issues/68033)** — Built-in file tools timing out at 420s vs. instant shell `rg`: regression dating to a July update, still `needs-repro` — deserves dedicated triage.

**Health verdict:** Active and responsive, but Windows platform hardening and session-state/cache correctness should be the next consolidated campaign targets.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/lijiaming325-arch/agents-radar).*