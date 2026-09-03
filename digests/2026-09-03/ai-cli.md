# AI CLI 工具社区动态日报 2026-09-03

> 生成时间: 2026-09-03 00:32 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具生态 — 跨工具对比报告
**日期：2026-09-03**

---

## 1. 生态概览

AI 开发者 CLI 领域目前非常活跃，四大主流工具(OpenAI Codex、Gemini CLI、GitHub Copilot CLI、Qwen Code)的每日 issue/PR 吞吐量都相当可观。所有社区都贯穿着三大主题：**agent 的可靠性与信任**(虚假成功上报、破坏性操作、配额记账)、**会话/上下文完整性**(历史记录丢失、压缩失败、上下文无限增长)，以及 **Windows 平台的短板**(WSL、沙箱、渲染)。安全加固在今天也显著升温——Gemini CLI 合入了六个安全 PR,Copilot CLI 限制了 Linux 沙箱的出站访问，而 Qwen Code 则面临仓库级 CVE 审计失败。三个仓库(Claude Code、OpenCode、Pi)今日摘要生成失败，限制了对其生态的可见性。

---

## 2. 活跃度对比

| 工具 | Issues(24h 热点) | PRs(24h 重点) | Discussions | Releases |
|---|---|---|---|---|
| **OpenAI Codex** | 10 个热点(含 meta-tracker) | 10 个活跃 | 7+ 个活跃(ideas 与 show-and-tell) | 2 个 alpha(0.153.0-alpha.5/6) |
| **Gemini CLI** | 10 个热点 | 10 个已合并/活跃 | 本期无数据 | 1 个 nightly |
| **GitHub Copilot CLI** | 10+ 个热点 | 无 PR 详情 | 本期无数据 | 2 个补丁(v1.0.83-2/-3) |
| **Qwen Code** | 10 个热点 | 10 个活跃 | 本期无数据 | 1 个(live-host-v0.2.0) |
| **Claude Code** | 不适用 — 摘要不可用 | 不适用 | 不适用 | 不适用 |
| **OpenCode** | 不适用 — 摘要不可用 | 不适用 | 不适用 | 不适用 |
| **Pi** | 不适用 — 摘要不可用 | 不适用 | 不适用 | 不适用 |

---

## 3. 共同的功能方向

