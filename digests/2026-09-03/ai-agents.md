# OpenClaw 生态日报 2026-09-03

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-03 00:32 UTC

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

# 跨项目对比报告 — AI Agent / 个人助理开源生态
**日期：** 2026-09-03 | **覆盖说明：** OpenClaw、Hermes Agent、IronClaw 和 ZeroClaw 的摘要生成失败。定量对比仅能针对 QwenPaw 进行；跨项目部分以方向性/定性表述为主，并在数据缺失处予以标注。

---

## 1. 生态概览
2026 年末的开源个人 AI 助理领域，呈现出激烈的快速迭代 beta 稳定化周期，各项目都在竞相从“聊天 demo”级别走向生产级 agent 平台。当前可见的主导工程主题包括**安全加固**（沙箱逃逸、提示注入防御、工具白名单）、**多 Agent 编排**，以及**记忆/上下文持久性**——这些都表明这些系统正被推向真实、长时间运行的负载，而非玩具级使用。本地/自托管 LLM 支持（LM Studio、自定义 provider、局域网网关）已成为一批活跃用户群体的刚需。协议互操作性（MCP 作为基线，A2A/ACP 作为下一前沿）正在成为战略要地。由于五个项目中四个存在数据缺口，目前无法产出可信的跨项目排名。

## 2. 活跃度对比

| 项目 | Issue（24h） | PR（24h） | 发布 | 健康评分* | 数据置信度 |
|---|---|---|---|---|---|
| **QwenPaw** | 27 个更新（18 个开放） | 40 个更新（13 个已合并/关闭） | v2.2.0-beta.7 已发布 | **B+** — 速度极快；稳定版之前存在安全分诊、cron 正确性、上下文丢失风险 | 高（完整摘要） |
| OpenClaw | ⚠️ 无数据 | ⚠️ 无数据 | ⚠️ 无数据 | 未知 | 无 — 生成失败 |
| Hermes Agent | ⚠️ 无数据 | ⚠️ 无数据 | ⚠️ 无数据 | 未知 | 无 |
| IronClaw | ⚠️ 无数据 | ⚠️ 无数据 | ⚠️ 无数据 | 未知 | 无 |
| ZeroClaw | ⚠️ 无数据 | ⚠️ 无数据 | ⚠️ 无数据 | 未知 | 无 |

\* 健康评分需要至少 2 个有数据的项目才能进行有意义的校准；QwenPaw 的评分为临时值。

**建议：** 在得出竞争性结论之前，先为四个生成失败的项目重跑摘要流水线。

## 3. OpenClaw 的定位
**今日无可用数据。** 作为指定的核心参考项目，OpenClaw 摘要生成失败本身就值得关注——如果失败反映的是上游活跃度稀疏或 API 问题，那相对于 QwenPaw 每日 40 个 PR 的速度而言，这将是一个有分量的负面信号。关于 OpenClaw 优势、技术差异化或社区规模的结论，应在获得有效摘要后再行判断。

## 4. 共同的技术关注点
基于可用数据（QwenPaw），以及可能在整个生态普遍存在的主题：

- **安全治理** *(QwenPaw 已确认；几乎必然是生态全员的课题)*：沙箱逃逸指控（#7511）、提示绕过（#7443）、运行时工具白名单（PR #7504）、治理模式下的路径拒绝（PR #7497）。任何具备写/执行能力的 agent 都会面对这些问题。
- **记忆与向量基础设施**：跨 embedding 后端的维度归一化、索引重建、reranker 配置、任务静默失败——记忆子系统如今已是稳定性的关键组件，而非附加功能。
- **跨渠道的流式可靠性**：SSE 重复推送、非流式网关的边界情况、企业微信延迟——渠道健壮性是通用的质量门槛。
- **本地/自托管 LLM 兼容性**：连接重试循环、provider 配置迁移——这在开源生态中是一个规模可观的用户群体。
- **多 Agent 编排**：自主子 Agent 的监控与汇报（QwenPaw #7450）；随着任务委托成为标准实践，预计会出现在各同类项目中。

