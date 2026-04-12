"use client";
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export default function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [open, setOpen] = useState(false);
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    toast.success("Link copied to clipboard!");
    setOpen(false);
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 border border-white/[0.08] text-white/40 text-[11px] font-semibold uppercase tracking-wider hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-colors"
      >
        <Share2 size={14} /> Share
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-48 bg-[#0d0d0d] border border-white/[0.08] shadow-2xl z-50">
            <div className="p-3 space-y-2">
              <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 text-[12px] text-white/50 hover:text-[#1877F2] hover:bg-white/[0.03] transition-colors"
              >
                <Facebook size={16} /> Facebook
              </a>
              <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 text-[12px] text-white/50 hover:text-[#1DA1F2] hover:bg-white/[0.03] transition-colors"
              >
                <Twitter size={16} /> Twitter
              </a>
              <a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 text-[12px] text-white/50 hover:text-[#0A66C2] hover:bg-white/[0.03] transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-3 w-full px-3 py-2 text-[12px] text-white/50 hover:text-[#C9A84C] hover:bg-white/[0.03] transition-colors"
              >
                <LinkIcon size={16} /> Copy Link
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
