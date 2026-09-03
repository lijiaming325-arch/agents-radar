# AI 基础设施日报 2026-09-03

> 生成时间: 2026-09-03 00:32 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目 AI 基础设施摘要 — 2026-09-03

## 1. 生态概览

本期摘要存在覆盖率缺口：6 个跟踪项目中有 5 个（vLLM、SGLang、llama.cpp、LiteLLM、Unsloth）的摘要生成失败，因此跨项目的定量对比仅限于 **Ollama**。话虽如此，仅 Ollama 的活跃度本身就是本地推理层的有效信号：Apple Silicon（MLX）的同等功能适配工作正在加速，可观测性（缓存 token 与按设备 VRAM 上报）正在向企业级推理引擎看齐，而云混合端点正在成为一级但仍然脆弱的产品界面。本地引擎与"Ollama Cloud"对第三方 API（DeepSeek、GLM）的代理之间的张力，如今已成为该项目最首要的稳定性战场。

## 2. 活跃度对比

| 项目 | Issues | PRs | 发布 | 摘要状态 |
|---|---|---|---|---|
| **Ollama** | ~10 个活跃（含 #17892、#18193、#18094、#18038） | ~12 个已合并/开放（含 #17650、#18079、#17943、#18197/#18201、#18199） | 24 小时内无 | ✅ 完整 |
| vLLM | — | — | — | ⚠️ 失败 |
| SGLang | — | — | — | ⚠️ 失败 |
| llama.cpp | — | — | — | ⚠️ 失败（间接信号：b10760 更新已通过 Ollama #18199 落地；其主线存在 CPU 回归问题 #18038） |
| LiteLLM | — | — | — | ⚠️ 失败 |
| Unsloth | — | — | — | ⚠️ 失败 |

*建议：在得出相对速度结论之前，重新运行摘要生成。*

## 3. 模型支持竞赛

- **Ollama（通过 MLX 引擎）**：Gemma4 视觉 + 音频（图像预处理、vision tower + 免编码器检查点、conformer 音频）— PR #17650/#18079，关闭 #17065 及元数据滞后问题 #16700。此外还有针对 Qwen3.8 Flash Next 的量化调优（BF16 QSA/MTP 路径，其余部分使用 MXFP8 — #18078）。
- **被请求但尚未支持**：SparkLLM Spark-X2.5 4B/1.7B（#18195）— 可以下载但无法运行。
- **llama.cpp**：b10760 集成已在 Ollama 落地；上游主线存在 macOS CPU 回归。
- **云端模型（非本地提供）**：deepseek-v4-flash、glm-5.3 / GLM 5.3-Flash — 存在质量/稳定性注意事项（见“趋势信号”）。
- 其他：今日无数据。

**领先者（基于现有数据）**：Ollama/MLX，得益于 Apple Silicon 上快速的多模态同等功能适配 — 但上游模型支持仍受限于 llama.cpp 的更新节奏。

## 4. 性能前沿

从今日数据来看，主要集中在**运行时插桩与量化策略**，而非奇异的内核优化：

- **量化**：精细的逐层精度正在取代一刀切的低位量化 — Qwen3.8 Flash Next 将 QSA/MTP 保持在 BF16，因为 NVFP4 会导致长文本生成质量下降（#18078）。预计这种选择性精度模式将扩散开来。
- **可观测性作为优化使能器**：缓存提示 token 计数（#17943）与按设备 VRAM 上报（#18197/#18201，以及基于架构维度预测 VRAM 的进行中工作 #18198）— 这是预填充成本与放置优化的基础设施。
- **并行解锁**：在上游 llama.cpp 崩溃修复后，Qwen35 解除了 `numParallel=1` 的限制（#17144）— 本地并发在上游仍是一个软性约束。
- **回归监控**：在 llama.cpp main 上，M4 Max 生成期间 CPU 占用约 560%（#18038）— 这提醒我们，消费级硬件的性能回归总是最先在本地运行时层暴露。

## 5. 层级定位