## 5. 差异化分析
目前无法可靠评估差异化。仅从 QwenPaw 的摘要来看，其定位为：
- **功能广度**：桌面应用 + WebUI + 多渠道 + cron 调度 + 记忆 + 插件生态（创作者插件、Make-Skill）——全平台打法。
- **架构**：基于 Driver 的 2.x 架构，MCP 已完成，A2A/ACP 在路线图上（#7484）——协议先行。
- **互操作策略**：入站迁移工具（从 Codex/Qoder 迁移的 PawPort）——从竞争生态激进获客。
- **目标用户**：横跨消费级桌面用户（暗色模式修复、主题定制需求）与生产级负载（多 Agent 编排、长会话持久性）——这种双重受众正在拖累其稳定性（上下文丢失和安全 bug 主要来自后一类群体）。

## 6. 社区势能与成熟度
- **QwenPaw — 快速迭代梯队（B+ 健康评分）：** 24 小时内 27 个 issue / 40 个 PR，三天内发布三个 beta 版本，社区当天贡献 UI 修复。风险画像：发布快，但关键事项的分诊慢（#7511 沙箱指控仅 1 条评论；#7447 数据丢失 bug 被低估优先级）。
- **OpenClaw、Hermes Agent、IronClaw、ZeroClaw — 未知：** 摘要生成失败导致无法归入梯队。建议在做出投资组合或采用决策前重新采集数据。

## 7. 趋势信号
1. **安全已成为新的发布阻塞项。** Beta 周期内涌现的公开沙箱突破报告和提示绕过披露，意味着安全分诊 SLA 和协同披露流程已成为 agent 维护者的入场标配。
2. **Agent 在记忆持久性问题解决之前就进入了生产环境。** 长会话上下文丢失和 embedding 任务静默失败表明，记忆层需要事务性保证（持久化队列、校验机制），类似数据库曾经经历过的历程。
3. **MCP 是基线；A2A 是下一场协议之战。** QwenPaw 明确的"MCP 已完成、A2A 接下来”路线图表明，Agent 间协议将定义 2.3 时代的竞争格局。
4. **自托管 LLM 用户是一等公民群体。** 反复出现的 provider 配置迁移破坏和局域网网关问题，说明需要向后兼容的配置 schema 和经过契约测试的 provider 适配器。
5. **调度器正确性在 agent 产品中至关重要。** 重复/补跑的 cron 触发（#7476、#7480）表明“Agent 作为自主执行者”会把普通的基础设施 bug 提升到数据完整性级别——被触发两次的动作会产生真实世界后果。
6. **对 Agent 开发者的可执行建议：** 从第一天起就为安全公告做好设计，把记忆任务当作可靠流水线来对待，在渠道边界校验斜杠命令的输入面，并构建导入工具——迁移流程（QwenPaw 的 PawPort）正在成为获客武器。

---
**结论：** QwenPaw 是当前可见速度最快的项目，势头强劲，但存在三项稳定版之前的风险（安全分诊、cron 正确性、上下文持久性）。本次运行无法支撑任何关于 OpenClaw、Hermes Agent、IronClaw 或 ZeroClaw 的对比结论——请先重新生成这些摘要，再进行后续分析。

---

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目简报 — 2026-09-03

