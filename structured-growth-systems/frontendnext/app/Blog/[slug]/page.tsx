"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";  // ✅ NO useRouter import
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Clock,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

// ─── Type ──────────────────────────────────────────────────────────────────────
interface BlogDetail {
  _id: string;
  heading: string;
  subHeading?: string;
  content?: string;
  imageUrl?: string;
  image?: { contentType?: string };
  status?: string;
  views?: number;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

function getImage(blog: BlogDetail): string {
  if (blog.imageUrl) {
    return blog.imageUrl.startsWith("http")
      ? blog.imageUrl
      : `${BASE_URL}${blog.imageUrl}`;
  }
  return `https://picsum.photos/seed/123/1600/900`;
}

function getDate(blog: BlogDetail): string {
  const raw = blog.createdAt ?? blog.updatedAt ?? "";
  if (!raw) return "";
  try {
    return new Date(raw).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return raw;
  }
}

function estimateReadTime(html?: string): string {
  if (!html) return "5 min read";
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonDetail() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto px-6 pt-12 space-y-8">
      <div className="h-4 w-24 rounded-full bg-white/10" />
      <div className="aspect-[21/8] rounded-3xl bg-white/10 w-full" />
      <div className="space-y-4 pt-4">
        <div className="h-12 w-3/4 rounded-lg bg-white/10" />
        <div className="h-8 w-1/2 rounded-lg bg-white/10" />
      </div>
      <div className="flex gap-4">
        <div className="h-4 w-28 rounded bg-white/10" />
        <div className="h-4 w-20 rounded bg-white/10" />
      </div>
      <div className="space-y-3 pt-4">
        {[100, 90, 95, 80, 100, 85, 70, 92].map((w, i) => (
          <div key={i} className="h-4 rounded bg-white/10" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function BlogDetail() {
  const params = useParams();
  // Reads /blog/[id] — the folder must be named [id]
  const id = params?.id as string;

  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch directly using _id from URL — no page reload needed
  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    async function fetchBlog() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/blogs/${id}`, {
          signal: controller.signal,
        });
        if (res.status === 404) throw new Error("Article not found.");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const json = await res.json();
        // Handle { data: {} }, { blog: {} }, or plain object
        const data: BlogDetail = json?.data ?? json?.blog ?? json;
        setBlog(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load article");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
    return () => controller.abort();
  }, [id]);

  // ── Loading ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full pt-28 pb-40 min-h-screen">
        <SkeletonDetail />
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────
  if (error || !blog) {
    return (
      <div className="w-full pt-28 pb-40 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-2xl font-display font-bold">
            {error === "Article not found." ? "Article Not Found" : "Something Went Wrong"}
          </h2>
          <p className="text-white/50 text-sm">{error ?? "Unable to load this article."}</p>
          {/* ✅ Link only — no router.back() */}
          <Link
            href="/blog"
            className="inline-block px-6 py-3 rounded-xl bg-brand-orange text-black text-sm font-bold hover:bg-brand-orange/90 transition"
          >
            ← Back to All Articles
          </Link>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="w-full pt-24 pb-40 min-h-screen">

      {/* Hero Banner */}
      <div className="relative w-full aspect-[21/8] overflow-hidden bg-black">
        <img
          src={getImage(blog)}
          alt={blog.heading}
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

        {/*
          ✅ Link href="/blog" — always client-side, never reloads
          Replaces the old: <button onClick={() => router.back()}>
        */}
        <div className="absolute top-8 left-6 md:left-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>
        </div>
      </div>

      {/* Article content */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-brand-orange/8 blur-[100px] pointer-events-none" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="pt-10 pb-10 border-b border-white/10"
        >
          <div className="flex flex-wrap items-center gap-4 mb-7 text-xs font-mono text-white/40">
            {getDate(blog) && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {getDate(blog)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {estimateReadTime(blog.content)}
            </span>
            {(blog.views ?? 0) > 0 && (
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                {blog.views?.toLocaleString()} views
              </span>
            )}
            {blog.status === "published" && (
              <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] uppercase tracking-widest font-bold">
                Published
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-5 text-white">
            {blog.heading}
          </h1>

          {blog.subHeading && (
            <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-light">
              {blog.subHeading}
            </p>
          )}
        </motion.div>

        {/* Rich HTML content from editor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          className="pt-12"
        >
          {blog.content ? (
            <div
              className="
                prose prose-invert max-w-none

                prose-p:text-white/70 prose-p:leading-relaxed prose-p:text-[1.0625rem]

                prose-headings:font-display prose-headings:font-bold prose-headings:text-white
                prose-h1:text-4xl prose-h1:mt-10 prose-h1:mb-4
                prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/10
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2

                prose-a:text-brand-orange prose-a:no-underline
                hover:prose-a:underline prose-a:underline-offset-4

                prose-strong:text-white prose-strong:font-bold
                prose-em:text-white/80

                prose-ul:text-white/70 prose-ol:text-white/70
                prose-li:marker:text-brand-orange

                prose-blockquote:border-l-brand-orange prose-blockquote:border-l-[3px]
                prose-blockquote:bg-brand-orange/5 prose-blockquote:rounded-r-xl
                prose-blockquote:px-5 prose-blockquote:py-3
                prose-blockquote:text-white/60 prose-blockquote:not-italic

                prose-code:text-brand-orange prose-code:bg-white/5
                prose-code:border prose-code:border-white/10
                prose-code:rounded-md prose-code:px-1.5 prose-code:py-0.5
                prose-code:text-sm prose-code:before:content-none prose-code:after:content-none

                prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
                prose-pre:rounded-2xl prose-pre:text-white/80

                prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                prose-hr:border-white/10

                prose-table:text-white/70
                prose-th:text-brand-orange prose-th:font-bold prose-th:border-white/10
                prose-td:border-white/10
              "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          ) : (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <BookOpen className="w-10 h-10 text-white/20" />
              <p className="text-white/30 text-sm">No content available for this article.</p>
            </div>
          )}
        </motion.div>

        {/* Footer — all Links, zero router usage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          {/*
            ✅ Link href="/blog" — client-side nav, no reload
            Old code: <button onClick={() => router.back()}>
          */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>

          <Link
            href="/blog"
            className="btn-premium inline-flex items-center gap-2 px-6 py-3 text-sm"
          >
            <BookOpen className="w-4 h-4" />
            View All Articles
          </Link>
        </motion.div>

      </div>
    </div>
  );
}