| 层级 | 项目 | 今日信号 |
|---|---|---|
| **推理引擎**（高吞吐、集群） | vLLM、SGLang | 今日无数据 — 通常是分页 KV 缓存、连续批处理、分离式预填充的前沿 |
| **本地运行时** | llama.cpp、Ollama（llama.cpp + MLX 后端） | 多模态同等功能适配、VRAM 可观测性、量化调优 |
| **网关 / 路由** | LiteLLM、Ollama Cloud | Ollama 的云代理暴露出网关层故障模式：提示/工具处理引发的推理死循环、182 秒硬超时、能力元数据漂移 |
| **训练 / 微调** | Unsloth | 今日无数据 |

值得注意的是，Ollama 正同时横跨**本地运行时 + 网关** — 这种混合定位正是其当前大部分稳定性债务的来源（云端死循环 #17892、#18193；超时 #18190、#15973；网关配置失败 #18188）。

## 6. 趋势信号

1. **Apple Silicon 上的多模态已蓄势待发，接近生产级。** MLX 上的 Gemma4 视觉/音频意味着本地智能体无需 NVIDIA 即可实现多模态 — 由于元数据滞后，请通过 `ollama show` 验证能力。
2. **选择性量化 > 激进量化。** NVFP4 导致质量下降的发现（Qwen3.8 Flash）表明，应对长文本生成工作负载上的厂商默认量化方案进行审计。
3. **网关卫生是生产风险。** 测试的两个 Ollama Cloud 模型均出现了厂商原生 API 中不存在的推理死循环。**开发者行动**：为云端端点加上自己的轮次级超时（<182 秒），在智能体循环中优先使用 deepseek-v4-flash/glm-5.3 的厂商 API，并在结构化输出上增加防御性 JSON 校验 + 重试（#18094）。
4. **Token 级别的成本可观测性正在成为基本要求。** OpenAI/Anthropic 兼容的本地 API 中出现缓存 token 字段，意味着提示缓存命中仪表盘应当立即着手构建。
5. **从源码构建的风险是真实存在的**：请锁定到带标签的发布版本；llama.cpp main 存在活跃的 CPU 回归。

**注意事项**：由于流水线故障，本报告实际上是一次 Ollama 深度剖析。在使用第 2–4 节进行厂商选型决策之前，请为 vLLM/SGLang/LiteLLM/Unsloth 重新生成摘要。

---

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-03

## 1. Today's Highlights

