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
              {/* CATEGORY */}
              Category
            </span>
            <time dateTime="YYYY-MM-DD">Month DD, YYYY</time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {/* TITLE */}
            Post Title Goes Here
          </h1>
          <p className="text-zinc-400 text-sm">By Etienne Jacquot</p>
        </header>

        {/* Post content */}
        <section className="prose prose-invert prose-blue max-w-none flex flex-col gap-6 text-zinc-300 leading-relaxed">
          <p>
            Opening paragraph goes here.
          </p>

          <h2 className="text-xl font-semibold text-white">Section Heading</h2>
          <p>
            Section content goes here.
          </p>

          {/* Example list */}
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>Item one</li>
            <li>Item two</li>
            <li>Item three</li>
          </ul>

          {/* Example link */}
          <p>
            Check out{" "}
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline underline-offset-2"
            >
              this resource
            </a>{" "}
            for more info.
          </p>
        </section>
      </article>
    </div>
  );
}
