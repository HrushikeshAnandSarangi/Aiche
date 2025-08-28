"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { User, Clock, ArrowRight, Share2 } from "lucide-react"
import { blogPosts, type BlogPost } from "@/data/blog-data"
import { cn } from "@/lib/utils"

const CARD_BEIGE = "#F8F3E7" // warm beige body
const SECTION_BG = "bg-amber-50" // light yellow/amber section

const BlogCard: React.FC<{ post: BlogPost; className?: string }> = ({ post, className }) => {
  const [copied, setCopied] = useState(false)

  const openPost = () => window.open(post.link, "_blank")

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const shareData = {
      title: post.title,
      text: `Check out this post by ${post.author}`,
      url: post.link,
    }

    // Prefer native share
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        /* user cancelled or failed */
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(post.link)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      window.prompt("Copy this link:", post.link)
    }
  }

  return (
    <Card
      role="article"
      tabIndex={0}
      onClick={openPost}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openPost()}
      className={cn(
        "group overflow-hidden cursor-pointer border-0 shadow-md hover:shadow-lg",
        "transition-all duration-300 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-amber-400",
        className,
      )}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div style={{ backgroundColor: CARD_BEIGE }} className="px-5 py-6">
        {/* Title */}
        <h3 className="text-[22px] sm:text-2xl font-extrabold leading-snug text-neutral-900 tracking-tight line-clamp-2">
          {post.title}
        </h3>

        {/* Author */}
        <p className="mt-1.5 flex items-center text-sm text-neutral-800/90">
          <User className="w-4 h-4 mr-2 opacity-80" />
          <span className="truncate">By {post.author}</span>
        </p>

        {/* Read More button */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              openPost()
            }}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 text-white px-5 py-2.5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900"
          >
            Read More
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom meta row */}
        <div className="mt-6 flex items-center justify-between text-[13px] sm:text-sm text-neutral-900/90">
          <div className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 opacity-80" />
            <span>{post.readTime}</span>
          </div>

          <button
            onClick={handleShare}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
              "bg-black/90 text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-amber-400",
            )}
            aria-label="Share this post"
            title={copied ? "Link copied!" : "Share"}
          >
            <Share2 className="w-4 h-4" />
            <span className="text-xs font-semibold">{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>
    </Card>
  )
}

export default function BlogsSection() {
  return (
    <section className={cn("py-12 sm:py-16 md:py-20", SECTION_BG)}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
