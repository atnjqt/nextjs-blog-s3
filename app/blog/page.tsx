import { blogPosts } from '@/data/blogPosts';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="flex flex-col flex-1 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 font-sans">
      <main className="relative z-10 w-full max-w-3xl mx-auto flex flex-col gap-8 py-16 px-8 sm:px-16">
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Blog</h1>
          <p className="text-zinc-400">
            Insights on open source, digital public infrastructure, and technology for global good.
          </p>
        </header>

        {/* Post list */}
        <section className="flex flex-col gap-4">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.year}/${post.month}/${post.slug}`}
              className="group flex flex-col gap-2 bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <h2 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
