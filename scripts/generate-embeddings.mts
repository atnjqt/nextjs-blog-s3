/**
 * generate-embeddings.mts
 *
 * Build-time script that:
 * 1. Extracts plain text from each blog post's page.tsx
 * 2. Chunks them into ~200-word passages
 * 3. Generates embeddings with all-MiniLM-L6-v2 via Transformers.js
 * 4. Writes public/embeddings.json for client-side semantic search
 *
 * Run: npx tsx scripts/generate-embeddings.mts
 */

import { pipeline } from "@huggingface/transformers";
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const BLOG_DIR = join(import.meta.dirname, "../app/blog");
const OUTPUT_PATH = join(import.meta.dirname, "../public/embeddings.json");
const CHUNK_SIZE = 200; // words per chunk
const CHUNK_OVERLAP = 40; // overlapping words between chunks

interface BlogChunk {
  slug: string;
  title: string;
  path: string;
  chunkIndex: number;
  text: string;
  embedding: number[];
}

/**
 * Recursively find all page.tsx files under the blog directory
 */
function findBlogPages(dir: string): string[] {
  const results: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...findBlogPages(fullPath));
    } else if (entry === "page.tsx") {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Extract plain text content from a blog post's TSX source.
 * Strips JSX tags, entities, and collapses whitespace.
 */
function extractTextFromTsx(source: string): { title: string; text: string } {
  // Extract title from <h1> tag
  const titleMatch = source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const title = titleMatch
    ? titleMatch[1].replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, " ").trim()
    : "Untitled";

  // Extract content from the <section> with prose class (main content area)
  const sectionMatch = source.match(
    /<section[^>]*className="prose[^"]*"[^>]*>([\s\S]*?)<\/section>/
  );
  const contentHtml = sectionMatch ? sectionMatch[1] : source;

  // Strip JSX/HTML tags
  let text = contentHtml
    .replace(/<[^>]+>/g, " ")
    // Handle common HTML entities
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&[a-z]+;/g, " ")
    // Remove JSX expressions like {" "}
    .replace(/\{[^}]*\}/g, " ")
    // Collapse whitespace
    .replace(/\s+/g, " ")
    .trim();

  return { title, text };
}

/**
 * Split text into overlapping chunks of ~CHUNK_SIZE words
 */
function chunkText(text: string): string[] {
  const words = text.split(/\s+/);
  if (words.length <= CHUNK_SIZE) return [text];

  const chunks: string[] = [];
  let start = 0;

  while (start < words.length) {
    const end = Math.min(start + CHUNK_SIZE, words.length);
    chunks.push(words.slice(start, end).join(" "));
    start += CHUNK_SIZE - CHUNK_OVERLAP;
  }

  return chunks;
}

async function main() {
  console.log("Loading embedding model (all-MiniLM-L6-v2)...");
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  console.log("Scanning blog posts...");
  const blogPages = findBlogPages(BLOG_DIR);

  // Filter out template files and the blog index
  const postPages = blogPages.filter(
    (p) => !p.includes("_TEMPLATE") && relative(BLOG_DIR, p) !== "page.tsx"
  );

  console.log(`Found ${postPages.length} blog posts`);

  const allChunks: BlogChunk[] = [];

  for (const pagePath of postPages) {
    const source = readFileSync(pagePath, "utf-8");
    const { title, text } = extractTextFromTsx(source);

    // Derive slug and URL path from file path
    // e.g. app/blog/2026/06/my-post/page.tsx -> /blog/2026/06/my-post
    const relPath = relative(BLOG_DIR, pagePath);
    const urlPath = "/blog/" + relPath.replace("/page.tsx", "");
    const slug = urlPath.split("/").pop() || "";

    const chunks = chunkText(text);
    console.log(
      `  ${title}: ${text.split(/\s+/).length} words -> ${chunks.length} chunk(s)`
    );

    for (let i = 0; i < chunks.length; i++) {
      // Generate embedding
      const output = await extractor(chunks[i], {
        pooling: "mean",
        normalize: true,
      });
      const embedding = Array.from(output.data as Float32Array);

      allChunks.push({
        slug,
        title,
        path: urlPath,
        chunkIndex: i,
        text: chunks[i],
        embedding,
      });
    }
  }

  console.log(`\nGenerated ${allChunks.length} embeddings total`);

  writeFileSync(OUTPUT_PATH, JSON.stringify(allChunks, null, 2));
  console.log(`Written to ${OUTPUT_PATH}`);
}

main().catch(console.error);
