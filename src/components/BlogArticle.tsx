// components/BlogArticle.tsx
"use client";

import Image from "next/image";
import { Share2, Link as LinkIcon, Clock } from "lucide-react";
import { useMemo, useState } from "react";

type AuthorInput = string | { name: string; avatarUrl?: string; bio?: string };

type BlogArticleProps = {
  title: string;
  content: string; // plain text or simple HTML
  image?: string;  // hero image url
  author: AuthorInput;
};

export default function BlogArticle({ title, content, image, author }: BlogArticleProps) {
  const [copied, setCopied] = useState(false);

  const authorObj = useMemo(() => {
    return typeof author === "string" ? { name: author } : author;
  }, [author]);

  const readingMins = useMemo(() => {
    const text = stripHtml(content);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 225));
  }, [content]);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title, text: title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // ignore
    }
  };

  return (
    <article className="bg-white">
      {/* Hero */}
      {image ? (
        <div className="relative w-full bg-slate-100 animate-reveal-down">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* Title + Meta */}
      <header className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight leading-tight animate-reveal-up">
          {title}
        </h1>

        <div className="mt-5 flex items-start justify-between gap-4 animate-reveal-up" style={{ animationDelay: "90ms" }}>
          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200 ring-2 ring-slate-100">
              {authorObj.avatarUrl ? (
                <Image src={authorObj.avatarUrl} alt={authorObj.name} width={40} height={40} />
              ) : null}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{authorObj.name}</p>
              {authorObj.bio ? <p className="text-xs text-slate-500">{authorObj.bio}</p> : null}
            </div>
          </div>

          {/* Meta right: reading time + actions */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-sm text-slate-600">
              <Clock className="h-4 w-4" />
              {readingMins} min read
            </span>
            <button
              type="button"
              onClick={share}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm
                         hover:bg-slate-50 transition-all ease-minor-spring"
              aria-label="Share article"
              title={copied ? "Link copied!" : "Share"}
            >
              {copied ? <LinkIcon className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              {copied ? "Copied" : "Share"}
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <section
        className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mt-8 text-lg leading-8 text-slate-800 space-y-6 animate-reveal-up" style={{ animationDelay: "140ms" }}>
          {isHtml(content) ? (
            // Render simple HTML (trusted)
            <div
              className="article-body [&>p]:my-4 [&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:text-2xl [&>h3]:mt-8 [&>h3]:mb-2 [&>h3]:text-xl
                         [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6
                         [&_a]:text-blue-700 [&_a]:underline [&_a]:underline-offset-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            // Auto paragraphs for plain text
            content
              .split(/\n{2,}/)
              .map((para, i) => (
                <p key={i} className="text-balance">
                  {para}
                </p>
              ))
          )}
        </div>
      </section>

      {/* Footer separator */}
      <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 lg:px-8">
        <hr className="border-slate-200" />
      </div>
    </article>
  );
}

/* ---------------- utilities ---------------- */

function isHtml(s: string) {
  // naive check: if it contains HTML tags
  return /<\/?[a-z][\s\S]*>/i.test(s);
}

function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, " ");
}
