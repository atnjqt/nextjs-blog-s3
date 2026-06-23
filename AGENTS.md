<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md file

- Author: Etienne Jacquot
- Repository: https://github.com/atnjqt/nextjs-blog-s3.git

## Codebase
- This application is a static website functioning as a low-cost bespoke blog, which avoids paying for a server to run wordpress or a similar CMS
- Tech stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Transformers.js

## Dev environment
- [app](./app/) is the main application package, which is a NextJS and React app
- React builds are uploaded to AWS S3 where the site is statically hosted behind cloudfront at https://www.ejacquot.com
- to run dev site use `cd app && npm run dev`

- to build & deploy to the production site use `./deploy-static.sh`

## AI-Powered Semantic Search (Transformers.js)
- Fully static, client-side semantic search over blog posts using Transformers.js
- No server or API required — fits S3/CloudFront architecture
- Model: `Xenova/all-MiniLM-L6-v2` (sentence-transformer, ~23MB quantized ONNX)

### How it works
1. **Build time** (`npm run embeddings` / `scripts/generate-embeddings.mts`):
   - Extracts plain text from each blog post's `page.tsx`
   - Chunks text into ~200-word overlapping passages
   - Generates vector embeddings and writes `public/embeddings.json`
2. **Runtime** (`components/AskAI.tsx`):
   - Floating search button loads the same model in-browser on first interaction
   - User query is embedded client-side
   - Cosine similarity ranks pre-computed blog embeddings
   - Top 3 matching posts are displayed with relevance scores

### Key files
- `scripts/generate-embeddings.mts` — build-time embedding generation
- `components/AskAI.tsx` — client-side search UI component
- `public/embeddings.json` — pre-computed embeddings (generated, not committed)
- `data/blogPosts.ts` — blog post manifest

### Commands
- `npm run embeddings` — regenerate embeddings (run when blog posts change)
- `npm run build` — runs embeddings + next build (full static export)
