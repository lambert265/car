"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { format } from "date-fns";

// Mock blog post - replace with Supabase data
const BLOG_POST = {
  slug: "luxury-car-maintenance-tips",
  title: "Essential Maintenance Tips for Luxury Vehicles",
  excerpt: "Keep your premium vehicle in pristine condition with these expert maintenance tips from our service team.",
  content: `
    <p>Owning a luxury vehicle is a significant investment, and proper maintenance is crucial to preserving its value, performance, and appearance. At LUXE Motors, we understand the unique needs of premium automobiles.</p>

    <h2>Regular Service Intervals</h2>
    <p>Luxury vehicles require more frequent and specialized maintenance than standard cars. Follow your manufacturer's recommended service schedule religiously. This typically includes:</p>
    <ul>
      <li>Oil changes every 5,000-7,500 miles</li>
      <li>Brake inspections every 10,000 miles</li>
      <li>Tire rotations every 7,500 miles</li>
      <li>Full service every 15,000 miles</li>
    </ul>

    <h2>Use Premium Products</h2>
    <p>Your luxury vehicle deserves premium care products. Always use manufacturer-recommended fluids, oils, and parts. While they may cost more, they're specifically engineered for your vehicle's performance characteristics.</p>

    <h2>Protect the Exterior</h2>
    <p>The paint and finish on luxury vehicles are often more delicate and expensive to repair. Consider:</p>
    <ul>
      <li>Ceramic coating for long-term protection</li>
      <li>Regular hand washing (avoid automatic car washes)</li>
      <li>Paint protection film on high-impact areas</li>
      <li>Covered parking whenever possible</li>
    </ul>

    <h2>Interior Care</h2>
    <p>Luxury interiors feature premium materials like leather, wood, and carbon fiber that require special attention:</p>
    <ul>
      <li>Use leather conditioner every 3-6 months</li>
      <li>Vacuum regularly to prevent dirt buildup</li>
      <li>Use UV protectant on dashboard and trim</li>
      <li>Address spills immediately</li>
    </ul>

    <h2>Choose the Right Service Center</h2>
    <p>Not all mechanics are qualified to work on luxury vehicles. Choose a service center that:</p>
    <ul>
      <li>Specializes in your vehicle's brand</li>
      <li>Uses OEM or equivalent parts</li>
      <li>Has certified technicians</li>
      <li>Offers warranty on repairs</li>
    </ul>

    <h2>Monitor Performance</h2>
    <p>Pay attention to how your vehicle drives. Any changes in handling, acceleration, or unusual noises should be addressed immediately. Early detection can prevent costly repairs.</p>

    <h2>Conclusion</h2>
    <p>Proper maintenance is an investment in your luxury vehicle's longevity and performance. At LUXE Motors, we offer comprehensive maintenance packages tailored to your vehicle's specific needs. Contact us today to schedule your next service appointment.</p>
  `,
  featuredImage: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&q=80",
  author: "LUXE Motors Team",
  publishedAt: new Date("2024-01-15"),
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-white/[0.05] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-[#C9A84C] transition-colors text-[12px] mb-4"
          >
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <p className="text-[10px] text-white/20 mb-2 tracking-wider uppercase">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">Home</Link>
            <span className="mx-2 text-white/10">›</span>
            <Link href="/blog" className="hover:text-[#C9A84C] transition-colors">Blog</Link>
            <span className="mx-2 text-white/10">›</span>
            Article
          </p>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-[21/9] max-h-[500px] overflow-hidden bg-[#080808]">
        <Image
          src={BLOG_POST.featuredImage}
          alt={BLOG_POST.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Meta */}
        <div className="flex items-center gap-4 text-[12px] text-white/30 mb-6">
          <span className="flex items-center gap-2">
            <Calendar size={13} />
            {format(BLOG_POST.publishedAt, "MMMM d, yyyy")}
          </span>
          <span className="flex items-center gap-2">
            <User size={13} />
            {BLOG_POST.author}
          </span>
          <button className="ml-auto flex items-center gap-2 text-white/40 hover:text-[#C9A84C] transition-colors">
            <Share2 size={13} /> Share
          </button>
        </div>

        {/* Title */}
        <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
          {BLOG_POST.title}
        </h1>

        {/* Excerpt */}
        <p className="text-white/50 text-[16px] sm:text-[18px] leading-relaxed mb-10 pb-10 border-b border-white/[0.06]">
          {BLOG_POST.excerpt}
        </p>

        {/* Article Content */}
        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: BLOG_POST.content }}
          style={{
            color: "rgba(255,255,255,0.7)",
          }}
        />

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-white/[0.06]">
          <div className="bg-[#0d0d0d] border border-white/[0.06] p-8 text-center">
            <h3 className="text-white font-bold text-xl mb-3">Interested in a Luxury Vehicle?</h3>
            <p className="text-white/40 text-[14px] mb-6">
              Explore our collection of premium vehicles or schedule a consultation with our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/inventory"
                className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3 text-[11px] font-bold uppercase tracking-wider"
              >
                Browse Inventory
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/[0.08] text-white/60 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] text-[11px] font-bold uppercase tracking-wider transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Add custom styles for prose */}
      <style jsx global>{`
        .prose h2 {
          color: #C9A84C;
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        .prose ul {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.75rem;
          color: rgba(255,255,255,0.6);
        }
      `}</style>
    </div>
  );
}
