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
              Open Source
            </span>
            <time dateTime="2026-06-15">June 15, 2026</time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Building Sustainable Open Source Ecosystems
          </h1>
          <p className="text-zinc-400 text-sm">By Etienne Jacquot</p>
        </header>

        {/* Post content */}
        <section className="prose prose-invert prose-blue max-w-none flex flex-col gap-6 text-zinc-300 leading-relaxed">
          <p>
            Sustainability is the cornerstone of any successful open source initiative. In the
            public sector, where long-term maintenance is crucial, building sustainable ecosystems
            requires more than just good code.
          </p>

          <h2 className="text-xl font-semibold text-white">Community-Driven Development</h2>
          <p>
            The key to sustainability lies in community ownership and participation. When multiple
            stakeholders invest in a project&apos;s success, it becomes more resilient to changes
            in individual circumstances.
          </p>

          <h2 className="text-xl font-semibold text-white">Governance Models</h2>
          <p>Various governance models exist for public sector open source:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>Consensus-based decision making</li>
            <li>Technical steering committees</li>
            <li>Stakeholder advisory boards</li>
            <li>Hybrid models combining elements of each</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">Funding and Resources</h2>
          <p>Sustainable ecosystems require stable funding. Consider:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>Government procurement of open source development</li>
            <li>Corporate sponsorships with clear community oversight</li>
            <li>Grants for public good technology</li>
            <li>Crowdfunding for specific features or improvements</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">Long-Term Maintenance</h2>
          <p>Establishing clear maintenance pathways ensures projects don&apos;t become abandoned:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>Documentation of maintenance procedures</li>
            <li>Cross-training of maintainers</li>
            <li>Regular security audits</li>
            <li>Version management strategies</li>
          </ul>
        </section>
      </article>
    </div>
  );
}
