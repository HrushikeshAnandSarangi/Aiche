import { notFound } from "next/navigation"
import BlogArticle from "@/components/BlogArticle" 
import { blogPosts } from "@/data/blog-data"       

type PageProps = { params: Promise<{ title: string }> }

// helpers
const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
const lastSegment = (p: string) => p.replace(/\/+$/, "").split("/").pop() || ""

// static params for both full title and slug URLs
export function generateStaticParams() {
  const set = new Map<string, true>()
  for (const p of blogPosts) {
    set.set(p.title, true)
    set.set(slugify(p.title), true)
    set.set(lastSegment(p.link), true)
  }
  return Array.from(set.keys()).map((title) => ({ title }))
}

export async function generateMetadata({ params }: PageProps) {
  const { title } = await params
  const decoded = decodeURIComponent(title)
  const post =
    blogPosts.find((p) => p.title === decoded) ||
    blogPosts.find((p) => slugify(p.title) === decoded) ||
    blogPosts.find((p) => lastSegment(p.link) === decoded)

  if (!post) return {}

  const description = post.excerpt || `${post.title} — ${post.author}`
  return {
    title: `${post.title} — AIChE NIT Rourkela`,
    description,
    openGraph: { title: post.title, description, images: post.image ? [{ url: post.image }] : undefined, type: "article" },
    twitter: { card: "summary_large_image" as const, title: post.title, description, images: post.image ? [post.image] : undefined },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { title } = await params
  const decoded = decodeURIComponent(title)

  const post =
    blogPosts.find((p) => p.title === decoded) ||
    blogPosts.find((p) => slugify(p.title) === decoded) ||
    blogPosts.find((p) => lastSegment(p.link) === decoded)

  if (!post) notFound()

  // ⚡️ USE THE PROP COMPONENT HERE
  return (
    <BlogArticle
      title={post.title}
      image={post.image}
      author={{ name: post.author, avatarUrl: "/Aiche-logo.svg", bio: post.readTime }}
      // Use excerpt as content until you plug real body text/HTML
      content={`<p>${post.excerpt}</p>
<h2>Overview</h2>
<p>This is placeholder content. Replace with the full article body from your CMS or data source.</p>
<ul><li>Clear, focused sections</li><li>Relevant visuals</li><li>Concise takeaways</li></ul>`}
    />
  )
}
