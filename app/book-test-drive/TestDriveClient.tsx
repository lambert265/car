"use client";
import { useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { CARS } from "@/lib/cars";
import Image from "next/image";
import { Calendar, Clock, MapPin, User, Mail, Phone, Car } from "lucide-react";
import toast from "react-hot-toast";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const LOCATIONS = [
  { id: 1, name: "Downtown Showroom", address: "123 Luxury Ave, New York, NY 10001" },
  { id: 2, name: "Westside Gallery", address: "456 Premium Blvd, Los Angeles, CA 90001" },
  { id: 3, name: "North Branch", address: "789 Elite Street, Chicago, IL 60601" },
];

export default function TestDriveClient() {
  const router = useRouter();
  const params = useSearchParams();
  const carId = params.get("carId");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const car = carId ? CARS.find(c => c.id === Number(carId)) : null;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0].id);
  const [formData, setFormData] = useState({
    name: user?.email?.split("@")[0] || "",
    email: user?.email || "",
    phone: "",
    notes: "",
  });

  const weekDays = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error("Please select date and time");
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Test drive booked successfully!");
      router.push("/account");
    } catch (error) {
      toast.error("Failed to book test drive");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[68px] bg-[#080808] min-h-screen">
      <div className="bg-[#0a0a0a] border-b border-white/[0.05] py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <Car size={20} className="text-[#C9A84C]" />
            <h1 className="text-white font-bold text-2xl sm:text-3xl">Book a Test Drive</h1>
          </div>
          <p className="text-white/30 text-[13px] sm:text-[14px]">Experience luxury firsthand</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {car && (
              <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
                <h2 className="text-white font-bold text-[15px] mb-4">Selected Vehicle</h2>
                <div className="flex gap-4">
                  <div className="relative w-32 h-24 shrink-0">
                    <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#C9A84C]/60 uppercase tracking-wider mb-1">{car.brand}</p>
                    <p className="text-white font-bold text-[15px]">{car.year} {car.name}</p>
                    <p className="text-white/40 text-[12px] mt-1">{car.mileage.toLocaleString()} mi • {car.fuel}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={18} className="text-[#C9A84C]" />
                <h2 className="text-white font-bold text-[15px]">Select Location</h2>
              </div>
              <div className="space-y-2">
                {LOCATIONS.map(loc => (
                  <label key={loc.id} className="flex items-start gap-3 p-3 border border-white/[0.08] cursor-pointer hover:border-[#C9A84C]/40 transition-colors">
                    <input type="radio" name="location" checked={selectedLocation === loc.id} onChange={() => setSelectedLocation(loc.id)} className="mt-1" />
                    <div>
                      <p className="text-white font-semibold text-[13px]">{loc.name}</p>
                      <p className="text-white/40 text-[11px] mt-0.5">{loc.address}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar size={18} className="text-[#C9A84C]" />
                <h2 className="text-white font-bold text-[15px]">Select Date</h2>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map(day => {
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`p-3 border text-center transition-colors ${
                        isSelected ? "bg-[#C9A84C]/10 border-[#C9A84C]" : "border-white/[0.08] hover:border-white/20"
                      }`}
                    >
                      <p className={`text-[10px] uppercase tracking-wider mb-1 ${isSelected ? "text-[#C9A84C]" : "text-white/40"}`}>
                        {format(day, "EEE")}
                      </p>
                      <p className={`text-[15px] font-bold ${isSelected ? "text-[#C9A84C]" : "text-white/60"}`}>
                        {format(day, "d")}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDate && (
              <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={18} className="text-[#C9A84C]" />
                  <h2 className="text-white font-bold text-[15px]">Select Time</h2>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 border text-[12px] font-semibold transition-colors ${
                        selectedTime === time ? "bg-[#C9A84C]/10 border-[#C9A84C] text-[#C9A84C]" : "border-white/[0.08] text-white/60 hover:border-white/20"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#0d0d0d] border border-white/[0.06] p-6">
              <div className="flex items-center gap-3 mb-4">
                <User size={18} className="text-[#C9A84C]" />
                <h2 className="text-white font-bold text-[15px]">Your Information</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-white/40 text-[11px] uppercase tracking-wider mb-2 block">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] text-white/70 text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40" />
                </div>
                <div>
                  <label className="text-white/40 text-[11px] uppercase tracking-wider mb-2 block">Email *</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] text-white/70 text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40" />
                </div>
                <div>
                  <label className="text-white/40 text-[11px] uppercase tracking-wider mb-2 block">Phone *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] text-white/70 text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40" />
                </div>
                <div>
                  <label className="text-white/40 text-[11px] uppercase tracking-wider mb-2 block">Additional Notes</label>
                  <textarea rows={3} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full bg-white/[0.04] border border-white/[0.08] text-white/70 text-[13px] px-3 py-2.5 focus:outline-none focus:border-[#C9A84C]/40 resize-none" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold w-full px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider">
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#0d0d0d] border border-white/[0.06] p-6 sticky top-24">
              <h3 className="text-white font-bold text-[15px] mb-4">Booking Summary</h3>
              {car && (
                <>
                  <div className="relative aspect-[16/10] mb-4">
                    <Image src={car.images[0]} alt={car.name} fill className="object-cover" />
                  </div>
                  <p className="text-[10px] text-[#C9A84C]/60 uppercase tracking-wider mb-1">{car.brand}</p>
                  <p className="text-white font-bold text-[14px] mb-4">{car.year} {car.name}</p>
                </>
              )}
              <div className="space-y-3 text-[12px] pt-4 border-t border-white/[0.06]">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-white/70">{LOCATIONS.find(l => l.id === selectedLocation)?.name}</p>
                  </div>
                </div>
                {selectedDate && (
                  <div className="flex items-start gap-2">
                    <Calendar size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Date</p>
                      <p className="text-white/70">{format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
                    </div>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex items-start gap-2">
                    <Clock size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">Time</p>
                      <p className="text-white/70">{selectedTime}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 p-3 bg-[#C9A84C]/5 border border-[#C9A84C]/20">
                <p className="text-white/60 text-[11px]">
                  <span className="text-[#C9A84C] font-semibold">Note:</span> Please bring a valid driver's license. Test drives typically last 30-45 minutes.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
