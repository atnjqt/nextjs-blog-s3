"use client";

import { useState, useRef, useCallback } from "react";

interface BlogChunk {
  slug: string;
  title: string;
  path: string;
  chunkIndex: number;
  text: string;
  embedding: number[];
}

interface SearchResult {
  chunk: BlogChunk;
  score: number;
}

/**
 * Cosine similarity between two vectors
 */
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

type PipelineStatus = "idle" | "loading-model" | "ready" | "searching" | "error";

export default function AskAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<PipelineStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Refs to persist across renders without re-loading
  const extractorRef = useRef<ReturnType<typeof import("@huggingface/transformers").pipeline> | null>(null);
  const embeddingsRef = useRef<BlogChunk[] | null>(null);

  /**
   * Lazily load the embedding model + pre-computed embeddings
   */
  const initialize = useCallback(async () => {
    if (extractorRef.current && embeddingsRef.current) return;

    setStatus("loading-model");

    try {
      // Load pre-computed embeddings
      const res = await fetch("/embeddings.json");
      if (!res.ok) throw new Error("Failed to load embeddings.json");
      embeddingsRef.current = await res.json();

      // Load the model (this downloads ~23MB ONNX model on first use, then cached)
      const { pipeline } = await import("@huggingface/transformers");
      const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
        dtype: "q8", // quantized for smaller download
      });
      extractorRef.current = extractor as unknown as typeof extractorRef.current;

      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }, []);

  /**
   * Run semantic search: embed query, rank chunks by cosine similarity
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Initialize on first search
    if (!extractorRef.current || !embeddingsRef.current) {
      await initialize();
    }

    const extractor = extractorRef.current;
    const embeddings = embeddingsRef.current;
    if (!extractor || !embeddings) return;

    setStatus("searching");

    try {
      // Embed the query
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output = await (extractor as any)(query, {
        pooling: "mean",
        normalize: true,
      });
      const queryEmbedding: number[] = Array.from(output.data as Float32Array);

      // Rank all chunks by cosine similarity
      const scored: SearchResult[] = embeddings.map((chunk) => ({
        chunk,
        score: cosineSimilarity(queryEmbedding, chunk.embedding),
      }));

      scored.sort((a, b) => b.score - a.score);

      // De-duplicate by post (keep best chunk per post)
      const seen = new Set<string>();
      const deduped: SearchResult[] = [];
      for (const result of scored) {
        if (!seen.has(result.chunk.path)) {
          seen.add(result.chunk.path);
          deduped.push(result);
        }
        if (deduped.length >= 3) break;
      }

      setResults(deduped);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Search failed");
    }
  };

  const statusLabel: Record<PipelineStatus, string> = {
    idle: "",
    "loading-model": "Loading AI model (~23MB, cached after first use)...",
    ready: "",
    searching: "Searching...",
    error: `Error: ${errorMsg}`,
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && status === "idle") {
            initialize();
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all hover:scale-105"
        aria-label="Ask AI"
        title="Semantic search across blog posts"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(400px,calc(100vw-3rem))] max-h-[70vh] flex flex-col bg-slate-800 border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI Blog Search
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} className="px-4 py-3 border-b border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about blog topics..."
                className="flex-1 bg-slate-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={status === "loading-model" || status === "searching"}
              />
              <button
                type="submit"
                disabled={status === "loading-model" || status === "searching" || !query.trim()}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:text-zinc-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Ask
              </button>
            </div>
            {statusLabel[status] && (
              <p className={`mt-2 text-xs ${status === "error" ? "text-red-400" : "text-zinc-400"}`}>
                {statusLabel[status]}
              </p>
            )}
          </form>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
            {results.length === 0 && status === "ready" && query && (
              <p className="text-xs text-zinc-500 text-center py-4">
                No highly relevant results. Try a different question.
              </p>
            )}
            {results.map((result, i) => (
              <a
                key={`${result.chunk.path}-${result.chunk.chunkIndex}`}
                href={result.chunk.path}
                className="block bg-slate-700/50 hover:bg-slate-700 border border-white/5 hover:border-white/15 rounded-lg p-3 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-blue-300">
                    #{i + 1} — {(result.score * 100).toFixed(1)}% match
                  </span>
                </div>
                <h4 className="text-sm font-medium text-white mb-1">
                  {result.chunk.title}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-3">
                  {result.chunk.text}
                </p>
              </a>
            ))}
            {results.length === 0 && status !== "ready" && status !== "loading-model" && status !== "searching" && (
              <div className="text-center py-8 text-zinc-500 text-xs">
                <p>Ask a question to semantically search blog posts.</p>
                <p className="mt-1 text-zinc-600">Powered by Transformers.js — runs entirely in your browser.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
