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
              Conference
            </span>
            <time dateTime="2026-06-22">June 22, 2026</time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            UN OSPO 2026: Leveraging Open Source for Global Good
          </h1>
          <p className="text-zinc-400 text-sm">By Etienne Jacquot</p>
        </header>

        {/* Post content */}
        <section className="prose prose-invert prose-blue max-w-none flex flex-col gap-6 text-zinc-300 leading-relaxed">
          <p>
            Open source software has evolved from a development methodology to a fundamental
            principle guiding digital public infrastructure worldwide. In 2026, the United Nations
            Open Source Professionals Organization (UN OSPO) is at the forefront of this transformation.
          </p>

          <h2 className="text-xl font-semibold text-white">The Power of Open Collaboration</h2>
          <p>
            The open source movement has demonstrated that when transparency, collaboration, and
            community-driven development come together, remarkable innovations emerge. This same
            spirit is now being applied to global challenges through digital public infrastructure.
          </p>

          <h2 className="text-xl font-semibold text-white">What is Digital Public Infrastructure?</h2>
          <p>
            Digital public infrastructure refers to foundational systems that enable governments,
            organizations, and citizens to interact digitally. These include identity systems,
            payment infrastructure, data exchange platforms, and open-source software repositories.
          </p>

          <h2 className="text-xl font-semibold text-white">Our Mission</h2>
          <p>At UN OSPO 2026, we&apos;re working to ensure that digital public infrastructure:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>Is accessible to all nations regardless of economic status</li>
            <li>Prioritizes privacy and security by design</li>
            <li>Encourages local adaptation and community ownership</li>
            <li>Maintains transparency in development processes</li>
          </ul>

          <h2 className="text-xl font-semibold text-white">Getting Involved</h2>
          <p>
            We welcome contributions from developers, policymakers, community leaders, and advocates.
            Together, we can build a more equitable digital future.
          </p>
        </section>
      </article>
    </div>
  );
}
