"use client";
import { useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { CARS } from "@/lib/cars";
import Image from "next/image";
import { Check, ChevronRight, Truck, Shield, FileText, DollarSign, CreditCard } from "lucide-react";
import toast from "react-hot-toast";

const STEPS = ["Vehicle", "Delivery", "Insurance", "Trade-In", "Review"];

export default function CheckoutClient() {
  const router = useRouter();
  const params = useSearchParams();
  const carId = params.get("carId");
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    deliveryOption: "pickup",
    deliveryAddress: "",
    deliveryDate: "",
    insurance: false,
    insuranceProvider: "",
    warranty: false,
    warrantyYears: 3,
    tradeIn: false,
    tradeInMake: "",
    tradeInModel: "",
    tradeInYear: "",
    tradeInMileage: "",
    tradeInValue: 0,
  });

  const car = carId ? CARS.find(c => c.id === Number(carId)) : cart[0] ? CARS.find(c => c.id === cart[0].carId) : null;

  if (!car) {
    return (
      <div className="pt-[68px] bg-[#080808] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 mb-4">No vehicle selected</p>
          <button onClick={() => router.push("/inventory")} className="btn-gold px-6 py-3 text-[11px] font-bold uppercase tracking-wider">
            Browse Inventory
          </button>
        </div>
      </div>
    );
  }

  const downPayment = car.price * 0.6;
  const loanAmount = car.price * 0.4;
  const monthlyPayment = (loanAmount * (0.039 / 12)) / (1 - Math.pow(1 + 0.039 / 12, -60));
  const insuranceCost = formData.insurance ? 2500 : 0;
  const warrantyCost = formData.warranty ? formData.warrantyYears * 1200 : 0;
  const deliveryCost = formData.deliveryOption === "delivery" ? 500 : 0;
  const totalDue = downPayment + insuranceCost + warrantyCost + deliveryCost - formData.tradeInValue;

  const handleNext = () => {
    if (step === 1 && formData.deliveryOption === "delivery" && !formData.deliveryAddress) {
      toast.error("Please enter delivery address");
      return;
    }
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to complete purchase");
      router.push("/account/sign-in");
      return;
    }

    setLoading(true);
    try {
      // Simulate order creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Order placed successfully!");
      clearCart();
      router.push("/account/orders");
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">
      <div className="bg-[#0a0a0a] border-b border-white/[0.05] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="text-white font-bold text-2xl sm:text-3xl mb-6">Checkout</h1>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 shrink-0">
                <div className={`flex items-center gap-2 px-3 py-2 border transition-colors ${
                  i === step ? "bg-[#C9A84C]/10 border-[#C9A84C]" : i < step ? "bg-white/[0.04] border-white/[0.08]" : "border-white/[0.06]"
                }`}>
                  {i < step ? <Check size={14} className="text-[#C9A84C]" /> : <span className="text-[11px] text-white/40">{i + 1}</span>}
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${i === step ? "text-[#C9A84C]" : i < step ? "text-white/60" : "text-white/30"}`}>{s}</span>
                </div>
                {i < STEPS.length - 1 && <ChevronRight size={14} className="text-white/20" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 0 && (
              <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
                <h2 className="text-white font-bold text-lg mb-4">Vehicle Details</h2>
                <div className="flex gap-4">
                  <div className="relative w-32 h-24 shrink-0">
                    <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#C9A84C]/60 uppercase tracking-wider mb-1">{car.brand}</p>
                    <p className="text-white font-bold text-[15px]">{car.year} {car.name}</p>
                    <p className="text-white/40 text-[12px] mt-1">{car.mileage.toLocaleString()} mi • {car.fuel}</p>
                    <p className="text-[#C9A84C] font-bold text-[17px] mt-2">${car.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Truck size={18} className="text-[#C9A84C]" />
                  <h2 className="text-white font-bold text-lg">Delivery Options</h2>
                </div>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border border-white/[0.08] cursor-pointer hover:border-[#C9A84C]/40 transition-colors">
                    <input type="radio" name="delivery" checked={formData.deliveryOption === "pickup"} onChange={() => setFormData({...formData, deliveryOption: "pickup"})} className="mt-1" />
                    <div>
                      <p className="text-white font-semibold text-[13px]">Showroom Pickup</p>
                      <p className="text-white/40 text-[11px] mt-1">Pick up from our showroom • Free</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border border-white/[0.08] cursor-pointer hover:border-[#C9A84C]/40 transition-colors">
                    <input type="radio" name="delivery" checked={formData.deliveryOption === "delivery"} onChange={() => setFormData({...formData, deliveryOption: "delivery"})} className="mt-1" />
                    <div className="flex-1">
                      <p className="text-white font-semibold text-[13px]">Home Delivery</p>
                      <p className="text-white/40 text-[11px] mt-1">Delivered to your door • $500</p>
                      {formData.deliveryOption === "delivery" && (
                        <div className="mt-3 space-y-2">
                          <input type="text" placeholder="Delivery Address" value={formData.deliveryAddress} onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] text-white/70 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40" />
                          <input type="date" value={formData.deliveryDate} onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] text-white/70 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40" />
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={18} className="text-[#C9A84C]" />
                  <h2 className="text-white font-bold text-lg">Insurance & Warranty</h2>
                </div>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 border border-white/[0.08] cursor-pointer hover:border-[#C9A84C]/40 transition-colors">
                    <input type="checkbox" checked={formData.insurance} onChange={(e) => setFormData({...formData, insurance: e.target.checked})} className="mt-1" />
                    <div className="flex-1">
                      <p className="text-white font-semibold text-[13px]">Add Insurance Coverage</p>
                      <p className="text-white/40 text-[11px] mt-1">Comprehensive coverage • $2,500/year</p>
                      {formData.insurance && (
                        <input type="text" placeholder="Insurance Provider (Optional)" value={formData.insuranceProvider} onChange={(e) => setFormData({...formData, insuranceProvider: e.target.value})} className="w-full mt-3 bg-white/[0.04] border border-white/[0.08] text-white/70 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40" />
                      )}
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border border-white/[0.08] cursor-pointer hover:border-[#C9A84C]/40 transition-colors">
                    <input type="checkbox" checked={formData.warranty} onChange={(e) => setFormData({...formData, warranty: e.target.checked})} className="mt-1" />
                    <div className="flex-1">
                      <p className="text-white font-semibold text-[13px]">Extended Warranty</p>
                      <p className="text-white/40 text-[11px] mt-1">Bumper-to-bumper coverage</p>
                      {formData.warranty && (
                        <select value={formData.warrantyYears} onChange={(e) => setFormData({...formData, warrantyYears: Number(e.target.value)})} className="w-full mt-3 bg-white/[0.04] border border-white/[0.08] text-white/70 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40">
                          <option value={3}>3 Years - $3,600</option>
                          <option value={5}>5 Years - $6,000</option>
                          <option value={7}>7 Years - $8,400</option>
                        </select>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign size={18} className="text-[#C9A84C]" />
                  <h2 className="text-white font-bold text-lg">Trade-In</h2>
                </div>
                <label className="flex items-start gap-3 p-4 border border-white/[0.08] cursor-pointer hover:border-[#C9A84C]/40 transition-colors">
                  <input type="checkbox" checked={formData.tradeIn} onChange={(e) => setFormData({...formData, tradeIn: e.target.checked})} className="mt-1" />
                  <div className="flex-1">
                    <p className="text-white font-semibold text-[13px]">I have a vehicle to trade in</p>
                    <p className="text-white/40 text-[11px] mt-1">Reduce your down payment</p>
                    {formData.tradeIn && (
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Make" value={formData.tradeInMake} onChange={(e) => setFormData({...formData, tradeInMake: e.target.value})} className="bg-white/[0.04] border border-white/[0.08] text-white/70 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40" />
                        <input type="text" placeholder="Model" value={formData.tradeInModel} onChange={(e) => setFormData({...formData, tradeInModel: e.target.value})} className="bg-white/[0.04] border border-white/[0.08] text-white/70 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40" />
                        <input type="text" placeholder="Year" value={formData.tradeInYear} onChange={(e) => setFormData({...formData, tradeInYear: e.target.value})} className="bg-white/[0.04] border border-white/[0.08] text-white/70 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40" />
                        <input type="text" placeholder="Mileage" value={formData.tradeInMileage} onChange={(e) => setFormData({...formData, tradeInMileage: e.target.value})} className="bg-white/[0.04] border border-white/[0.08] text-white/70 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40" />
                        <input type="number" placeholder="Estimated Value" value={formData.tradeInValue || ""} onChange={(e) => setFormData({...formData, tradeInValue: Number(e.target.value)})} className="col-span-2 bg-white/[0.04] border border-white/[0.08] text-white/70 text-[12px] px-3 py-2 focus:outline-none focus:border-[#C9A84C]/40" />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            )}

            {step === 4 && (
              <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText size={18} className="text-[#C9A84C]" />
                  <h2 className="text-white font-bold text-lg">Order Summary</h2>
                </div>
                <div className="space-y-3 text-[13px]">
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-white/60">Vehicle Price</span>
                    <span className="text-white font-semibold">${car.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/[0.06]">
                    <span className="text-white/60">Down Payment (60%)</span>
                    <span className="text-white font-semibold">${downPayment.toLocaleString()}</span>
                  </div>
                  {formData.deliveryOption === "delivery" && (
                    <div className="flex justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-white/60">Delivery Fee</span>
                      <span className="text-white font-semibold">$500</span>
                    </div>
                  )}
                  {formData.insurance && (
                    <div className="flex justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-white/60">Insurance (1 year)</span>
                      <span className="text-white font-semibold">$2,500</span>
                    </div>
                  )}
                  {formData.warranty && (
                    <div className="flex justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-white/60">Warranty ({formData.warrantyYears} years)</span>
                      <span className="text-white font-semibold">${(formData.warrantyYears * 1200).toLocaleString()}</span>
                    </div>
                  )}
                  {formData.tradeIn && formData.tradeInValue > 0 && (
                    <div className="flex justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-white/60">Trade-In Credit</span>
                      <span className="text-emerald-400 font-semibold">-${formData.tradeInValue.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-t border-white/[0.08]">
                    <span className="text-white font-bold text-[15px]">Total Due Today</span>
                    <span className="text-[#C9A84C] font-bold text-[18px]">${totalDue.toLocaleString()}</span>
                  </div>
                  <div className="bg-white/[0.04] p-3 border border-white/[0.06] mt-4">
                    <p className="text-white/40 text-[11px] mb-1">Monthly Payment (60 months @ 3.9% APR)</p>
                    <p className="text-white font-bold text-[16px]">${monthlyPayment.toFixed(0)}/mo</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-white/[0.08] text-white/60 text-[11px] font-bold uppercase tracking-wider hover:border-white/20 transition-colors">
                  Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button onClick={handleNext} className="btn-gold flex-1 px-6 py-3 text-[11px] font-bold uppercase tracking-wider">
                  Continue
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading} className="btn-gold flex-1 px-6 py-3 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  {loading ? "Processing..." : <><CreditCard size={14} /> Place Order</>}
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#0d0d0d] border border-white/[0.06] p-6 sticky top-24">
              <h3 className="text-white font-bold text-[15px] mb-4">Order Summary</h3>
              <div className="relative aspect-[16/10] mb-4">
                <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
              </div>
              <p className="text-[10px] text-[#C9A84C]/60 uppercase tracking-wider mb-1">{car.brand}</p>
              <p className="text-white font-bold text-[15px] mb-4">{car.year} {car.name}</p>
              <div className="space-y-2 text-[12px] mb-4">
                <div className="flex justify-between">
                  <span className="text-white/40">Vehicle Price</span>
                  <span className="text-white/70">${car.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Down Payment</span>
                  <span className="text-white/70">${downPayment.toLocaleString()}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex justify-between mb-2">
                  <span className="text-white font-semibold text-[13px]">Due Today</span>
                  <span className="text-[#C9A84C] font-bold text-[16px]">${totalDue.toLocaleString()}</span>
                </div>
                <p className="text-white/30 text-[10px]">+ ${monthlyPayment.toFixed(0)}/mo for 60 months</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
