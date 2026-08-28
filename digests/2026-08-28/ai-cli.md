# AI CLI 工具社区动态日报 2026-08-28

> 生成时间: 2026-08-28 15:10 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比报告 — 2026-08-28

## 1. 生态概览

AI CLI 生态仍处于快速发布阶段，四个受追踪的工具（Claude Code、OpenAI Codex、GitHub Copilot CLI、OpenCode）在过去 24 小时内均有版本发布。所有社区存在两大共同主题：**多智能体编排的可靠性**（子智能体委派、完成即唤醒、并行运行的稳定性）和**企业级信任**（沙箱、审批策略、可审计性、面向数据驻留租户的身份认证）。Windows 在所有生态中依然是最薄弱的平台，其启动、打包和更新流水线贡献了最高流量的 issue。值得注意的是，三个仓库（Gemini CLI、Pi、Qwen Code）今日没有可用的摘要数据，因此本报告仅覆盖四个活跃生态。

## 2. 活跃度对比

| 工具 | Issues（24h 信号） | PR（24h） | Discussions | 发布 |
|---|---|---|---|---|
| **Claude Code** | 约 10 个热门 issue（2 个已关闭，含 #86275） | 0 个更新 | 无（未报告） | 2 个（v2.1.248、v2.1.250） |
| **OpenAI Codex** | 约 10+ 个热门 issue（最多 37 条评论） | 10+ 个已合并/更新 | 活跃（Ideas/Q&A/Show-and-tell，4 个话题） | 2 个（v0.151.0-alpha.7/.8） |
| **GitHub Copilot CLI** | 约 10 个热门 issue（大量分类处理） | 0 个更新（近期合并已包含在 v1.0.81） | 无（未报告） | 2 个（v1.0.81 GA、v1.0.82-0 预发布） |
| **OpenCode** | 约 10 个热门 issue + 当日 bug 爆发 | 10 个 PR（多个当日合并） | 无（在 issue 中讨论） | 2 个（v1.18.24、v1.18.25） |
| **Gemini CLI** | 无 — 无摘要数据 | 无 | 无 | 无 |
| **Pi** | 无 — 无摘要数据 | 无 | 无 | 无 |
| **Qwen Code** | 无 — 无摘要数据 | 无 | 无 | 无 |

## 3. 共同的功能方向

- **多智能体编排体验** — Claude Code（委派至已有的 tmux 会话，#86338）、Codex（子智能体完成即唤醒，#15723；service-tier 传递，#41308）、Copilot CLI（并行子智能体下的 TUI 冻结，#4533）、OpenCode（子智能体 ID 可发现性，#36761）。四家都在向智能体工作流收敛，而四家在这方面都存在可靠性缺口。
- **执行透明度与可审计性** — Codex 的头号需求是不折叠的命令输出（#39903，👍63）；Copilot CLI 希望获得带模型来源的可验证审查记录（#4621）；Claude Code 用户希望转录不含幻觉内容（#79293）。对智能体行为的审计是普遍诉求。
- **长时间运行 / 非交互运行** — Claude Code `--restricted` 模式（v2.1.248）、Codex 5 小时限制冲突（#40905）、Copilot CLI `-p` 在 GHEC 上出现 401（#4527）、OpenCode 静默卡死（#32149）。自动化在所有生态中都是一等用例，但工具链和速率限制尚未跟上。
- **静默失败 / 失败不报错行为** — Claude Code 队列输入数据丢失（#85924）、Copilot CLI 静默丢弃模型参数（#4645）、OpenCode pre-runner 失败仅写入日志（#45959）。用户一致要求投递保证和可见的错误信息。
- **成本/用量透明度** — Codex 用量流失投诉（#40067）、OpenCode 用量百分比错误（#45858）以及在选择器中显示成本的请求（#14524）、Copilot CLI 工具搜索 token 消耗削减（#4649）。账单与上下文成本方面的信任正在各厂商间流失。
- **升级/回归折腾** — Claude Code 的斜杠自动补全回归（#90102）、Codex 更新后工具消失（#41145）与配置硬性损坏（#39973）、Copilot CLI 在一个小版本更新中破坏 chroma-mcp（#4647）。每个生态都需要更好的发布把关和回滚机制。

