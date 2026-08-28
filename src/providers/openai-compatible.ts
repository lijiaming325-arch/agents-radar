/**
 * Base class for OpenAI-compatible providers.
 *
 * Shared by OpenAI, GitHub Copilot, and OpenRouter providers.
 */

import OpenAI from "openai";
import type { LlmProvider } from "./types.ts";

export abstract class OpenAICompatibleProvider implements LlmProvider {
  abstract readonly name: string;
  protected readonly client: OpenAI;
  protected readonly model: string;

  constructor(opts: { apiKey?: string; baseURL?: string; model: string }) {
    this.model = opts.model;
    this.client = new OpenAI({
      apiKey: opts.apiKey,
      baseURL: opts.baseURL,
    });
  }

  async call(prompt: string, maxTokens: number): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      ...(this.maxTokensParam() === "max_tokens"
        ? { max_tokens: maxTokens }
        : { max_completion_tokens: maxTokens }),
      messages: [{ role: "user", content: prompt }],
      ...this.extraBody(),
    });
    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error(`Unexpected empty response from ${this.name}`);
    return text;
  }

  /**
   * Fork customization: which request field carries the output-token cap.
   * `max_completion_tokens` is the modern OpenAI name, but some
   * OpenAI-compatible endpoints (e.g. Zhipu's coding gateway) return an empty
   * body for it and only honor `max_tokens`.
   */
  private maxTokensParam(): string {
    return process.env["LLM_MAX_TOKENS_PARAM"] ?? "max_completion_tokens";
  }

  /**
   * Fork customization: extra JSON merged into every completion request body,
   * e.g. LLM_EXTRA_BODY='{"thinking":{"type":"disabled"}}' to turn off
   * reasoning-mode models whose output would otherwise exhaust the token
   * budget before any answer text is produced.
   */
  private extraBody(): Record<string, unknown> {
    const raw = process.env["LLM_EXTRA_BODY"];
    if (!raw) return {};
    try {
      const parsed: unknown = JSON.parse(raw);
      return parsed !== null && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
    } catch (err) {
      throw new Error(`LLM_EXTRA_BODY is not valid JSON: ${String(err)}`);
    }
  }
}
