/**
 * AIHOT (aihot.virxact.com) Chinese AI news fetched via the site's official RSS.
 *
 * Strategy: pull the summary feed (latest 50 items), filter to last 24h.
 * The feed is Chinese-language, complementing the English-centric sources.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AihotItem {
  title: string;
  /** AIHOT item page (stable reader link). */
  url: string;
  /** Original article URL, extracted from the description HTML when present. */
  sourceUrl: string;
  /** Plain-text summary (HTML stripped, boilerplate removed). */
  summary: string;
  /** Editor category, e.g. 技巧观点 / 模型动态. */
  category: string;
  publishedAt: string;
}

export interface AihotData {
  items: AihotItem[];
  fetchSuccess: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const RSS_URL = "https://aihot.virxact.com/rss";

/** Keep the LLM prompt bounded — one day rarely has more than this anyway. */
const AIHOT_MAX_ITEMS = 40;

// ---------------------------------------------------------------------------
// XML helpers (lightweight, no dependency) — same approach as arxiv.ts
// ---------------------------------------------------------------------------

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** Return the inner text of a tag, unwrapping CDATA and decoding entities. */
function extractTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!m) return "";
  let text = m[1]!.trim();
  const cdata = text.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  if (cdata) {
    text = cdata[1]!;
  } else {
    text = decodeEntities(text);
  }
  return text.trim();
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

/** First paragraph of the description HTML, cleaned to plain text. */
function extractSummary(descriptionXml: string): string {
  if (!descriptionXml) return "";
  const inner = descriptionXml.replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1").trim();
  const p = inner.match(/<p>([\s\S]*?)<\/p>/);
  const text = stripHtml(p ? p[1]! : inner);
  // Drop trailing boilerplate left over from the full-text fallback.
  return text.replace(/via AIHOT\s*·.*$/, "").trim();
}

/** Original article URL: first off-site href in the description HTML. */
function extractSourceUrl(descriptionXml: string): string {
  const hrefs = descriptionXml.match(/href="(https?:\/\/[^"]+)"/g) ?? [];
  for (const href of hrefs) {
    const url = href.slice(6, -1);
    if (!url.includes("aihot.virxact.com")) return decodeEntities(url);
  }
  return "";
}

// ---------------------------------------------------------------------------
// Parse
// ---------------------------------------------------------------------------

function parseItem(block: string): AihotItem | null {
  const title = extractTag(block, "title");
  const url = extractTag(block, "link");
  const pubDate = extractTag(block, "pubDate");
  if (!title || !url || !pubDate) return null;

  const published = new Date(pubDate);
  if (Number.isNaN(published.getTime())) return null;

  const description = extractTag(block, "description");
  return {
    title,
    url: decodeEntities(url),
    sourceUrl: extractSourceUrl(description),
    summary: extractSummary(description),
    category: extractTag(block, "category"),
    publishedAt: published.toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

export async function fetchAihotData(): Promise<AihotData> {
  try {
    const resp = await fetch(RSS_URL, {
      headers: { "User-Agent": "agents-radar/1.0" },
    });
    if (!resp.ok) {
      console.error(`  [aihot] RSS: HTTP ${resp.status}`);
      return { items: [], fetchSuccess: false };
    }

    const xml = await resp.text();
    const blocks = xml.split("<item>").slice(1);

    // Filter to last 24h, newest first.
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const items = blocks
      .map((b) => parseItem("<item>" + b))
      .filter((it): it is AihotItem => it !== null && new Date(it.publishedAt).getTime() > cutoff)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, AIHOT_MAX_ITEMS);

    console.log(`  [aihot] ${items.length} items (from ${blocks.length} in feed)`);
    return { items, fetchSuccess: items.length > 0 };
  } catch (err) {
    console.error(`  [aihot] fetch failed: ${err}`);
    return { items: [], fetchSuccess: false };
  }
}