## 4. 差异化分析

- **Claude Code** — 聚焦安全边界（`--restricted` 沙箱、设置隔离）与桌面/IDE 打磨；面向安全敏感的部署场景和 CI。发布纪律严格，但 Linux 和 Windows 桌面端测试薄弱。
- **OpenAI Codex** — 工程投入最深：Guardian 审批审查强化、MCP 工具缓存正确性修复、统一 CLI/Desktop 的 app-server v2 架构。PR 节奏最活跃（20+ 次合并）。面向复杂多智能体和远程/移动工作流；Windows 打包是其致命弱点。
- **GitHub Copilot CLI** — 企业优先：GHEC 数据驻留、托管设置、OpenTelemetry 钩子、所有客户端均支持 MCP 2026-07-28 规范。弱点是 fail-closed 行为和预发布渠道稳定性——这恰恰对其企业用户群体构成了不友好的失败模式。
- **OpenCode** — 社区驱动程度最高（贡献者当日落地修复，issue 提交者亲自提交 PR），成本透明度也最高。提供广泛的供应商灵活性（Azure Entra ID、Bedrock、Kimi）；但 V1→V2 过渡中的迁移失败和 beta 不稳定性带来了平台风险。

## 5. 社区势头与成熟度

- **迭代最快：** Codex 和 OpenCode，各自在 24 小时内合并/更新了 10+ 个 PR 并发布了两个版本。OpenCode 展现出最健康的社区贡献循环。
- **稳定的企业节奏：** Claude Code 和 Copilot CLI 发布了新版本但报告的 PR 活动为零——由分类驱动的一天，暗示代码库成熟但节奏较慢，或处于合并浪潮之间的间歇期。
- **最高的参与度信号：** Codex #40700（37 条评论）和 #39903（👍63）；OpenCode #6536（👍50）；Claude Code #86275（15 条评论）。Codex 拥有最大的原始社区声量；OpenCode 在单个 issue 上的热情最强。
- **数据缺口：** Gemini CLI、Pi 和 Qwen Code 的摘要未能生成——今日无法评估其势头；应视为未知，而非不活跃。

## 6. 趋势信号

1. **智能体工作流正在超越基础设施。** 每个工具的首要痛点都涉及多智能体运行（委派、异步完成、并行 TUI 稳定性、编排超时）。基于这些工具构建的团队应预计编排层的动荡至少持续到年底。
2. **安全模型正在被正式化——但进度不均。** Claude Code 推出 `--restricted`；Codex 强化 Guardian 审查和终端权限；Copilot CLI 以 fail-closed 方式强制托管设置（或许过于激进）。反观 Codex 移除未标记弃用的 `approval_policy`（#39973），表明安全相关的变更仍会在没有迁移路径的情况下落地——请锁定版本并在预发布环境中测试升级。
3. **Windows 是跨生态的薄弱点。** 启动失败、打包（AppX）、更新后重启以及输入类 bug 在各处的 Windows 报告中占主导。Windows 优先的团队应在工具选型中把这一点纳入考量。
4. **用量/账单信任正在成为竞争因素。** 疑似计费回归（Codex #40067）和误导性限额（OpenCode #45897）映射了消费级 SaaS 的动态；预计透明度（选择器内成本显示、用量 API）将成为基本门槛。
5. **给开发者的实用建议：** (a) 在长时自主运行前，优先选择支持原子化认证/配置写入并提供回滚路径的工具；(b) 不要轻信静默的成功——增加转录/审计验证；(c) 对于 CI，Claude Code 的 `--restricted` 和 Copilot CLI 的托管设置是目前最明确的沙箱方案；(d) 对于多供应商灵活性和成本可见性，OpenCode 目前领先。

---

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills 摘要生成失败。

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

