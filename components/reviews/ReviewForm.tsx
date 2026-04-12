"use client";
import { useState, useContext } from "react";
import { useAuth } from "@/lib/auth";
import StarRating from "./StarRating";
import toast from "react-hot-toast";

interface ReviewFormProps {
  carId: number;
  onSuccess?: () => void;
}

export default function ReviewForm({ carId, onSuccess }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to leave a review");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Review submitted successfully!");
      setRating(0);
      setTitle("");
      setComment("");
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-[#0d0d0d] border border-white/[0.06] p-6 text-center">
        <p className="text-white/40 text-[13px] mb-4">Sign in to leave a review</p>
        <button onClick={() => window.location.href = "/account/sign-in"} className="btn-gold px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider">
          Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0d0d0d] border border-white/[0.06] p-6">
      <h3 className="text-white font-bold text-[15px] mb-4">Write a Review</h3>
      <div className="space-y-4">
        <div>
          <label className="text-white/40 text-[11px] uppercase tracking-wider mb-2 block">Your Rating *</label>
          <StarRating rating={rating} onRatingChange={setRating} size={20} />
        </div>
        <div>
          <label className="text-white/40 text-[11px] uppercase tracking-wider mb-2 block">Review Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sum up your experience"
            className="w-full bg-white/[0.04] border border-white/[0.08] text-white/70 text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40"
          />
        </div>
        <div>
          <label className="text-white/40 text-[11px] uppercase tracking-wider mb-2 block">Your Review *</label>
          <textarea
            required
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this vehicle..."
            className="w-full bg-white/[0.04] border border-white/[0.08] text-white/70 text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 resize-none"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-gold w-full px-6 py-3 text-[11px] font-bold uppercase tracking-wider">
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
}
