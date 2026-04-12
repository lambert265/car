"use client";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";

// Mock blog posts - replace with Supabase data
const BLOG_POSTS = [
  {
    id: 1,
    slug: "luxury-car-maintenance-tips",
    title: "Essential Maintenance Tips for Luxury Vehicles",
    excerpt: "Keep your premium vehicle in pristine condition with these expert maintenance tips from our service team.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
    author: "LUXE Motors Team",
    publishedAt: new Date("2024-01-15"),
    published: true,
  },
  {
    id: 2,
    slug: "electric-vs-hybrid-luxury",
    title: "Electric vs Hybrid: Which Luxury Option is Right for You?",
    excerpt: "Explore the differences between electric and hybrid luxury vehicles to make an informed decision.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    author: "LUXE Motors Team",
    publishedAt: new Date("2024-01-10"),
    published: true,
  },
  {
    id: 3,
    slug: "2024-luxury-car-trends",
    title: "Top Luxury Car Trends to Watch in 2024",
    excerpt: "From advanced technology to sustainable materials, discover what's shaping the future of luxury automotive.",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
    author: "LUXE Motors Team",
    publishedAt: new Date("2024-01-05"),
    published: true,
  },
];

export default function BlogPage() {
  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/[0.05] py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-[10px] sm:text-[11px] text-white/20 mb-2 tracking-wider uppercase">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span className="mx-2 text-white/10">›</span>
            Blog
          </p>
          <h1 className="text-white font-bold text-3xl sm:text-4xl tracking-tight mb-3">LUXE Journal</h1>
          <p className="text-white/30 text-[14px] sm:text-[15px]">
            Insights, trends, and stories from the world of luxury automotive
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-[#0d0d0d] border border-white/[0.06] hover:border-[#C9A84C]/40 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#080808]">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-[11px] text-white/30 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} />
                    {format(post.publishedAt, "MMM d, yyyy")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={11} />
                    {post.author}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-white font-bold text-[17px] leading-snug mb-3 group-hover:text-[#C9A84C] transition-colors">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-white/40 text-[13px] leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]/70 group-hover:text-[#C9A84C] transition-colors">
                  Read Article <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (if no posts) */}
        {BLOG_POSTS.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/20 text-[14px] mb-6">No articles published yet.</p>
            <Link href="/" className="btn-gold inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold uppercase tracking-wider">
              Back to Home <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