# OpenAI Codex 社区周报 — 2026-08-28

## 1. 今日要点

仓库在 0.151.0 线上发布了两个 alpha 版本（`alpha.7`、`alpha.8`），同时合并节奏密集，超过 20 个 PR，重点投入在 Guardian 审批/审查安全逻辑以及 MCP 工具缓存处理上。社区关注焦点仍然集中在 Windows Desktop 的稳定性上——热门问题中有四个涉及启动失败、app-server 崩溃或 Windows 上的更新问题——另一个焦点则是一项颇具争议的配置破坏性变更：`approval_policy = "untrusted"` 在没有任何弃用提示的情况下被直接移除。

## 2. 发布

- **[rust-v0.151.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.8)** 和 **[rust-v0.151.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.7)** — 0.151.0 系列中的两次快速 alpha 迭代，据推测打包了今天合并的一批 MCP 缓存、Guardian 审查以及历史后端修复。未提供详细的发布说明。

## 3. 热门 Issue

1. **[#40700](https://github.com/openai/codex/issues/40700)** — *Windows Desktop 无法启动：内置的 codex.exe 从 WindowsApps 迁移失败*（37 条评论）。Windows 的 AppX 打包机制阻止内置二进制文件迁移，导致完全无法启动。今日流量最高的 issue；属于 Windows Desktop 启动失败系列问题之一。
2. **[#39903](https://github.com/openai/codex/issues/39903)** — *增加禁用 "Ran N commands" 折叠显示的选项*（35 条评论，👍 63）。用户希望完整查看已执行命令，而不是折叠后的摘要。今天最强的 👍 与评论比信号；明确表达了对 UX 透明度的诉求。
3. **[#31987](https://github.com/openai/codex/issues/31987)** — *自动充值开关总是被自动重新启用*（20 条评论）。一个长期存在的计费/UX 投诉：自动充值开关会被悄悄重新打开。自 7 月以来持续存在，至今未解决。
4. **[#15723](https://github.com/openai/codex/issues/15723)** — *后台子进程/子代理完成时无法唤醒调用方代理*（19 条评论）。3 月遗留的异步代理编排架构缺口，随着 agentic 工作流的增长，该问题日益凸显。
5. **[#39973](https://github.com/openai/codex/issues/39973)** — *在无弃用流程的情况下移除 `approval_policy="untrusted"` 削弱了执行审批边界*（11 条评论，👍 30）。Codex 0.149.0 对该配置直接硬性报错且没有迁移路径，批评者认为其替代方案削弱了安全模型。无论从安全性还是开发者体验角度来看，都引发了社区的高度共鸣。
6. **[#24047](https://github.com/openai/codex/issues/24047)** — *Windows Desktop 更新安装后不会重新启动*（13 条评论）。持续五个月的更新后重启 bug 依然活跃——堪称 Windows 更新流水线问题的典型代表。
7. **[#39678](https://github.com/openai/codex/issues/39678)** / **[#40002](https://github.com/openai/codex/issues/40002)** — *Android Remote 因项目信任错误而失败*（12 / 9 条评论）。从 Android 发起的远程会话在对 macOS 和 Windows 主机进行信任验证时分别失败；#40002 具体是 Windows 路径查找中大小写敏感的 bug。远程工作流是信任/路径类 bug 增长最快的领域。
8. **[#39280](https://github.com/openai/codex/issues/39280)** — *macOS：Chrome 标签页可被接管，但每个真实页面操作都无法通过策略验证*（10 条评论），与之配套的回归问题是 **[#39972](https://github.com/openai/codex/issues/39972)** — *浏览器控件不再工作*。两份并行报告表明浏览器使用功能在 macOS 上已实质性损坏。
9. **[#40905](https://github.com/openai/codex/issues/40905)** — *5 小时用量限制中断长时间运行的 GPT-5.6 Sol 代理任务*（8 条评论）。滚动用量窗口与长达数小时的自主运行相冲突；随着代理运行时长增加，这一产品策略问题正获得越来越多的关注。
10. **[#40067](https://github.com/openai/codex/issues/40067)** — *GPT-5.6 Plus 每周用量在数小时内从约 99% 骤降至 0%*（7 条评论）。疑似用量统计回归；结合 #40905 来看，速率限制的信任度正成为日益增长的失望主题。另值得关注：**[#41145](https://github.com/openai/codex/issues/41145)** 报告更新到 0.150.1 后 shell 执行工具消失——请留意后续是否出现更多回归报告。

## 4. 关键 PR 进展

1. **[#41344](https://github.com/openai/codex/pull/41344)** / **[#41336](https://github.com/openai/codex/pull/41336)** — *绑定捕获期间的 MCP 工具缓存处理*（两个互补修复）。确保在绑定等待多个 MCP 服务器时，刷新后和缓存的工具目录都能被正确处理，从而避免新可用的工具在首次模型请求中被遗漏。
2. **[#41309](https://github.com/openai/codex/pull/41309)** — *复用 Guardian 分数时遵守所需审查要求*。修复了一个真实的安全漏洞：缓存的低风险分数可能让某个操作在模型切换后绕过所需的完整审查。属于今天 Guardian 安全加固浪潮的一部分（另见 [#41322](https://github.com/openai/codex/pull/41322)）。
3. **[#41328](https://github.com/openai/codex/pull/41328)** — *根据保留权限审查终端输入*。`write_stdin` 调用现在会考虑终端启动时所拥有的沙箱/授权，封堵了权限漂移缺口。
4. **[#41308](https://github.com/openai/codex/pull/41308)** — *子代理遵循根代理的服务层级*。服务层级选择现在会传播到整个代理树，包括远程压缩——对任何运行带层级路由的多代理工作流的用户都值得关注。
5. **[#41243](https://github.com/openai/codex/pull/41243)** — *sleep 工具的可配置门控*。新增稳定的 `sleep_tool` 功能开关（`model_driven` / `always_on`），将 sleep 工具与时钟工具解耦——这表明内置工具集正朝着更模块化、更可配置的方向发展。
6. **[#41239](https://github.com/openai/codex/pull/41239)** — *展示认证恢复进度*。新增 `modelProvider/authRecoveryStarted`/`Completed` 事件，使客户端能够显示凭证刷新状态，而不是看起来像卡死。
7. **[#41292](https://github.com/openai/codex/pull/41292)** — *将历史记录中的图片转发给模型*。历史记录中的图片附件现在会转换为 `input_image` 条目，并包含对畸形附件的拒绝处理和日志脱敏。
8. **[#41260](https://github.com/openai/codex/pull/41260)** — *历史后端强制执行工具输出预算*。移除了多余的客户端侧截断逻辑，该逻辑可能拒绝本已符合大小限制的响应——修复了工具结果偶发失败的问题。
9. **[#41313](https://github.com/openai/codex/pull/41313)** — *将 HTTP 重试退避与过载集成测试解耦*。重试/退避现在在暂停的 Tokio 时间下验证；提升了过载处理测试的可靠性。
10. **[#10192](https://github.com/openai/codex/pull/10192)** — *将 TUI 迁移到 app-server v2*（长期进行中，今日更新）。Bolinfest 的这一架构性工作——让 TUI 使用 app-server 协议——在约 7 个月后依然活跃，是统一 CLI 和 Desktop 至同一服务器的基础工作。

## 5. 热门讨论

**想法（Ideas）**
- **[#25630](https://github.com/openai/codex/discussions/25630)** — *切换账号*：请求提供一键切换账号的功能，而非完整的登出/登录流程。

**问答（Q&A）**
- **[#40740](https://github.com/openai/codex/discussions/40740)** — *rollout 追踪是否能捕获是哪个路径产生了 Declined 执行状态？* 深入探讨 `rollout/src/policy.rs` 中审批/拒绝事件的持久化语义——对任何基于 rollout 追踪构建工具的人都有参考价值。
- **[#41314](https://github.com/openai/codex/discussions/41314)** — *codex*：用中文询问 Codex 桌面宠物的进展——另见今日的宠物 bug [#41306](https://github.com/openai/codex/issues/41306)。

**展示（Show and tell）**
- **[#41319](https://github.com/openai/codex/discussions/41319)** — *Click*：grapefruit0205 开发的一款开源 Codex 插件，用于阻止代理在工作已完成后重新规划流程和过度验证——这是生态系统对代理效率抱怨的一次有趣回应。

## 6. 功能请求趋势

- **执行透明度**：呼声最高的请求（👍 63）是展示完整命令输出而非折叠摘要（[#39903](https://github.com/openai/codex/issues/39903)）——用户希望对代理行为进行审计。
- **异步代理编排**：子代理完成时唤醒（[#15723](https://github.com/openai/codex/issues/15723)）以及更长时间不被打断的代理运行（速率限制缓解，[#40905](https://github.com/openai/codex/issues/40905)）反映出对长时间自主工作流的需求。
- **安全策略清晰度**：社区希望审批策略有正规的弃用/迁移路径，而不是硬性破坏（[#39973](https://github.com/openai/codex/issues/39973)）。
- **账号/计费控制**：账号切换（[#25630](https://github.com/openai/codex/discussions/25630)）和自动充值设置不保持（[#31987](https://github.com/openai/codex/issues/31987)）持续被反复提及。
- **可配置的内置工具**：`sleep_tool` 门控 PR（[#41243](https://github.com/openai/codex/pull/41243)）表明团队已经在朝着用户可调节的工具注册方向迈进。

## 7. 开发者痛点

- **Windows Desktop 是最主要的痛点**：AppX 迁移导致的启动失败（[#40700](https://github.com/openai/codex/issues/40700)、[#41096](https://github.com/openai/codex/issues/41096)）、更新后无法重启（[#24047](https://github.com/openai/codex/issues/24047)）、启动循环（[#39364](https://github.com/openai/codex/issues/39364)）、工具调用期间 app-server 崩溃（[#40400](https://github.com/openai/codex/issues/40400)），以及 node.exe 访问冲突（[#40913](https://github.com/openai/codex/issues/40913)）。Windows 更新/打包流水线需要系统性的关注。
- **远程/跨设备信任机制脆弱**：Android 到桌面的会话反复无法通过项目信任验证（[#39678](https://github.com/openai/codex/issues/39678)、[#40002](https://github.com/openai/codex/issues/40002)），移动端 SSH 会话也无法实时同步（[#29094](https://github.com/openai/codex/issues/29094)）。
- **速率限制可靠性**：用量骤降（[#40067](https://github.com/openai/codex/issues/40067)）和任务中途被打断（[#40905](https://github.com/openai/codex/issues/40905)）正在侵蚀用户对用量统计的信心。
- **升级回归**：CLI 更新后工具消失（[#41145](https://github.com/openai/codex/issues/41145)）、配置无迁移路径的硬性破坏（[#39973](https://github.com/openai/codex/issues/39973)），以及 macOS 浏览器扩展回归（[#39972](https://github.com/openai/codex/issues/39972)）——用户希望有更好的发布门控和回滚机制。
- **会话/状态治理**：过期会话（[#24217](https://github.com/openai/codex/issues/24217)）、无法删除的线程（[#39897](https://github.com/openai/codex/issues/39897)、[#40313](https://github.com/openai/codex/issues/40313)），以及批量删除无效（[#28298](https://github.com/openai/codex/issues/28298)）等问题在各平台上持续出现。

---

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-08-28

## 1. 今日要点

插件仪表盘在 v1.0.81 中正式发布(通过 `/plugin`、`/mcp`、`/skills` 访问),同时 MCP 2026-07-28 规范支持已在 CLI、SDK、IDE 及内存客户端中全面落地。然而,发布周期正显现稳定性压力:GHEC 数据驻留租户上的一组企业级认证回归,以及多种 TUI/运行时故障模式(FileWatch 循环失控、并行子代理运行时 UI 冻结)占据了今天社区关注的焦点。过去 24 小时内没有任何 PR 更新,尽管 issue 分诊流量很大,但已合并活动明显处于低谷。

## 2. 发布

- **v1.0.82-0** — 预发布版本；仅有"Fixes and changes"(无详细更新日志)。
- **v1.0.81**(2026-08-27):
  - 插件仪表盘现已向所有用户开放 — 运行 `/plugin`、`/mcp` 或 `/skills` 即可使用。可通过 `PLUGINS_DASHBOARD=false` 退出(该设置同时会禁用 `copilot plugins` 命令)。
  - MCP 2026-07-28 规范支持已发布至 CLI、SDK、IDE 及内存客户端。
  - Hooks 现在可以接收当前的 OpenTelemetry 上下文。

## 3. 热门 Issue

1. **[#4480 — Atlassian MCP OAuth 报错 "Incompatible authorization server (RFC 8414 §3.3)"(已关闭)](https://github.com/github/copilot-cli/issues/4480)** — 本周期互动最高的 issue(7 条评论,👍6)。1.0.71 引入的回归破坏了对 Atlassian 的远程 MCP OAuth issuer 验证；现已关闭，很可能由 v1.0.81 中的 MCP 2026-07-28 规范支持修复。

2. **[#4612 — FileWatch 主机事件循环失控导致 TUI 冻结，调试日志膨胀至 13 GB(开放中)](https://github.com/github/copilot-cli/issues/4612)** — 严重问题：长时间运行或恢复的会话会进入紧密的 "No connection accepted a host event" 循环，冻结终端并将日志膨胀至 13 GB。关键的稳定性报告。

3. **[#4535 — `store_memory` 在 v1.0.81 预发布版本中失败："Instance id is required"(开放中)](https://github.com/github/copilot-cli/issues/4535)** — 预发布版本中原生内存写入器缺少实例 ID,导致内存工具完全不可用。7 条评论，调试正在进行中。

4. **[#4527 — 自 1.0.81-1 起，GHEC 数据驻留下 `copilot -p` 返回 401(开放中)](https://github.com/github/copilot-cli/issues/4527)** — 提示模式的模型目录请求打到了 `api.githubcopilot.com` 而非租户端点。交互模式正常，仅 `-p` 失效。👍4 — 属于今天企业认证回归集群的一部分(另见 #4650、#4654)。

5. **[#4533 — 回合生成并行子代理时 TUI 停止消费事件(开放中)](https://github.com/github/copilot-cli/issues/4533)** — 输入和滚动全部失灵，而 Rust 运行时仍在继续处理；结果要等几分钟后才能恢复。指向 UI 层事件循环背压 bug。

6. **[#4647 — v1.0.81 破坏了与 chroma-mcp 的兼容性(开放中)](https://github.com/github/copilot-cli/issues/4647)** — 1.0.80→1.0.81 的新发回归，影响 stdio MCP 服务器配置；延续了 MCP 传输层变更干扰第三方服务器的一贯模式。

7. **[#4602 — `store_memory` 失败且 MCP 服务器被剥离:`managedSettings` 在 `serverFetchFailed` 抖动时默认失败(开放中)](https://github.com/github/copilot-cli/issues/4602)** — 论证充分的 issue,将多个开放报告归因于单一根因：托管设置获取抖动引发 fail-closed 行为，彻底杀死了内存和 MCP 功能。

8. **[#4639 — 事件存储耗尽引发重试风暴，会话陷入 GC/压缩循环并导致 Node OOM(开放中)](https://github.com/github/copilot-cli/issues/4639)** — 导出器在存储已耗尽的情况下仍重试 500 条事件的批量刷新，引发内存压力和数千次桥接确认。需要退避/熔断逻辑。

9. **[#4486 — 编辑权限请求"超时"(开放中)](https://github.com/github/copilot-cli/issues/4486)** — 权限提示现在若未立即回应就会过期，破坏了通宵运行和多会话工作流。由 dscho(Git 维护者)提交 — 值得关注的信号。

10. **[#4649 — 工具搜索在 Grok 上报告已启用但实际未推迟任何内容；Gemini 则从未启用(开放中)](https://github.com/github/copilot-cli/issues/4649)** — 已关闭的 #4588 的后续。令牌削减修复仅对 GPT 生效(43.1k → 21.0k tokens);Grok 静默空操作，Gemini 则从不激活。对跨模型家族的成本/延迟一致性至关重要。

## 4. 重要 PR 进展

过去 24 小时内没有 pull request 更新。最新发布中体现的重要已合并工作：

1. **插件仪表盘 GA** — `/plugin`、`/mcp`、`/skills` 入口已在 v1.0.81 中向所有用户发布，并支持通过 `PLUGINS_DASHBOARD=false` 退出。
2. **MCP 2026-07-28 规范支持** — 已在 CLI、SDK、IDE 及内存客户端中统一发布。
3. **Hooks 接收 OpenTelemetry 上下文** — hooks 现在可获取当前的 OTel 追踪上下文，使 hook 脚本中的可观测性关联成为可能。

## 5. 热门讨论

本期间没有提供讨论数据。

## 6. 功能请求趋势

- **会话易用性**:`--name` 应在单个参数中实现创建或恢复([#4642](https://github.com/github/copilot-cli/issues/4642));`session.resume` 应遵循传入的 `model` 参数([#4645](https://github.com/github/copilot-cli/issues/4645))。
- **可审计性与记录**：包括模型来源在内的可验证、持久的 rubber-duck/agent 审查记录([#4621](https://github.com/github/copilot-cli/issues/4621))。
- **配置工具化**：为 `settings.json` 提供官方 JSON Schema 以支持编辑器校验([#4641](https://github.com/github/copilot-cli/issues/4641),👍2)。
- **成本/令牌效率**：将工具搜索推迟机制扩展至 Grok 和 Gemini,而不仅限于 GPT([#4649](https://github.com/github/copilot-cli/issues/4649))。
- **模型/压缩透明度**：准确的上下文窗口报告(#4638),有意义的压缩检查点(#4643)。
- **BYOK 打磨**：BYOK 模式下缺少 `/model` 命令(#4651),表明对自定义提供商支持的需求正在增长。

## 7. 开发者痛点

- **企业/GHEC 认证脆弱性**：一组回归(#4527、#4650、#4654),提示模式(`-p`)和 `--agent` 流程命中非企业端点并返回 401。企业用户目前无法进行非交互式自动化 — 本周期影响最大的痛点。
- **预发布通道不稳定**：并行子代理运行时 TUI 冻结(#4533)、FileWatch 循环失控并产生 13 GB 日志(#4612)、事件存储重试风暴导致 OOM(#4639)。长时间运行和恢复的会话受到的影响尤为严重。
- **升级导致 MCP 生态破坏**:OAuth 回归(#4480)、1.0.81 中 chroma-mcp 损坏(#4647),以及 fail-closed 的托管设置剥离所有 MCP 服务器(#4602)。用户报告每个次版本发布都可能静默破坏服务器配置。
- **内存/上下文子系统缺陷**:`store_memory` 因实例 ID 失败(#4535),以及上下文仅约 20% 时过早压缩且无检查点记录(#4643),动摇了用户对长会话工作流的信任。
- **静默失败行为**:`session.resume` 无报错地丢弃 model 参数(#4645)、市场注册静默中止(#4556)、steering 消息跳过 hooks(#4640)— "操作无反馈"是反复出现的主题。
- **Windows/本地化缺口**：AltGr 按键输入被吞掉(#4653)、Windows 25H2 上沙箱不支持的警告(#4652),Windows 平台摩擦仍在持续。

*摘要生成于 2026-08-28。数据来源:github.com/github/copilot-cli(issues #4480–#4654,版本 v1.0.81/v1.0.82-0)。*

---

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

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [agents-radar](https://github.com/lijiaming325-arch/agents-radar) 自动生成。*