| 方向 | 涉及工具 | 依据 |
|---|---|---|
| **破坏性操作防护** | Codex(#42355 `git clean` 清空了 secrets 目录)、Gemini CLI(#22672 `git reset --force`)、Qwen Code(shell guard 配置/审计需求) | 三个社区都要求为不可逆操作提供确认门槛、审计日志和更安全的默认行为 |
| **配额/成本透明度** | Codex(#41220 配额 meta-tracker、#42372 Luna Reserve)、Copilot CLI(#4224 OTel span 缺少计费属性) | 用户要求按请求的使用量记账；企业需要精确的成本归集 |
| **多模型灵活性** | Codex(#42380 静默模型降级前需确认)、Copilot CLI(v1.0.83-2 支持多模型回退、#3709 会话内切换、BYOK)、Gemini CLI(模型选择器的时效性，#29172) | 模型选择正在成为一等用户控制项，而非不透明的后端决策 |
| **会话/记忆完整性** | Codex(rollout/SQLite 投影修复 #42369/#42378)、Copilot CLI(恢复会话时 OOM、agent 配置丢失)、Gemini CLI(Auto Memory 尚不成熟 #26522–26525)、Qwen Code(pulses/MCP 图片导致上下文无限增长) | 长会话状态恢复与上下文增长的有界控制是普遍痛点 |
| **MCP 生态成熟化** | Copilot CLI(协议协商、OAuth 反复失效、服务端静默失败)、Qwen Code(#10834 MCP 图片预算无上限)、Codex(#42395 codex_version MCP 元数据) | MCP 已是关键基础设施；协议、认证与资源限制方面的 bug 到处出现 |
| **Agent 静默失败上报** | Gemini CLI(#22323 MAX_TURNS 被上报为 GOAL 成功)、Codex(#41079 历史记录过期) | 准确的 agent 状态/遥测是编排工作流建立信任的前提 |

---

## 4. 差异化分析

- **OpenAI Codex** — 覆盖面最广(TUI、桌面端、app-server、daemon)。独有特性:pets 功能(伴随疲劳感)、realtime sessions GA(#42377)、实验性上下文管理。目标用户：ChatGPT Pro 消费级高级用户；重度投入 Windows 桌面。短板：配额信任赤字和 Windows 不稳定。
- **Gemini CLI** — 本期主打安全优先姿态(Seatbelt 隔离、NTFS SFN 遍历、ACL 检查、移除硬编码的 CrUX API key)。差异化：多 agent 编排(subagents、skills)与 AST 感知工具化路线图(#22745)。目标用户：偏 Linux/POSIX 的开发者、可扩展性用户。
- **GitHub Copilot CLI** — 企业导向：OTel 计费属性、组织管理的默认模型(#4692)、PowerShell ConstrainedLanguage 支持、代理/OAuth 流程。多模型回退 + 自定义 agent 的 `model-policy: required` 具有治理导向。短板：Node.js 在长会话中的资源泄漏。
- **Qwen Code** — 架构上胆子大：ink→OpenTUI 迁移(#8662),以及把 `qwen serve` daemon/Web Shell 作为一等入口(turn 导航、环境面板、钉钉多 agent 聚合)。AI 评审独树一帜地透明(覆盖率台账 #9768)。挑战：混合模型下的 XML 泄漏、自托管 CI 承压。

---

## 5. 社区势能与成熟度

- **最活跃 / 迭代最快：** OpenAI Codex — 24 小时内发布两个 alpha,外加 10 个覆盖 daemon、历史流水线和配额 UX 的实质性 PR;讨论文化最丰富(planner/worker 编排、会话共享)。
- **最规范 / 安全最成熟：** Gemini CLI — 10 个聚焦的 PR,其中六项安全加固；issue 按 P1/P2 分诊，社区 PR 响应迅速(#29164→#29172 一天之内)。
- **企业稳定性推进中：** Copilot CLI — 关闭了一个长期存在的 agent bug(#2630);发版频繁但此窗口内 PR 层面的透明度较低；内存泄漏问题集中爆发，提示存在稳定性技术债。
- **快速现代化：** Qwen Code — 激进的 UI 重写与 serve 平台投入；对已报告 bug 的自愈速度快，但 CI 基础设施明显承压(48 小时内 10+ 次逐提交失败)。
- **未知：** Claude Code、OpenCode、Pi — 摘要生成失败；不应得出任何结论。

---

## 6. 趋势信号

1. **信任是新的战场。** 配额记账(#41220)、静默模型降级(#42380)以及虚假的 agent 成功上报(#22323)表明用户正在审计 agent 行为。暴露可验证遥测的工具(Qwen 的评审覆盖率台账、Codex 的 `CODEX_VERSION`)正在向一套可观测性标准趋同。
2. **Windows 对等性是成熟度的滞后指标。** 每个主流工具都有活跃的 Windows 专属 bug 集群(WSL、沙箱、渲染)。在 Windows 优先的技术栈上评估 CLI 的团队应将其权重显著调高。
3. **模型灵活性正在成为入场门槛。** 多模型回退、会话内切换、BYOK 以及降级确认表明 CLI 正在成为模型无关的编排层——锁定担忧正在塑造路线图。
4. **上下文管理正在成为产品特性**，而非实现细节：Codex 的实验性 token 预算上下文模式、Qwen 的图片预算强制执行、Copilot 的压缩失败，都预示着 2026 年“上下文经济学”工具化的到来。
5. **MCP 承重但脆弱。** Copilot 与 Qwen 在认证、协议版本和资源限制上的 bug 表明，生态需要标准化的符合性测试，才能支撑企业级深度依赖。
6. **给开发者的实操建议：** 锁定稳定版本(alpha 线存在回归，如 Codex 26.820 的渲染问题)，监控长时任务的会话内存(Copilot v1.0.82 线)，并且无论选择哪个工具，都为 agent 执行的破坏性 git 操作启用确认防护。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills 摘要生成失败。

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区周报 — 2026-09-03

## 1. 今日要点
Codex 团队发布了两个 alpha 版本（0.153.0-alpha.5/6），并快速合并了一批 PR，重点涉及 Windows 守护进程生命周期管理、rollout 历史健壮性以及实验性上下文管理。与此同时，社区的不满情绪主要集中在两个方面：配额耗尽与用量统计不一致（#41220），以及一批围绕 WSL 项目、点击穿透宠物和会话历史卡顿的 Windows 桌面端 bug。

## 2. 版本发布
- **[rust-v0.153.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.6)** 与 **[rust-v0.153.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.5)** — 24 小时内落地两个 alpha 构建；未提供详细更新日志。预计包含了下文所述的大量 Rust 侧合并修复（rollout 解码、app-server、Windows 守护进程支持）。

## 3. 热门问题

1. **[#41463 — [Windows + WSL] 无法创建项目：AbsolutePathBuf 反序列化时缺少基础路径](https://github.com/openai/codex/issues/41463)**（19 条评论，👍10）— Windows+WSL2 用户的项目创建功能损坏，属于核心工作流。今日互动量最高的 bug。
2. **[#41513 — [Windows] 悬浮宠物变为点击穿透且无法拖动](https://github.com/openai/codex/issues/41513)**（18 条评论，👍6）— 内置与自定义宠物均受影响；宠物功能持续产生交互类 bug。
3. **[#41079 — [Desktop][Windows] 分页线程历史因重复序号而卡顿](https://github.com/openai/codex/issues/41079)**（18 条评论）— 尽管 rollout JSONL 完整，本地历史投影仍显示过期快照；PR #42369 直接针对此问题。
4. **[#41220 — [Meta] 配额异常消耗 / 用量统计不一致](https://github.com/openai/codex/issues/41220)**（15 条评论，👍8）— 汇总用户反映配额消耗快于 token 证据预期的跨报告追踪帖。当前最严重的信任问题。
5. **[#32069 — 隐藏 Pets 菜单项 + 可配置的提示词润色](https://github.com/openai/codex/issues/32069)**（14 条评论，👍16）— 长期悬而未决的改进请求；社区强烈认为宠物不应占据账户菜单的主导地位。
6. **[#39989 / #39897 / #41399 — 已删除的对话仍出现在最近列表/侧边栏中](https://github.com/openai/codex/issues/39989)**（13、12、8 条评论）— 同一“已删除线程不消失”的 bug 家族在 Windows 和 macOS 上均存在；#41399 获得 👍10，说明确实令用户困扰。
7. **[#40878 — [Windows] 客户区空白；`--disable-direct-composition` 可作为临时解决方案](https://github.com/openai/codex/issues/40878)**（11 条评论）— 26.820.7780.0 中的渲染回归，社区已发现临时解决方案。
8. **[#41541 — Codex 0.150 处理工作负载速度快约 1.6–1.8 倍，迅速耗尽 Pro 配额](https://github.com/openai/codex/issues/41541)**（7 条评论）— 将吞吐量变化与配额消耗挂钩；与 #41220 元追踪帖互为补充。
9. **[#42355 — Agent 在嵌套的已忽略路径上运行 `git clean`，删除了整个已忽略的父目录](https://github.com/openai/codex/issues/42355)**（3 条评论）— 危险的破坏性工具行为（secrets 目录被清空）；凸显 git 操作需要防护机制。
10. **[#42224 — Pro Lite 每周配额在重置后一天内消耗约 93%](https://github.com/openai/codex/issues/42224)**（2 条评论，👍2）— 补充配额元追踪帖的新数据点。

## 4. 重要 PR 进展

1. **[#42392 — Windows 上的托管守护进程更新](https://github.com/openai/codex/pull/42392)** + **[#42381 — Windows 上托管 app-server 的生命周期管理](https://github.com/openai/codex/pull/42381)** — 旨在缩小托管守护进程在 Windows/Unix 之间的对等性差距的重要推进；与 `codex.exe` 孤儿进程问题（#40972）相关。
2. **[#42385 — 实验性上下文管理的激活](https://github.com/openai/codex/pull/42385)** — 新增 `features.context_management.experimental_mode` 配置，为符合条件的 ChatGPT 套餐启用基于 token 预算的上下文和历史记录笔记。对长会话质量而言是一个重要方向。
3. **[#42378 — 通过规范的 JSON 解码器路由 rollout 读取](https://github.com/openai/codex/pull/42378)** — 修复因嵌套小数反序列化导致的会话无法恢复问题；与 #42369 相辅相成。
4. **[#42369 — 让 SQLite 历史投影跳过无效记录继续推进](https://github.com/openai/codex/pull/42369)** — 跳过格式错误/回退的 rollout 记录而非阻塞；直接针对历史卡顿 bug 家族（#41079、#41995）。
5. **[#42372 — TUI 中的 Luna Reserve 用量回退](https://github.com/openai/codex/pull/42372)** — 普通用量耗尽时自动将符合条件的用户切换至预留配额，恢复后回到原有模式。针对配额抱怨的具体回应。
6. **[#42380 — 安全缓冲重试需确认](https://github.com/openai/codex/pull/42380)** — 在使用服务器选择的更快（可能能力较弱）模型重试前需用户确认 — 解决静默模型降级问题。
7. **[#42391 — 在 executor 路径上下文中授权 `apply_patch`](https://github.com/openai/codex/pull/42391)** — 修复因路径约定不匹配导致的可写根目录/权限误判。
8. **[#42395 — 向命令和轮次元数据暴露 Codex 版本](https://github.com/openai/codex/pull/42395)** — 新增 `CODEX_VERSION` 环境变量和 `codex_version` MCP 元数据；提升 bug 报告的可复现性。
9. **[#42377 — Realtime 会话在 app-server 中始终可用](https://github.com/openai/codex/pull/42377)** — 移除按线程的功能开关；实时对话现已成为正式（GA）行为。
10. **[#42375 — 卸载时清理 Windows 沙箱资源](https://github.com/openai/codex/pull/42375)** — 卸载软件包时清理沙箱账户/进程；针对 Windows 沙箱技术栈的清理修复。

## 5. 热门讨论

**创意**
- **[#40707 — "5 小时限制回归了"](https://github.com/openai/codex/discussions/40707)** — 用户反对在每周配额之外重新实施 5 小时滚动限制。
- **[#41716 — ChatGPT Planner 与 Codex Worker 编排](https://github.com/openai/codex/discussions/41716)** — 提议将 ChatGPT 作为持久规划器，Codex 实例作为执行工作者。
- **[#25580 — 团队共享 Codex 会话](https://github.com/openai/codex/discussions/25580)** 与 **[#22356 — 跨账户的线程共享/交接](https://github.com/openai/codex/discussions/22356)** — 对多用户会话协作的持续需求。
- **[#42200 — Skills 的"仅用户调用"模式](https://github.com/openai/codex/discussions/42200)** — 允许技能按需使用，但绝不会被模型自动选中。

**展示与分享**
- **[#42041 — agent-watch](https://github.com/openai/codex/discussions/42041)** — 区分后台 `codex exec` 工作进程的 DONE/FAILED/STALL 状态。
- **[#41898 — Codex Task Title Organizer](https://github.com/openai/codex/discussions/41898)** — 生成具备项目感知能力的任务标题的桌面插件。
- **[#42277 — 两个记忆工具（rawmem / memdsl）](https://github.com/openai/codex/discussions/42277)** — 用于原始历史和精选长期记忆的 stdio MCP 工具。

## 6. 功能请求趋势
- **配额透明度与控制**：用量统计解释（#41220）、移除 5 小时限制、预留回退的交互体验 — 当前主导主题。
- **协作**：跨账户的共享会话与线程交接（#25580、#22356）。
- **多智能体编排**：规划器/工作者模式以及向进行中的会话注入外部事件（#41716、#33556）。
- **桌面端 UX 打磨**：隐藏/禁用宠物（#32069）、更好的窗口管理（#27378）、受限网络下的纯 HTTPS 传输（#27381）。
- **Skills 控制**：仅限手动启用（"user-only"）的技能使用（#42200）。

## 7. 开发者痛点
- **Windows 桌面端不稳定**：WSL 项目创建损坏、渲染空白、ARM64 上启动画面卡住、孤儿进程以及切换器 UI 重叠 — Windows 迄今仍是 bug 最多平台。
- **会话/历史完整性**：已删除对话重新出现、分页历史卡顿、心跳 NOTIFY 结果消失 — rollout/SQLite 投影管线正在积极修复中（PR #42378/#42369）。
- **配额信任赤字**：反复出现配额消耗快于 token 日志所能解释的报告，现已汇总至元追踪帖 #41220；用户希望获得按请求的用量统计。
- **破坏性工具安全**：`git clean` 清空已忽略目录（#42355）表明 agent 在不可逆操作周围需要更严格的防护机制。
- **宠物功能疲劳**：宠物交互 bug 持续不断，外加要求将该功能设为可选退出的请愿。

---

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区简报 — 2026-09-03

## 今日亮点
过去 24 小时内，仓库涌现出大量安全加固类 PR,社区贡献者提交了针对路径穿越、配置文件所有权检查以及沙箱隔离的修复。社区对模型选择器中缺失 Gemini 3.6/3.7 Flash 的不满持续升温([#29164](https://github.com/google-gemini/gemini-cli/issues/29164)),该问题一夜之间成为点赞最多的新 issue。与此同时，长期存在的 agent 可靠性 bug(子 agent 挂起、假成功终止)依然占据评论数榜首。

## 发布
- **[v0.59.0-nightly.20260902.g4963a4456](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260902.g4963a4456)** — 包含一项修复：改进了 web fetch 工具中的目标校验与连接路由([#29120](https://github.com/google-gemini/gemini-cli/pull/29120),@diegogodinezr 的首次贡献)。

## 热门 Issue
1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子 agent 在达到 MAX_TURNS 后仍报告 GOAL 成功(P1,13 条评论)** — `codebase_investigator` 被中断时会误报成功，向调用方隐藏了失败。讨论最多的 issue;破坏了对 agent 编排的信任。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent 无限挂起(P1,8 条评论，👍 8)** — 创建文件夹等简单任务也会卡住；用户只能通过完全禁用子 agent 来规避。
3. **[#29164](https://github.com/google-gemini/gemini-cli/issues/29164) — 模型选择器中缺失 Gemini 3.6/3.7 Flash(P1,👍 9)** — 新 issue 但热度快速攀升；社区 PR([#29172](https://github.com/google-gemini/gemini-cli/pull/29172))已提交。
4. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 执行卡在"Waiting input"(P1)** — 已完成的命令仍显示为等待输入，这是反复出现的可用性障碍。
5. **[#29045](https://github.com/google-gemini/gemini-cli/issues/29045) — read-many-files 子串匹配 bug 导致未请求的二进制文件被内联(P1)** — Glob 匹配通过子串包含进行，导致不必要的图片负载和 token 浪费。
6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory 的确定性脱敏(P2,area/security)** — 机密信息在脱敏前就已进入模型上下文；被标记为隐私风险。
7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子 agent 在 Wayland 上失败(P1)** — Linux 桌面用户会收到假的 GOAL 终止。
8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 超过 128 个工具时出现 400 错误(P2)** — 工具作用域管理需要更智能的限制；阻碍重度扩展用户。
9. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — 应避免破坏性行为(P2)** — 在存在更安全选项时，模型仍会使用 `git reset --force`。
10. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC:基于 AST 的文件读取/搜索/映射(P2)** — 长期调研，旨在通过 AST 工具减少轮次和 token 噪音。

## 重点 PR 进展
1. **[#29115](https://github.com/google-gemini/gemini-cli/pull/29115)** — 对 Windows 和 POSIX 的系统级配置路径进行严格的权限/所有权(ACL)检查。
2. **[#29170](https://github.com/google-gemini/gemini-cli/pull/29170)** — 加固了命令安全与文件发现中的工作区边界检查和符号链接解析。
3. **[#29172](https://github.com/google-gemini/gemini-cli/pull/29172)** — 注册 gemini-3.5/3.6/3.7-flash 并将 **gemini-3.8-flash** 提升为默认 flash 模型 — 直接回应 #29164。
4. **[#29171](https://github.com/google-gemini/gemini-cli/pull/29171)** — 为 macOS Seatbelt 沙箱隔离临时目录，使沙箱进程不再共享宿主机 tmp。
5. **[#29116](https://github.com/google-gemini/gemini-cli/pull/29116)** — 缓解 AllowedPathChecker 中 NTFS 8.3 短文件名(SFN)路径穿越绕过问题。
6. **[#29163](https://github.com/google-gemini/gemini-cli/pull/29163)** — 修复 macOS Seatbelt / 受限权限下 git 仓库的启动崩溃。
7. **[#29158](https://github.com/google-gemini/gemini-cli/pull/29158)** — 从 chrome-devtools-mcp 打包产物中移除**硬编码的 Google CrUX API 密钥** — 值得关注的凭据卫生修复。
8. **[#29110](https://github.com/google-gemini/gemini-cli/pull/29110)** — 将 `read_file` 改为通过 FileSystemService 路由，支持 ACP 远程文件系统。
9. **[#29098](https://github.com/google-gemini/gemini-cli/pull/29098)** — 修复 `useInputHistoryStore` 中不纯的 React 状态更新函数(关闭 #29046)。
10. **[#29166](https://github.com/google-gemini/gemini-cli/pull/29166)** — 修复扩展更新回滚失效：备份目录始终为空，导致更新失败时扩展被销毁。

## 功能请求趋势
- **模型可用性与选择**：对选择器中新 Flash 模型的快速需求(#29164、#29172)。
- **Agent 可靠性与可观测性**：通过 `/chat share` 展示子 agent 轨迹(#22598)、在 `/bug` 报告中包含子 agent 上下文(#21763)、准确的终止状态报告(#22323)。
- **基于 AST 的代码库工具**：更好的导航和更少的无效轮次(#22745、#22746)。
- **安全护栏**：避免破坏性 git/数据库操作(#22672)、扩展环境变更需征得同意。
- **更好的子 agent 委派**：模型应主动使用技能/子 agent(#21968)。

## 开发者痛点
- **Agent 假成功/静默失败**：MAX_TURNS 被报告为 GOAL 成功(#22323)、Wayland 浏览器 agent 误报(#21983) — 用户无法信任 agent 状态。
- **挂起与卡死状态**：generalist agent 挂起(#21409)、shell"Waiting input"死锁(#25166)、vite 交互式提示卡住(#22465)。
- **工作区污染**：模型将临时脚本散落在各目录(#23571),使干净提交变得痛苦。
- **记忆系统不成熟**：Auto Memory 无限重试低价值会话(#26522)、静默丢弃无效补丁(#26523),并在脱敏前泄露机密(#26525)。
- **沙箱/Windows 边界情况**：围绕 Seatbelt、NTFS SFN 和 ACL 问题反复出现的 PR 流，表明平台特定的安全缺口是当前维护者的关注重点。

*本期间无讨论数据。*

---

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区周报 — 2026-09-03

## 1. 今日亮点

v1.0.83 系列在 24 小时内发布了两个补丁版本，重点包括自定义 agent 的多模型回退支持(`model` 列表 + `model-policy: required`)、对 claude-fable-5.1 的支持，以及加固后的 Linux 沙箱出站流量限制。与此同时，v1.0.82 上涌现出一批与内存相关的 bug(会话恢复时 OOM、libuv 句柄泄漏、WSL2 上 31 GB RSS),使会话稳定性成为本周最主要的痛点。MCP 可靠性——OAuth token 复用、服务器连接不稳定、协议版本不匹配——也仍是热点领域，有多个活跃的报告。

## 2. 版本发布

- **[v1.0.83-3](https://github.com/github/copilot-cli/releases/tag/v1.0.83-3)** — 常规修复与变更。
- **[v1.0.83-2](https://github.com/github/copilot-cli/releases/tag/v1.0.83-2)** — 重要变更:
  - **新增:** 自定义 agent 可以在 `model` 中列出多个模型，按顺序尝试直至某个可用;`model-policy: required` 将模型选择固定为该列表。支持 `claude-fable-5.1`。
  - **改进:** Linux 沙箱现在将网络出站流量限制为已配置的代理。

过去 24 小时内没有 PR 更新。

## 3. 热门 Issue

1. **[#2630 — 自定义 agent 的 `mcp-servers` 在子 agent/`--prompt` 上下文中未连接](https://github.com/github/copilot-cli/issues/2630)**(已关闭,9 条评论)— 长期存在的 agent bug:自定义 agent 作为子 agent 调用时只获得基础工具。现已解决；对构建模块化 agent 工作流的用户意义重大。
2. **[#3709 — 允许 `/model` 在同一会话内切换模型，包括 BYOK/本地提供商](https://github.com/github/copilot-cli/issues/3709)**(开放,29 👍)— 目前 BYOK 通过 `COPILOT_MODEL` 将会话固定在单一模型上。本期社区需求最高；与新的多模型发布功能直接相关。
3. **[#4664 — 恢复长期会话时 JS 堆 OOM](https://github.com/github/copilot-cli/issues/4664)**(5 条评论)— Node 堆耗尽导致会话无法恢复；#4699 可佐证。
4. **[#4525 — 在现代 `server/discover` 之后发送旧版 `initialize`,导致 -32022](https://github.com/github/copilot-cli/issues/4525)**(5 条评论)— 针对 Python MCP SDK 2.0.0 双时代运行时的 MCP 协议版本协商 bug;阻碍 stdio MCP 的使用。
5. **[#4224 — 子 agent 调用的 OTel span 缺少计费属性](https://github.com/github/copilot-cli/issues/4224)**(4 条评论)— `github.copilot.nano_aiu` / 成本属性缺失,导致外部成本核算低估实际支出。对企业 FinOps 很重要。
6. **[#4438 — `disable-model-invocation: true` 使技能完全不可用](https://github.com/github/copilot-cli/issues/4438)**(4 条评论,6 👍)— 预期的"仅手动"语义未实现;显式 `skill()` 调用返回"Skill not found"。
7. **[#4674 — 会话恢复不还原自定义 agent(#917 的回归)](https://github.com/github/copilot-cli/issues/4674)** — 恢复的会话会静默丢失 agent 的 `mcp-servers` 和工具白名单——一个涉及安全的回归。
8. **[#4695 — MCP OAuth token 不跨会话复用；重复的缓存键强制重新认证](https://github.com/github/copilot-cli/issues/4695)** — 缓存键哈希不稳定导致 HTTP MCP 服务器需要反复进行 OAuth 登录。
9. **[#4692 — 企业默认模型(`MAI-Code-1.1-Flash`)在 CLI 中被拒绝](https://github.com/github/copilot-cli/issues/4692)** — 组织管理的默认模型在 VS Code/Desktop 中可用但 CLI 中不可用；企业模型支持存在差距。
10. **[#4686 — 约 37 分钟后 OOM 崩溃，泄漏 31,965 个 libuv 句柄](https://github.com/github/copilot-cli/issues/4686)** — 资源泄漏,附详细诊断；SEA 构建忽略 `NODE_OPTIONS`,限制了用户的应对手段。

其他值得关注:[#4598 — MCP 启动时 18 个服务器只连接了 3 个，无重试，重载会杀掉存活的句柄](https://github.com/github/copilot-cli/issues/4598);[#4683 — PowerShell ConstrainedLanguage 模式下每条 shell 命令都报虚假错误](https://github.com/github/copilot-cli/issues/4683)。

## 4. 关键 PR 进展

过去 24 小时内没有 pull request 更新。v1.0.83-3 版本("Fixes and changes")推测包含了已合并的工作,但本时段内没有逐 PR 的详细信息。

## 5. 热门讨论

本期没有讨论数据。

## 6. 功能请求趋势

- **会话内模型灵活性**是呼声最高的需求：会话中途切换托管/BYOK/本地模型([#3709](https://github.com/github/copilot-cli/issues/3709))、推理力度 `/effort` 快捷方式(在 9 个 👍 后关闭,[#3074](https://github.com/github/copilot-cli/issues/3074))、按 agent 配置的提供商端点([#4703](https://github.com/github/copilot-cli/issues/4703)),以及 ACP 模式下暴露 `contextTier`([#4275](https://github.com/github/copilot-cli/issues/4275))。
- **配置面扩展:** Windows 上可配置 shell 类型([#2271](https://github.com/github/copilot-cli/issues/2271))、CLI 中支持企业默认模型([#4692](https://github.com/github/copilot-cli/issues/4692)),以及 ACP 模式下遵循 `skillDirectories`([#4700](https://github.com/github/copilot-cli/issues/4700))。
- **修正仅手动技能语义** — `disable-model-invocation` 应表示"仅手动",而非"不可用"([#4438](https://github.com/github/copilot-cli/issues/4438))。

## 7. 开发者痛点

- **长会话上的内存/资源泄漏**(v1.0.82):恢复时 OOM([#4664](https://github.com/github/copilot-cli/issues/4664)、[#4699](https://github.com/github/copilot-cli/issues/4699))、libuv 句柄泄漏([#4686](https://github.com/github/copilot-cli/issues/4686)),以及 WSL2 上 31 GB RSS([#4694](https://github.com/github/copilot-cli/issues/4694))。叠加问题:SEA 构建中忽略 `NODE_OPTIONS`,以及崩溃转储污染用户当前工作目录。
- **MCP 脆弱性：** 协议协商不匹配([#4525](https://github.com/github/copilot-cli/issues/4525))、服务器静默连接失败或会话中途消失([#4598](https://github.com/github/copilot-cli/issues/4598))、OAuth token/缓存键变动强制重新认证([#4695](https://github.com/github/copilot-cli/issues/4695)、[#4203](https://github.com/github/copilot-cli/issues/4203)),以及 `/clear` 泄漏 stdio 子进程([#4697](https://github.com/github/copilot-cli/issues/4697))。
- **压缩失败:** `/compact` 时反复出现"received empty response from model"错误([#2861](https://github.com/github/copilot-cli/issues/2861)、[#4698](https://github.com/github/copilot-cli/issues/4698))。
- **Windows/企业环境差距：** PowerShell ConstrainedLanguage 噪音([#4683](https://github.com/github/copilot-cli/issues/4683))、路径分隔符去重 bug([#4702](https://github.com/github/copilot-cli/issues/4702))、审批预览被截断([#4701](https://github.com/github/copilot-cli/issues/4701)),以及代理相关的 OAuth 回归问题已在 [#4671](https://github.com/github/copilot-cli/issues/4671) 中修复。
- **状态恢复可靠性：** 恢复的会话丢失自定义 agent([#4674](https://github.com/github/copilot-cli/issues/4674)),以及空闲后 `allow-all` 权限丢失([#4696](https://github.com/github/copilot-cli/issues/4696))。

---

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

⚠️ 摘要生成失败。

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
*本日报由 [agents-radar](https://github.com/lijiaming325-arch/agents-radar) 自动生成。*