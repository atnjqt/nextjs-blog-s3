<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## WebLLM Chat Widget
- `app/components/ChatWidget.tsx` — floating chat widget available on all pages (rendered in root layout)
- Uses `@mlc-ai/web-llm` for fully in-browser LLM inference via WebGPU (no server/API costs)
- Model: `SmolLM2-360M-Instruct-q4f16_1-MLC` (lightweight, fast loading)
- Multi-turn conversation with full context history sent on each request
- System prompt defines the assistant persona and blog context
- Engine is lazy-loaded only when the user opens the chat widget
- Requires WebGPU-capable browser (Chrome 113+, Edge 113+)
