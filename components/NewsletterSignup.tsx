"use client";
import { useState } from "react";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          toast.error("You're already subscribed!");
        } else {
          toast.error(data.error || "Failed to subscribe");
        }
        return;
      }

      toast.success("Successfully subscribed to newsletter!");
      setEmail("");
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d0d0d] border border-white/[0.06] p-8">
      <div className="flex items-center gap-3 mb-4">
        <Mail size={20} className="text-[#C9A84C]" />
        <h3 className="text-white font-bold text-[17px]">Stay Updated</h3>
      </div>
      <p className="text-white/40 text-[13px] mb-5">
        Get notified about new arrivals, exclusive offers, and price drops.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 bg-white/[0.04] border border-white/[0.08] text-white/70 placeholder:text-white/20 text-[13px] px-4 py-3 focus:outline-none focus:border-[#C9A84C]/40 transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-gold px-6 py-3 text-[11px] font-bold uppercase tracking-wider shrink-0"
        >
          {loading ? "..." : "Subscribe"}
        </button>
      </form>
      <p className="text-white/20 text-[10px] mt-3">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  );
}
