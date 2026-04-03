"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Search,
  ArrowRight,
  BookOpen,
  ChevronRight,
  AlertCircle,
  Clock,
  Calendar,
} from "lucide-react";

import MarketingDiagnosisOffer from "@/components/MarketingDiagnosisOffer";
import Link from "next/link";

// ─── Type — matches actual API response ────────────────────────────────────────
interface Blog {
  _id: string;
  heading: string;
  subHeading?: string;
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

function getTitle(blog: Blog): string {
  return blog.heading ?? "";
}

function getExcerpt(blog: Blog): string {
  return blog.subHeading ?? "";
}

function getImage(blog: Blog): string {
  if (blog.imageUrl) {
    // imageUrl is a relative path like "/blogs/:id/image" — prepend base URL
    return blog.imageUrl.startsWith("http")
      ? blog.imageUrl
      : `${BASE_URL}${blog.imageUrl}`;
  }
  // Fallback placeholder seeded by id
  return `https://picsum.photos/seed/123/1200/800`;
}

function getSlug(blog: Blog): any {
  return blog?.slug;
}

function getRawDate(blog: Blog): string {
  return blog.createdAt ?? blog.updatedAt ?? "";
}

function getDate(blog: Blog): string {
  const raw = getRawDate(blog);
  if (!raw) return "";
  try {
    return new Date(raw).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return raw;
  }
}

/** Sort newest-first so blogs[0] = latest uploaded */
function sortByDateDesc(blogs: Blog[]): Blog[] {
  return [...blogs].sort((a, b) => {
    const da = getRawDate(a) ? new Date(getRawDate(a)).getTime() : 0;
    const db = getRawDate(b) ? new Date(getRawDate(b)).getTime() : 0;
    return db - da;
  });
}

// ─── Skeletons ─────────────────────────────────────────────────────────────────
function SkeletonFeatured() {
  return (
    <div className="animate-pulse rounded-[40px] overflow-hidden bg-white/5 border border-white/10 mb-20">
      <div className="aspect-[21/8] bg-white/10 w-full" />
      <div className="p-10 md:p-14 space-y-5">
        <div className="flex gap-3">
          <div className="h-5 w-24 rounded-full bg-white/10" />
          <div className="h-5 w-16 rounded-full bg-white/10" />
        </div>
        <div className="h-10 w-2/3 rounded bg-white/10" />
        <div className="h-5 w-full rounded bg-white/10" />
        <div className="h-5 w-1/2 rounded bg-white/10" />
        <div className="h-12 w-44 rounded-xl bg-white/10 mt-2" />
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden bg-white/5 border border-white/10">
      <div className="aspect-[4/3] bg-white/10 w-full" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-20 rounded bg-white/10" />
        <div className="h-5 w-5/6 rounded bg-white/10" />
        <div className="h-4 w-full rounded bg-white/10" />
        <div className="h-4 w-3/4 rounded bg-white/10" />
      </div>
    </div>
  );
}

// ─── Featured Card ─────────────────────────────────────────────────────────────
function FeaturedCard({ blog }: { blog: Blog }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-[40px] overflow-hidden border border-white/10 hover:border-brand-orange/40 transition-colors duration-500 mb-20"
    >
      <div className="grid md:grid-cols-2 gap-0">

        {/* LEFT SIDE IMAGE */}
        <div className="relative h-[160px] md:h-[300px] overflow-hidden">
          <img
            src={getImage(blog)}
            alt={getTitle(blog)}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />

          {/* Badge */}
          <div className="absolute top-5 left-5">
            <span className="px-3 py-1.5 rounded-full bg-brand-orange text-black text-[10px] font-black uppercase tracking-[0.15em] shadow-xl">
              Latest Post
            </span>
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="relative px-6 md:px-12 py-8 md:py-12 flex flex-col justify-center bg-black/60">

          {/* Glow */}
          <div className="absolute -top-20 left-1/3 w-72 h-40 bg-brand-orange/10 blur-[80px]" />

          {/* Date */}
          {getDate(blog) && (
            <div className="flex items-center gap-2 mb-4 text-white/40 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {getDate(blog)}
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl md:text-[2.4rem] font-display font-bold leading-tight mb-5 group-hover:text-brand-orange transition-colors duration-300">
            {getTitle(blog)}
          </h2>

          {/* Excerpt */}
          {getExcerpt(blog) && (
            <p className="text-white/55 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
              {getExcerpt(blog)}
            </p>
          )}

          {/* CTA */}
          <Link
            href={`/Blog/${getSlug(blog)}`}
            className="btn-premium inline-flex items-center gap-3 px-6 py-3 w-fit"
          >
            Read Full Article
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Grid Card ─────────────────────────────────────────────────────────────────
function BlogCard({ blog, index }: { blog: Blog; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.07, duration: 0.5, ease: "easeOut" }}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-brand-orange/30 bg-white/[0.03] hover:bg-white/[0.055] transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/1] overflow-hidden bg-white/5 shrink-0">
        <img
          src={getImage(blog)}
          alt={getTitle(blog)}
          className="w-full h-full object-cover opacity-55 group-hover:opacity-80 group-hover:scale-[1.06] transition-all duration-600 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-5 md:p-6">
        {getDate(blog) && (
          <div className="flex items-center gap-1.5 mb-3 text-white/35 text-[11px] font-mono">
            <Calendar className="w-3 h-3" />
            {getDate(blog)}
          </div>
        )}

        <h3 className="text-base md:text-lg font-display font-bold leading-snug mb-3 group-hover:text-brand-orange transition-colors duration-300 line-clamp-2">
          {getTitle(blog)}
        </h3>

        {getExcerpt(blog) && (
          <p className="text-white/45 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
            {getExcerpt(blog)}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-white/[0.07]">
          <Link
            href={`/Blog/${getSlug(blog)}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 group-hover:text-brand-orange transition-colors"
          >
            Read Article
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const controller = new AbortController();
    async function fetchBlogs() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/blogs`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`API responded with status ${res.status}`);
        const json = await res.json();

        // Handle { data: [] }, { blogs: [] }, or plain []
        const list: Blog[] = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
            ? json.data
            : Array.isArray(json?.blogs)
              ? json.blogs
              : [];

        // Newest-first — latest uploaded = featured
        setBlogs(sortByDateDesc(list));
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError(
          err instanceof Error ? err.message : "Failed to load articles"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
    return () => controller.abort();
  }, []);

  // ── Search filter ────────────────────────────────────────────────────────
  const filtered = blogs.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      getTitle(b).toLowerCase().includes(q) ||
      getExcerpt(b).toLowerCase().includes(q)
    );
  });

