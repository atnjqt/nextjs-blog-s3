export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  year: string;
  month: string;
}

/**
 * Blog post manifest — add a new entry here when you create a post.
 * Each post lives at: /blog/<year>/<month>/<slug>/page.tsx
 */
export const blogPosts: BlogPostMeta[] = [
  {
    slug: "un-ospo-leveraging-open-source",
    title: "UN OSPO 2026: Leveraging Open Source for Global Good",
    excerpt: "Exploring how open source principles are transforming international cooperation and digital public infrastructure.",
    date: "2026-06-22",
    author: "Etienne Jacquot",
    category: "Conference",
    year: "2026",
    month: "06",
  },
  {
    slug: "building-sustainable-open-source-ecosystems",
    title: "Building Sustainable Open Source Ecosystems",
    excerpt: "Strategies for maintaining long-term open source projects in the public sector context.",
    date: "2026-06-15",
    author: "Etienne Jacquot",
    category: "Open Source",
    year: "2026",
    month: "06",
  },
  {
    slug: "ai-and-open-source-partnership-for-good",
    title: "AI and Open Source: A Partnership for Good",
    excerpt: "How open source principles can guide responsible artificial intelligence development.",
    date: "2026-06-10",
    author: "Etienne Jacquot",
    category: "AI",
    year: "2026",
    month: "06",
  },
];