## 1. 今日概览
QwenPaw 呈现**高且持续的活动度**：过去 24 小时内更新了 27 个 issue(18 个开放)和 40 个 PR(27 个开放，13 个已合并/关闭)，同时发布了新版本。项目正处于紧张的 **v2.2.0-beta 稳定化周期** —— beta.5、beta.6 和 beta.7 的验证 issue 均在过去三天内关闭。开发工作分布在内存(ReMe)、治理/安全、cron 调度、控制台 UI 以及通道/流式可靠性等方面。今日最值得关注的信号是一起**被举报的安全沙箱突破(#7511)** 以及持续的提示词绕过问题(#7443),需要维护者优先立即处理。

## 2. 版本发布
**v2.2.0-beta.7** 已发布。
- **fix(memory):** 规范化各后端特定的嵌入维度([PR #7465](https://github.com/agentscope-ai/QwenPaw/pull/7465)) —— 使用非默认维度嵌入后端的用户在升级后应重建索引。
- **chore:** 版本号提升至 v2.2.0b7([PR #7485](https://github.com/agentscope-ai/QwenPaw/pull/7485))
- **fix(webui):** 深色模式覆盖修复(完成 [#7473](https://github.com/agentscope-ai/QwenPaw/pull/7473))
- ⚠️ 注意：此版本自身已报告一处回归 —— Windows Desktop 安装包上 `/memory/status` 返回 500([#7510](https://github.com/agentscope-ai/QwenPaw/issues/7510))。
- 发布值守验证跟踪于 [Issue #7503](https://github.com/agentscope-ai/QwenPaw/issues/7503)。

## 3. 项目进展
24 小时内合并/关闭了 13 个 PR。亮点：
- **fix(desktop)**:保留 PyInstaller 多进程运行时钩子；修复 StdIO MCP 派生辅助进程时 macOS 后端重启的问题([#7489](https://github.com/agentscope-ai/QwenPaw/pull/7489),关闭 [#7481](https://github.com/agentscope-ai/QwenPaw/issues/7481))
- **fix(webui)**:MCP 区域容器的深色模式覆盖([#7473](https://github.com/agentscope-ai/QwenPaw/pull/7473),关闭 [#7471](https://github.com/agentscope-ai/QwenPaw/issues/7471))
- **fix(memory)**:修复 DashScope 嵌入索引重建配置保存检测([#7464](https://github.com/agentscope-ai/QwenPaw/issues/7464) 已关闭)
- **fix(acp)**:Windows ACP agent 引导卡顿([#7401](https://github.com/agentscope-ai/QwenPaw/pull/7401))评审中
- 活跃的进行中工作：运行时路径上的 MCP 按工具白名单强制执行([#7504](https://github.com/agentscope-ai/QwenPaw/pull/7504))、agent 模型路由设置([#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501))、治理 OFF 模式下的敏感路径拒绝([#7497](https://github.com/agentscope-ai/QwenPaw/pull/7497))、Make-Skill v2([#7509](https://github.com/agentscope-ai/QwenPaw/pull/7509))、来自 Codex/Qoder 的 PawPort 导入流程([#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960))。

## 4. 社区热点话题
- **[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)**(7 条评论)—— 主 agent + 多子 agent 编排：只有在被明确询问“进度如何？”时，主 agent 才会轮询子 agent 状态。底层需求：多 agent 委派中的**自主进度监控 / 主动状态汇报**。
- **[#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443)**(5 条评论)与 **[#7511](https://github.com/agentscope-ai/QwenPaw/issues/7511)** —— 安全：危险指令绕过以及一起声称的沙箱突破(附公开披露文章)。社区对**强化治理与提示词注入防御**的诉求不断上升;PR #7497 和 #7504 直接相关。
- **[#7417](https://github.com/agentscope-ai/QwenPaw/issues/7417)**(6 条评论，已关闭)—— SSE 重放导致流式文本重复；流式输出质量关系到用户对可靠性的感知。
- **[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505)**(3 条评论)—— 针对局域网 LM Studio 服务器的客户端断连导致重试/超时循环；本地/自托管 LLM 用户是重要的用户群体。
- **PR [#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486)** —— Creator 插件 1.1.2,带通知总线、异步委派、媒体调度；预示应用插件生态正在成长。

## 5. 缺陷与稳定性(按严重程度排序)
1. **严重 —— 安全**：声称的沙箱突破([#7511](https://github.com/agentscope-ai/QwenPaw/issues/7511))与指令绕过([#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443))。缓解 PR 进行中:[#7497](https://github.com/agentscope-ai/QwenPaw/pull/7497)(OFF 模式敏感路径拒绝)、[#7496](https://github.com/agentscope-ai/QwenPaw/issues/7496)(CRITICAL 规则被拒绝而非触发审批 —— 策略与实现不一致)。
2. **高 —— 数据完整性**：长会话中上下文记录永久丢失([#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447));ReMe 嵌入任务静默失败([#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469))。
3. **高 —— 调度正确性**：cron 在 misfire_grace 窗口内重复触发([#7476](https://github.com/agentscope-ai/QwenPaw/issues/7476));升级重启后发生计划外的补偿触发([#7480](https://github.com/agentscope-ai/QwenPaw/issues/7480))。两份独立报告 —— 属系统性 cron 问题。
4. **中**:`max_tokens` → `max_output_length` 迁移后自定义 provider 加载失败([#7474](https://github.com/agentscope-ai/QwenPaw/issues/7474),迁移破坏模式)；beta.7 桌面端 `/memory/status` 返回 500([#7510](https://github.com/agentscope-ai/QwenPaw/issues/7510));非流式网关上 agent 返回空响应([#7431](https://github.com/agentscope-ai/QwenPaw/issues/7431))。
5. **低/体验**：企业微信流式输出缓慢([#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507));控制台中路由面板无法访问([#7493](https://github.com/agentscope-ai/QwenPaw/issues/7493),修复待合并于 [#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501))。

## 6. 功能请求与路线图信号
- 2.x Driver 架构上的 **A2A 协议支持**([#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484)) —— MCP 已完成；A2A/ACP 是明确的架构路线图。2.3 里程碑的有力候选。
- **官方主题支持**(强调色、字体、间距)([#7406](https://github.com/agentscope-ai/QwenPaw/issues/7406)) —— 主题 token 统一 PR [#7487](https://github.com/agentscope-ai/QwenPaw/pull/7487) 与侧边栏/设置重设计 [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) 已部分回应此需求。
- **通道命令校验** —— 拼写错误的斜杠命令不应转发给 agent([#7479](https://github.com/agentscope-ai/QwenPaw/issues/7479))。
- **Agent 迁移/导入** —— PawPort PR([#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960))释放出竞争性互操作信号(导入 Codex、Qoder)。
- 近期可能的交付：模型路由面板(PR 已开放)、Make-Skill v2、MCP 白名单强制执行。

## 7. 用户反馈摘要
- **多 agent 编排**用户(高负载场景，如 gpt-sol 风格的任务分解)对子 agent 被动监控和长会话上下文丢失感到沮丧 —— QwenPaw 正被推向超越聊天场景的严肃生产负载。
- **本地/自托管 LLM 用户**(LM Studio、自定义 provider)反复遭遇连接与配置迁移摩擦(#7505、#7474、#7500)。
- **积极信号**：带自动发布验证值守的快速 beta 节奏广受好评；深色模式与 UI 打磨 PR 落地迅速(通常当天完成，且由社区贡献)。
- **不满集中于**：cron 可靠性、长会话上下文持久性以及安全态势 —— 三者均有活跃报告，但修复尚未合并。

## 8. 积压关注
- **[PR #6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)** —— ReMe 重排序 UI 配置面板：自 **7 月 23 日**开放(约 6 周)，仍处于“评审中”。需要维护者决策或请求 rebase。
- **[PR #6936](https://github.com/agentscope-ai/QwenPaw/issues/6936)** —— 字符串类型工具参数强制转换修复：自 **8 月 12 日**开放；是影响众多用户的真实模型兼容性缺陷。
- **[Issue #7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)** —— 多 agent 主动状态汇报：讨论活跃，但尚无负责人/修复计划。
- **[Issue #7511](https://github.com/agentscope-ai/QwenPaw/issues/7511)** —— 沙箱突破声称仅有 1 条评论；需要紧急分诊、安全团队回应，并可能需要协调发布安全通告。
- **[Issue #7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)** —— 上下文数据丢失：潜在的破坏性数据缺陷，仅有 2 条评论；应获得更高优先级并进行可复现/打标签的调查。

**健康度评估：** 社区贡献速度强劲、发布周期迅捷，但在 v2.2 稳定版之前，安全分诊、cron 正确性以及长会话数据完整性是亟待解决的关键风险。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [agents-radar](https://github.com/lijiaming325-arch/agents-radar) 自动生成。*