  const featuredBlog = filtered[0] ?? null;
  const gridBlogs = filtered.slice(1);

  return (
    <div className="w-full pt-20 pb-40">


      {/* ── Featured (Latest) ─────────────────────────────────────────────────── */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <SkeletonFeatured />
          ) : error ? (
            <div className="p-12 rounded-[40px] border border-red-500/20 bg-red-500/5 text-center space-y-4 mb-20">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
              <p className="text-red-300 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm hover:bg-red-500/20 transition"
              >
                Retry
              </button>
            </div>
          ) : featuredBlog ? (
            <FeaturedCard blog={featuredBlog} />
          ) : (
            <p className="text-center text-white/40 py-16 mb-20">
              No articles found.
            </p>
          )}
        </div>
      </section>

      {/* ── All Articles Grid ─────────────────────────────────────────────────── */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-display font-bold">All Articles</h2>
            {!loading && !error && gridBlogs.length > 0 && (
              <span className="text-white/25 text-xs font-mono">
                {gridBlogs.length} more post{gridBlogs.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Skeletons */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <AlertCircle className="w-10 h-10 text-red-400" />
              <p className="text-white/50">{error}</p>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && gridBlogs.length === 0 && (
            <p className="text-center text-white/30 py-14">
              {searchQuery.trim()
                ? `No other articles match "${searchQuery}".`
                : "No more articles yet — check back soon."}
            </p>
          )}

          {/* Grid */}
          {!loading && !error && gridBlogs.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridBlogs.map((blog, i) => (
                <BlogCard key={blog._id} blog={blog} index={i} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}


    </div>
  );
}