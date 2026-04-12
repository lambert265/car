"use client";
import StarRating from "./StarRating";
import { format } from "date-fns";
import { User, CheckCircle } from "lucide-react";

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: Date;
}

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="bg-[#0d0d0d] border border-white/[0.06] p-12 text-center">
        <p className="text-white/30 text-[13px]">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(star => reviews.filter(r => r.rating === star).length);

  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="text-center sm:text-left">
            <p className="text-[#C9A84C] font-bold text-4xl mb-2">{avgRating.toFixed(1)}</p>
            <StarRating rating={Math.round(avgRating)} readonly size={18} />
            <p className="text-white/40 text-[11px] mt-2">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex-1 space-y-2">
            {ratingCounts.map((count, i) => {
              const star = 5 - i;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-white/40 text-[11px] w-8">{star} ★</span>
                  <div className="flex-1 h-2 bg-white/[0.06] relative">
                    <div className="absolute inset-y-0 left-0 bg-[#C9A84C]" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-white/40 text-[11px] w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#0d0d0d] border border-white/[0.06] p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/[0.06] flex items-center justify-center">
                  <User size={18} className="text-white/40" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold text-[13px]">{review.userName}</p>
                    {review.verifiedPurchase && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20">
                        <CheckCircle size={10} className="text-emerald-400" />
                        <span className="text-emerald-400 text-[9px] font-semibold uppercase tracking-wider">Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white/30 text-[10px] mt-0.5">{format(review.createdAt, "MMMM d, yyyy")}</p>
                </div>
              </div>
              <StarRating rating={review.rating} readonly size={14} />
            </div>
            <h4 className="text-white font-semibold text-[14px] mb-2">{review.title}</h4>
            <p className="text-white/60 text-[13px] leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
