import Link from "next/link";

export default function Post() {
  return (
    <div className="flex flex-col flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 font-sans">
      <article className="relative z-10 w-full max-w-3xl mx-auto flex flex-col gap-8 py-16 px-8 sm:px-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
        >
          &larr; Back to blog
        </Link>

        {/* Post header */}
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
              AI
            </span>
            <time dateTime="2026-06-10">June 10, 2026</time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            AI and Open Source: A Partnership for Good
          </h1>
          <p className="text-zinc-400 text-sm">By Etienne Jacquot</p>
        </header>

        {/* Post content */}
        <section className="prose prose-invert prose-blue max-w-none flex flex-col gap-6 text-zinc-300 leading-relaxed">
          <p>
            The rapid advancement of artificial intelligence brings both opportunities and
            challenges. When combined with open source principles, we can work toward AI
            that serves the public good.
          </p>

          <h2 className="text-xl font-semibold text-white">Open AI vs. Open Source AI</h2>
          <p>It&apos;s important to distinguish between:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>Open AI: AI systems with open weights and accessible training methods</li>
            <li>Open Source AI: AI systems developed through collaborative, transparent processes</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">The Value of Transparency</h2>
          <p>Transparency in AI development enables:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>Better understanding of model capabilities and limitations</li>
            <li>Community review of ethical considerations</li>
            <li>Local adaptation to specific contexts</li>
            <li>Trust through open verification processes</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">Collaborative Development Models</h2>
          <p>Successful AI projects benefit from:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>Multi-stakeholder involvement</li>
            <li>Clear contribution guidelines</li>
            <li>Recognizing diverse forms of contribution</li>
            <li>Inclusive decision making processes</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">Going Forward</h2>
          <p>
            As we develop AI systems for public service, let&apos;s remember that the open source
            approach has proven its value in creating robust, widely-adopted technologies that
            serve diverse communities.
          </p>
        </section>
      </article>
    </div>
  );
}
