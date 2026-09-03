# OpenClaw Ecosystem Digest 2026-09-03

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-03 00:32 UTC

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

# Cross-Project Comparison Report — AI Agent / Personal Assistant Open-Source Ecosystem
**Date:** 2026-09-03 | **Coverage note:** Summary generation failed for OpenClaw, Hermes Agent, IronClaw, and ZeroClaw. Quantitative comparison is only possible for QwenPaw; cross-project sections are framed as directional/qualitative and flagged where data is unavailable.

---

## 1. Ecosystem Overview
The open-source personal AI assistant landscape in late 2026 is dominated by intense, fast-cadence beta stabilization cycles as projects race from "chat demo" maturity toward production-grade agent platforms. The dominant engineering themes visible today are **security hardening** (sandbox escapes, prompt-injection defense, tool whitelisting), **multi-agent orchestration**, and **memory/context durability** — all signs that these systems are being pushed into real, long-running workloads rather than toy usage. Local/self-hosted LLM support (LM Studio, custom providers, LAN gateways) is a first-class requirement for a vocal user cohort. Protocol interoperability (MCP as baseline, A2A/ACP as next frontier) is emerging as a strategic battleground. A credible cross-project ranking cannot be produced today due to data gaps on four of five projects.

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Release | Health Score* | Data Confidence |
|---|---|---|---|---|---|
| **QwenPaw** | 27 updated (18 open) | 40 updated (13 merged/closed) | v2.2.0-beta.7 published | **B+** — high velocity; security triage, cron correctness, context-loss risks pre-stable | High (full digest) |
| OpenClaw | ⚠️ n/a | ⚠️ n/a | ⚠️ n/a | Unknown | None — generation failed |
| Hermes Agent | ⚠️ n/a | ⚠️ n/a | ⚠️ n/a | Unknown | None |
| IronClaw | ⚠️ n/a | ⚠️ n/a | ⚠️ n/a | Unknown | None |
| ZeroClaw | ⚠️ n/a | ⚠️ n/a | ⚠️ n/a | Unknown | None |

\*Health scores require ≥2 projects with data for meaningful calibration; QwenPaw's is provisional.

**Recommendation:** Re-run the digest pipeline for the four failed projects before drawing competitive conclusions.

## 3. OpenClaw's Position
**No data available today.** As the designated core reference project, OpenClaw's failed summary is itself a signal worth investigating — if the digest pipeline failure reflects sparse upstream activity or API issues, that would be a meaningful negative indicator against QwenPaw's 40-PR/day velocity. Conclusions about OpenClaw's advantages, technical differentiation, or community size should be deferred until a valid summary is obtained.

## 4. Shared Technical Focus Areas
Based on available data (QwenPaw), plus themes likely to generalize across the ecosystem:

- **Security governance** *(QwenPaw confirmed; near-certain ecosystem-wide)*: sandbox escape claims (#7511), prompt-evasion (#7443), runtime tool whitelisting (PR #7504), governance-mode path denial (PR #7497). Any agent with write/execute capability faces this.
- **Memory & embedding infrastructure**: dimension normalization across embedding backends, index rebuilds, reranker configuration, silent job failures — the memory subsystem is now a stability-critical component, not an add-on.
- **Streaming reliability across channels**: SSE duplication, non-streaming gateway edge cases, WeCom latency — channel robustness is a universal quality bar.
- **Local/self-hosted LLM compatibility**: connection retry loops, provider config migrations — significant cohort in open-source ecosystems.
- **Multi-agent orchestration**: autonomous sub-agent monitoring and reporting (QwenPaw #7450); expected to appear across peer projects as delegation becomes standard.

## 5. Differentiation Analysis
Differentiation cannot be reliably assessed today. From QwenPaw's digest alone, its positioning is:
- **Feature breadth**: desktop app + WebUI + multi-channel + cron scheduling + memory + plugin ecosystem (creator plugins, Make-Skill) — a full-platform play.
- **Architecture**: Driver-based 2.x architecture with MCP done and A2A/ACP on the roadmap (#7484) — protocol-forward.
- **Interoperability strategy**: inbound migration tooling (PawPort from Codex/Qoder) — aggressive user acquisition from competing ecosystems.
- **Target users**: spans consumer desktop users (dark-mode fixes, theming requests) and production workloads (multi-agent orchestration, long-session durability) — this dual audience is straining its stability (context-loss and security bugs surfacing from the latter cohort).

## 6. Community Momentum & Maturity
- **QwenPaw — Rapid iteration tier (B+ health):** 27 issues / 40 PRs in 24h, three beta releases in three days, same-day community-authored UI fixes. Risk profile: shipping fast, triaging slow on critical items (#7511 sandbox claim has 1 comment; #7447 data-loss bug under-prioritized).
- **OpenClaw, Hermes Agent, IronClaw, ZeroClaw — Unknown:** digest generation failures prevent tier assignment. Recommend re-ingestion before portfolio or adoption decisions.

## 7. Trend Signals
1. **Security is the new release blocker.** Public sandbox-breach write-ups and prompt-evasion reports arriving during beta cycles mean security triage SLAs and coordinated disclosure processes are now table stakes for agent maintainers.
2. **Agents are entering production before memory durability is solved.** Long-session context loss and silent embedding failures indicate the memory layer needs transactional guarantees (persistent queues, verification), analogous to what databases went through.
3. **MCP is baseline; A2A is the next protocol war.** QwenPaw's explicit MCP-done/A2A-next roadmap suggests inter-agent protocols will define the 2.3-era competitive landscape.
4. **Self-hosted LLM users are a first-class segment.** Recurring provider-config migration breakage and LAN-gateway issues argue for backward-compatible config schemas and contract-tested provider adapters.
5. **Scheduler correctness matters in agentic products.** Duplicate/catch-up cron firing (#7476, #7480) shows that "agent as autonomous actor" raises ordinary infrastructure bugs to data-integrity severity — actions fired twice have real-world consequences.
6. **Actionable for agent developers:** design for security advisories from day one, treat memory jobs as reliable pipelines, validate slash-command surfaces at the channel boundary, and build import tooling — migration flows (QwenPaw PawPort) are becoming a user-acquisition weapon.

---
**Bottom line:** QwenPaw is the highest-velocity project observable today, with strong momentum but three pre-stable risks (security triage, cron correctness, context durability). No comparative conclusions about OpenClaw, Hermes Agent, IronClaw, or ZeroClaw are supportable from this run — regenerate those digests before further analysis.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-03

## 1. Today's Overview
QwenPaw shows **high and sustained activity**: 27 issues updated (18 open) and 40 PRs updated (27 open, 13 merged/closed) in the last 24 hours, alongside a new release. The project is in an intense **v2.2.0-beta stabilization cycle** — beta.5, beta.6, and beta.7 verification issues all closed in the past three days. Development is spread across memory (ReMe), governance/security, cron scheduling, console UI, and channel/streaming reliability. The most notable signal today is a **reported security sandbox breach (#7511)** and continued prompt-evasion concerns (#7443), which warrant immediate maintainer priority.

## 2. Releases
**v2.2.0-beta.7** was published.
- **fix(memory):** normalize backend-specific embedding dimensions ([PR #7465](https://github.com/agentscope-ai/QwenPaw/pull/7465)) — users on embedding backends with non-default dimensions should rebuild indexes after upgrading.
- **chore:** version bump to v2.2.0b7 ([PR #7485](https://github.com/agentscope-ai/QwenPaw/pull/7485))
- **fix(webui):** dark-mode overrides (completing [#7473](https://github.com/agentscope-ai/QwenPaw/pull/7473))
- ⚠️ Note: a regression on this very release is already reported — `/memory/status` returns 500 on the Windows Desktop installer ([#7510](https://github.com/agentscope-ai/QwenPaw/issues/7510)).
- Release duty verification is tracked in [Issue #7503](https://github.com/agentscope-ai/QwenPaw/issues/7503).

## 3. Project Progress
13 PRs merged/closed in 24h. Highlights:
- **fix(desktop)**: PyInstaller multiprocessing runtime hook preserved; fixes macOS backend restarts when StdIO MCP spawns helpers ([#7489](https://github.com/agentscope-ai/QwenPaw/pull/7489), closes [#7481](https://github.com/agentscope-ai/QwenPaw/issues/7481))
- **fix(webui)**: dark-mode overrides for MCP section containers ([#7473](https://github.com/agentscope-ai/QwenPaw/pull/7473), closes [#7471](https://github.com/agentscope-ai/QwenPaw/issues/7471))
- **fix(memory)**: DashScope embedding index rebuild config save detection fixed ([#7464](https://github.com/agentscope-ai/QwenPaw/issues/7464) closed)
- **fix(acp)**: Windows ACP agent bootstrap stalls ([#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401)) under review
- Active open work: MCP per-tool whitelist enforcement on runtime path ([#7504](https://github.com/agentscope-ai/QwenPaw/pull/7504)), agent model routing settings ([#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)), governance OFF-mode sensitive-path denial ([#7497](https://github.com/agentscope-ai/QwenPaw/pull/7497)), Make-Skill v2 ([#7509](https://github.com/agentscope-ai/QwenPaw/pull/7509)), PawPort import flow from Codex/Qoder ([#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960)).

## 4. Community Hot Topics
- **[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)** (7 comments) — Main-agent + multi-sub-agent orchestration: the primary agent only polls sub-agent status when explicitly asked "how's the progress?". Underlying need: **autonomous progress monitoring / proactive status reporting** in multi-agent delegation.
- **[#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443)** (5 comments) and **[#7511](https://github.com/agentscope-ai/QwenPaw/issues/7511)** — Safety: dangerous instruction evasion and an alleged sandbox breach (with public write-ups). Community demand for **hardened governance and prompt-injection defenses** is rising; PRs #7497 and #7504 are directly relevant.
- **[#7417](https://github.com/agentscope-ai/QwenPaw/issues/7417)** (6 comments, closed) — SSE replay duplicating streamed text; quality-of-streaming matters for perceived reliability.
- **[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505)** (3 comments) — Client disconnects against LAN LM Studio servers causing retry/timeout loops; local/self-hosted LLM users are a significant cohort.
- **PR [#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486)** — Creator plugin 1.1.2 with notification bus, async delegation, media scheduling; signals a growing app-plugin ecosystem.

## 5. Bugs & Stability (ranked by severity)
1. **Critical — Security**: Alleged sandbox breach ([#7511](https://github.com/agentscope-ai/QwenPaw/issues/7511)) and instruction-evasion ([#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443)). Mitigation PRs in flight: [#7497](https://github.com/agentscope-ai/QwenPaw/pull/7497) (OFF-mode sensitive-path denial), [#7496](https://github.com/agentscope-ai/QwenPaw/issues/7496) (CRITICAL rules rejected instead of triggering approval — policy/implementation mismatch).
2. **High — Data integrity**: Context records permanently lost in long sessions ([#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)); silent ReMe embedding job failures ([#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469)).
3. **High — Scheduling correctness**: Cron duplicate firing within misfire_grace window ([#7476](https://github.com/agentscope-ai/QwenPaw/issues/7476)); unscheduled catch-up firing after upgrade restarts ([#7480](https://github.com/agentscope-ai/QwenPaw/issues/7480)). Two independent reports — systematic cron issue.
4. **Medium**: Custom provider load failure after `max_tokens` → `max_output_length` migration ([#7474](https://github.com/agentscope-ai/QwenPaw/issues/7474), migration-breakage pattern); `/memory/status` 500 on beta.7 desktop ([#7510](https://github.com/agentscope-ai/QwenPaw/issues/7510)); empty agent responses on non-streaming gateways ([#7431](https://github.com/agentscope-ai/QwenPaw/issues/7431)).
5. **Low/UX**: Slow WeCom streaming ([#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507)); routing panel unreachable in Console ([#7493](https://github.com/agentscope-ai/QwenPaw/issues/7493), fix pending in [#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)).

## 6. Feature Requests & Roadmap Signals
- **A2A protocol support** on the 2.x Driver architecture ([#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484)) — MCP is done; A2A/ACP are the stated architecture roadmap. Strong candidate for a 2.3 milestone.
- **Official theming support** (accent color, fonts, spacing) ([#7406](https://github.com/agentscope-ai/QwenPaw/issues/7406)) — partially answered by theme-token unification PR [#7487](https://github.com/agentscope-ai/QwenPaw/pull/7487) and sidebar/settings redesign [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502).
- **Channel command validation** — misspelled slash commands shouldn't be forwarded to the agent ([#7479](https://github.com/agentscope-ai/QwenPaw/issues/7479)).
- **Agent migration/import** — PawPort PR ([#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960)) signals competitive interoperability (Codex, Qoder import).
- Likely near-term: model routing panel (PR open), Make-Skill v2, MCP whitelist enforcement.

## 7. User Feedback Summary
- **Multi-agent orchestration** users (heavy workloads, e.g., gpt-sol style task decomposition) are frustrated by passive sub-agent monitoring and context loss in long sessions — QwenPaw is being pushed into serious production workloads beyond chat.
- **Local/self-hosted LLM users** (LM Studio, custom providers) face repeated connectivity and config-migration friction (#7505, #7474, #7500).
- **Positive signals**: rapid beta cadence with automated release-verification duties is appreciated; dark-mode and UI polish PRs land quickly (often same-day, community-authored).
- **Dissatisfaction clusters** around: cron reliability, long-session context durability, and security posture — all three have active reports but fixes are not yet merged.

## 8. Backlog Watch
- **[PR #6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — ReMe reranker UI config panel: open since **July 23** (~6 weeks), still "Under Review." Needs maintainer decision or a requested rebase.
- **[PR #6936](https://github.com/agentscope-ai/QwenPaw/issues/6936)** — String-typed tool arg coercion fix: open since **Aug 12**; a real model-compat bug affecting many users.
- **[Issue #7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)** — Multi-agent proactive status reporting: active discussion but no owner/fix plan yet.
- **[Issue #7511](https://github.com/agentscope-ai/QwenPaw/issues/7511)** — Sandbox breach claim with only 1 comment; needs urgent triage, security-team response, and possibly a coordinated advisory.
- **[Issue #7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)** — Context data loss: potential data-destruction bug with only 2 comments; deserves higher priority and a reproduction/labeled investigation.

**Health assessment:** Strong community contribution velocity and fast release cycles, but security triage, cron correctness, and long-session data integrity are the key risks to address before v2.2 stable.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/lijiaming325-arch/agents-radar).*