# AI Infrastructure Digest 2026-09-03

> Generated: 2026-09-03 00:32 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Digest — 2026-09-03

## 1. Ecosystem Overview

Today's digest shows a coverage gap: 5 of 6 tracked projects (vLLM, SGLang, llama.cpp, LiteLLM, Unsloth) failed summary generation, so cross-project quantitative comparison is limited to **Ollama**. That said, Ollama's activity alone is a useful signal for the local-inference layer: Apple Silicon (MLX) parity work is accelerating, observability (cached-token and per-device VRAM reporting) is catching up to enterprise serving engines, and cloud-hybrid endpoints are becoming a first-class but still-fragile product surface. The tension between local engines and "Ollama Cloud" proxying of third-party APIs (DeepSeek, GLM) is now the project's top stability battleground.

## 2. Activity Comparison

| Project | Issues | PRs | Releases | Digest Status |
|---|---|---|---|---|
| **Ollama** | ~10 active (incl. #17892, #18193, #18094, #18038) | ~12 merged/open (incl. #17650, #18079, #17943, #18197/#18201, #18199) | None in 24h | ✅ Complete |
| vLLM | — | — | — | ⚠️ Failed |
| SGLang | — | — | — | ⚠️ Failed |
| llama.cpp | — | — | — | ⚠️ Failed (indirect signal: b10760 bump landed via Ollama #18199; CPU regression #18038 reported against its main) |
| LiteLLM | — | — | — | ⚠️ Failed |
| Unsloth | — | — | — | ⚠️ Failed |

*Recommendation: re-run digest generation before drawing relative-velocity conclusions.*

## 3. Model Support Race

- **Ollama (via MLX engine)**: Gemma4 vision + audio (image preprocessing, vision tower + encoder-free checkpoints, conformer audio) — PRs #17650/#18079, closing #17065 and metadata-lag issue #16700. Also quantization tuning for Qwen3.8 Flash Next (BF16 QSA/MTP paths, MXFP8 elsewhere — #18078).
- **Requested but unsupported**: SparkLLM Spark-X2.5 4B/1.7B (#18195) — downloads but won't run.
- **llama.cpp**: b10760 integration landed in Ollama; upstream main carries a macOS CPU regression.
- **Cloud models exposed (not locally served)**: deepseek-v4-flash, glm-5.3 / GLM 5.3-Flash — with quality/stability caveats (see Trends).
- Others: no data today.

**Leader (from available data)**: Ollama/MLX, driven by rapid multimodal parity on Apple Silicon — but upstream model support remains bottlenecked by llama.cpp bump cadence.

## 4. Performance Frontier

Visible from today's data, concentrated in **runtime instrumentation and quantization strategy** rather than exotic kernels:

- **Quantization**: Nuanced per-layer precision is replacing blanket low-bit — Qwen3.8 Flash Next keeps QSA/MTP in BF16 because NVFP4 degraded long generations (#18078). Expect this selective-precision pattern to spread.
- **Observability as an optimization enabler**: cached prompt token counts (#17943) and per-device VRAM reporting (#18197/#18201, plus predictive VRAM-from-arch-dims WIP #18198) — infrastructure for prefill-cost and placement optimization.
- **Parallelism unlock**: lifting `numParallel=1` for Qwen35 (#17144) once an upstream llama.cpp crash was fixed — local concurrency remains a soft constraint upstream.
- **Regression watch**: ~560% CPU on M4 Max during generation on llama.cpp main (#18038) — a reminder that consumer-hardware perf regressions surface in the local runtime layer first.

## 5. Layer Positioning

| Layer | Projects | Today's Signal |
|---|---|---|
| **Serving engine** (high-throughput, cluster) | vLLM, SGLang | No data today — normally the frontier for paged KV cache, continuous batching, disaggregated prefill |
| **Local runtime** | llama.cpp, Ollama (llama.cpp + MLX backends) | Multimodal parity, VRAM observability, quantization tuning |
| **Gateway / router** | LiteLLM, Ollama Cloud | Ollama's cloud proxying shows gateway-layer failure modes: runaway reasoning loops from prompt/tool handling, 182s hard timeout, capability metadata drift |
| **Training / fine-tuning** | Unsloth | No data today |

Ollama is notably straddling **local runtime + gateway** simultaneously — a hybrid positioning that is generating most of its current stability debt (cloud loops #17892, #18193; timeouts #18190, #15973; gateway config failures #18188).

## 6. Trend Signals

1. **Multimodal on Apple Silicon is production-grade-in-waiting.** Gemma4 vision/audio on MLX means local agents can go multimodal without NVIDIA — verify capabilities via `ollama show` since metadata lags.
2. **Selective quantization > aggressive quantization.** NVFP4-degrades-quality findings (Qwen3.8 Flash) argue for auditing vendor default quants on long-generation workloads.
3. **Gateway hygiene is a production risk.** Both Ollama Cloud models tested show reasoning loops absent from vendor-native APIs. **Developer action**: wrap cloud endpoints with your own turn-level timeouts (<182s), prefer vendor APIs for deepseek-v4-flash/glm-5.3 in agent loops, and add defensive JSON validation + retries on structured output (#18094).
4. **Token-level cost observability is becoming table stakes.** Cached-token fields arriving in OpenAI/Anthropic-compatible local APIs mean prompt-cache-hit dashboards should be built now.
5. **Build-from-source risk is real**: pin to tagged releases; llama.cpp main has an active CPU regression.

**Caveat**: This report is effectively an Ollama deep-dive due to pipeline failures. Re-generate digests for vLLM/SGLang/LiteLLM/Unsloth before using sections 2–4 for vendor selection decisions.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

⚠️ Summary generation failed.

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

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

⚠️ Summary generation failed.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/lijiaming325-arch/agents-radar).*