export default function CardSkeleton() {
  return (
    <div className="bg-[#0d0d0d] border border-white/[0.06] overflow-hidden">
      <div className="aspect-[16/10] bg-white/[0.04] relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-2 w-14 bg-white/[0.06] relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>
            <div className="h-3.5 w-40 bg-white/[0.06] relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_0.1s_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>
          </div>
          <div className="h-4 w-20 bg-white/[0.06] relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_0.2s_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </div>
        </div>
        <div className="h-px bg-white/[0.04]" />
        <div className="flex gap-4">
          {[20, 24, 20].map((w, i) => (
            <div key={i} className="h-2.5 bg-white/[0.05] relative overflow-hidden" style={{ width: `${w * 4}px` }}>
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_0.15s_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
            </div>
          ))}
        </div>
        <div className="h-2.5 w-28 bg-white/[0.04] relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_0.25s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
        </div>
      </div>
    </div>
  );
}
