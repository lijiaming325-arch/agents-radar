# OpenClaw 生态日报 2026-08-28

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-08-28 15:10 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

⚠️ 摘要生成失败。

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / Agent 生态
**日期：** 2026-08-28 · **范围：** OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

> ⚠️ **数据可用性说明：** OpenClaw、IronClaw、QwenPaw 和 ZeroClaw 的每日摘要生成失败。今天仅有 **Hermes Agent** 的摘要可用。因此，下文第 2–3 节将唯一的已验证数据集与明确标注的数据缺口结合呈现。为避免无依据的推断，跨项目的结论性陈述已作限制。

---

## 1. 生态概览
2026 年 8 月下旬的开源个人 AI 助手领域，正从“聊天机器人套壳”转向**持久化个人基础设施**：网关（Telegram/Slack）、多配置文件隔离、本地模型运行时和定时任务委托如今已是入场标配。Hermes Agent 的摘要反映出一个通过高强度的 issue 快速吸纳（24 小时内 50 个 issue + 50 个 PR）配合纪律性战役式维护来实现规模化的项目。主要的工程战场包括 **Windows 平台对等性**、**会话状态/前缀缓存正确性**（直接影响成本），以及**委托任务的持久性**——鉴于该生态内各项目共享相似的架构模式，这些主题很可能在其他同类项目中同样出现。用户期望的变化也印证了这个领域的成熟：更新可靠性、隐私隔离和 API 成本透明度，如今已比单纯的功能迭代速度更重要。

## 2. 活跃度对比

| 项目 | Issues (24h) | PRs (24h) | PR 吞吐量 | 发布 (24h) | 健康度 | 数据状态 |
|---|---|---|---|---|---|---|
| **Hermes Agent** | 50 | 50 | 28%（14/50 已关闭） | 无 | 活跃 / 响应及时；热点：Windows、会话状态 | ✅ 已验证 |
| OpenClaw | — | — | — | — | — | ❌ 摘要失败 |
| IronClaw | — | — | — | — | — | ❌ 摘要失败 |
| QwenPaw | — | — | — | — | — | ❌ 摘要失败 |
| ZeroClaw | — | — | — | — | — | ❌ 摘要失败 |

**建议：** 在对四个摘要失败的项目重新生成数据之前，不应据此进行排名；今日报告不可用于跨项目基准对比。

## 3. OpenClaw 的处境
2026-08-28 无摘要数据；无法根据今日摘要评估 OpenClaw 的相对优势、技术路线和社区规模。作为本生态指定的“核心参考”项目，建议在数据恢复后优先重新评估。

## 4. 共同的技术关注点
今天无法进行跨项目确认，但 Hermes 的数据揭示了值得在其他项目中持续观察的生态级需求：

- **更新/安装可靠性**（Hermes）— 更新后代码陈旧偏差（systemd 仪表盘返回 500、SSH 后端状态过期）以及 Windows SCM 服务中止；任何具备自我更新机制的 agent 都会遇到这类故障。
- **会话状态与缓存正确性**（Hermes）— `null` 系统提示词导致前缀缓存失效（P0 #96570）表明状态管理直接影响用户的 API 开销；跨配置文件泄漏（#66887）则涉及隐私问题。
- **提供商扩展与本地运行时**（Hermes）— 对 Mistral 提供商的需求（👍27）以及托管的 llama.cpp 运行时，印证了“任意模型、本地优先”的预期。
- **跨界面一致性**（Hermes）— 在 CLI/TUI/网关/桌面端统一斜杠命令注册表。

## 5. 差异化分析
由于仅有一份数据集，无法从实证角度陈述差异化。Hermes Agent 可观察到的特征是：**以网关为中心的个人助手架构**（多路复用网关、配置文件、Telegram/Slack/cron/SSH），以激进的功能迭代配合战役驱动的稳定性修复。其他项目的差异化待定。

## 6. 社区活跃度与成熟度
- **Hermes Agent — “快速迭代 + 积极稳定化”。** 极高的吸纳量（50/50）搭配 28% 的吞吐率，无发布版本（所有工作直接进 main），完成了 29 个 PR 的桌面端多网关战役，当日问题当日修复。成熟度信号：维护纪律严明，但 Windows/安装类 bug 积压表明平台加固阶段尚未完成。
- **OpenClaw、IronClaw、QwenPaw、ZeroClaw — 待分类**，等待数据恢复。

## 7. 趋势信号
可提取的、与 agent 开发者相关的趋势（已由 Hermes 数据验证）：

1. **成本透明度是产品特性。** 单个缓存亲和性 bug（#96570）悄悄推高了用户 API 账单，达到 P0 级严重程度——前缀缓存正确性如今已属 SLA 范畴，而非单纯的优化项。
2. **Windows 已不再是可选项。** PATH、SCM 服务、Electron 启动、符号链接——Windows 对等性 bug 主导了积压列表；“macOS/Linux 优先”的 agent 正在失去庞大用户群体的信任。
3. **异步委托需要持久性语义。** 无重试/无呈现机制的孤儿在途任务“感觉就像静默的数据丢失”——agent 需要类似工作流引擎的任务生命周期管理。
4. **多配置文件隔离 = 隐私需求。** 配置文件间的状态泄漏（#66887）是个人助手领域对应的多租户隔离问题；应将其视为基线预期。
5. **本地 + 异构模型支持驱动采用。** 对 Mistral 的需求、为低内存 Ollama 放宽上下文最低要求，以及托管的 llama.cpp，都证实了本地优先的灵活性是主要采用驱动力。
6. **用户将 agent 部署为基础设施，而非玩具。** SSH 远程后端、cron 报告、多路复用消息——可靠性工程（看门狗、更新验证）正在成为超越原始能力的关键差异点。

---

**分析流水线的行动项：** (1) 调查其他四个项目摘要生成失败的原因；(2) 数据恢复后重新发布本对比报告；(3) 持续关注 Hermes 的 P0 #96570 修复（PR #97158），以此作为全生态会话状态工程成熟度的先行指标。

---

---

## 同赛道项目详细报告

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

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [agents-radar](https://github.com/lijiaming325-arch/agents-radar) 自动生成。*