No new releases in the last 24 hours, but activity on the MLX engine dominated: the Gemma4 vision/audio gap on MLX ([#17065](https://github.com/ollama/ollama/issues/17065)) was closed via PRs [#17650](https://github.com/ollama/ollama/pull/17650) and [#18079](https://github.com/ollama/ollama/pull/18079), and a llama.cpp version bump to b10760 landed ([#18199](https://github.com/ollama/ollama/pull/18199)). On the cloud side, recurring "endless reasoning" loops on deepseek-v4-flash and glm-5.3 remain the top stability concern for agent users. A wave of observability work landed — cached prompt token reporting ([#17943](https://github.com/ollama/ollama/pull/17943)) and per-device VRAM reporting ([#18197](https://github.com/ollama/ollama/pull/18197), [#18201](https://github.com/ollama/ollama/pull/18201)).

## 2. Releases & Breaking Changes

None in the last 24h. Note a planned change in scope: PR [#14969](https://github.com/ollama/ollama/pull/14969) moves MLX imports server-side and drops GGUF conversion (GGUF create will be limited to wrapping existing files), and [#17425](https://github.com/ollama/ollama/pull/17425) moves model-creation flows to a new `create` scope — watch both for migration implications.

## 3. New Model & Hardware Support

- **Gemma4 MLX vision + audio**: PRs [#17650](https://github.com/ollama/ollama/pull/17650) and [#18079](https://github.com/ollama/ollama/pull/18079) (merged) add image preprocessing/vision embeddings (both `vision_tower.*` and encoder-free `vision_embedder.*` checkpoints) and audio (e2b/e4b conformer) to MLX-served Gemma4 — fixing #17065 and capability-mismatch issue [#16700](https://github.com/ollama/ollama/issues/16700).
- **spark2_5 architecture requested**: SparkLLM/Spark-X2.5-4B/1.7B currently downloads but cannot run ([#18195](https://github.com/ollama/ollama/issues/18195)).
- **Qwen3.8 Flash Next quantization tuning**: [#18078](https://github.com/ollama/ollama/pull/18078) keeps QSA projections and non-expert MTP path in BF16, MXFP8 elsewhere, instead of blanket NVFP4 which degraded long generations.

## 4. Performance & Optimization

- **Cached prompt tokens exposed**: [#17943](https://github.com/ollama/ollama/pull/17943) adds `prompt_eval_cached_count` and OpenAI/Anthropic-compatible cached-token fields (closing long-standing #8008). Key for prefill cost analysis.
- **Per-device VRAM reporting**: [#18197](https://github.com/ollama/ollama/pull/18197) (with bug fixes) and [#18201](https://github.com/ollama/ollama/pull/18201) surface which card a model lands on via `/api/ps` and a new `/api/info` endpoint.
- **VRAM prediction from head dims**: WIP [#18198](https://github.com/ollama/ollama/pull/18198) predicts single-GPU VRAM from published architecture dimensions.
- **Regression to watch**: llama.cpp consuming ~560% CPU on M4 Max during token generation on latest main ([#18038](https://github.com/ollama/ollama/issues/18038)).
- **Qwen35 parallelism**: [#17144](https://github.com/ollama/ollama/pull/17144) proposes lifting the hardcoded `numParallel=1` blocklist now the upstream llama.cpp crash is fixed.

## 5. Stability & Regressions

Ranked by severity:

1. **Cloud endless-reasoning loops** — deepseek-v4-flash repeats thinking blocks indefinitely (221× in one session, [#17892](https://github.com/ollama/ollama/issues/17892)); glm-5.3:cloud does the same in OpenCode/ZCode while the official Z.AI API works ([#18193](https://github.com/ollama/ollama/issues/18193)); GLM 5.3-Flash users also see timeout errors ([#18190](https://github.com/ollama/ollama/issues/18190)). Compounded by the unresolved 182s hard cloud timeout ([#15973](https://github.com/ollama/ollama/issues/15973), closed). No fix PRs yet — likely gateway-side prompt/tool handling.
2. **MLX error swallowing fixed** — [#18052](https://github.com/ollama/ollama/pull/18052) (merged) checks every fallible mlx-c call; previously failed ops continued with null arrays and lost error messages. Also [#18196](https://github.com/ollama/ollama/pull/18196) enforces configured `num_ctx` in mlxrunner instead of always using arch max.
3. **Structured output truncation** — gemma3:12b `format` responses truncate prematurely (`done_reason: "stop"`) when input contains double-quoted terms ([#18094](https://github.com/ollama/ollama/issues/18038-style bug, #18094)). Open, no fix.
4. **llama-server CPU regression** — [#18038](https://github.com/ollama/ollama/issues/18038), open against latest main.
5. **Minor** — Claude Desktop "restart" toggle in Ollama Apps silently fails and writes no gateway config ([#18188](https://github.com/ollama/ollama/issues/18188)); control characters can't be suppressed from `ollama run` output ([#14571](https://github.com/ollama/ollama/issues/14571)).

## 6. What This Means for Application Developers

- **Pin your cloud agent models carefully**: deepseek-v4-flash and glm-5.3 on Ollama Cloud both exhibit runaway reasoning loops; prefer the vendor-native APIs for these models in production agent loops until fixed, and enforce your own turn-level timeouts below the 182s cloud ceiling.
- **Observability is improving**: once [#17943](https://github.com/ollama/ollama/pull/17943) ships, expect standard `cached_tokens` fields in both OpenAI- and Anthropic-compatible APIs — plan dashboards around prompt cache hit rates.
- **Gemma4 on Apple Silicon is now genuinely multimodal** on the MLX engine — safe to use vision/audio in local apps after the next release; verify capabilities via `ollama show` since model-card metadata has lagged reality ([#16700](https://github.com/ollama/ollama/issues/16700)).
- **If building from source on macOS**, watch #18038 — the current main branch has a significant CPU regression; stay on a tagged release.
- **Don't trust `format` (structured output) with quote-heavy input** on gemma3:12b yet (#18094) — add defensive JSON validation and retry logic.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [agents-radar](https://github.com/lijiaming325-arch/agents-radar) 自动生成。*