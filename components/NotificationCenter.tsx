"use client";
import { useState, useEffect, useContext } from "react";
import { Bell, X, Check, TrendingDown, Package, Calendar } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { format } from "date-fns";

interface Notification {
  id: number;
  type: "price_drop" | "new_inventory" | "appointment_reminder" | "order_update";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "price_drop",
    title: "Price Drop Alert",
    message: "2024 Porsche 911 Carrera S dropped by $5,000",
    read: false,
    link: "/inventory/3",
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: 2,
    type: "new_inventory",
    title: "New Arrival",
    message: "2024 Mercedes-AMG GT R Pro just added to inventory",
    read: false,
    link: "/inventory/20",
    createdAt: new Date(Date.now() - 7200000),
  },
];

export default function NotificationCenter() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "price_drop": return <TrendingDown size={16} className="text-emerald-400" />;
      case "new_inventory": return <Package size={16} className="text-[#C9A84C]" />;
      case "appointment_reminder": return <Calendar size={16} className="text-blue-400" />;
      case "order_update": return <Check size={16} className="text-emerald-400" />;
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-white/40 hover:text-white transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A84C] text-black text-[9px] font-bold flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-[#0d0d0d] border border-white/[0.08] shadow-2xl z-50 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-[#C9A84C]" />
                <h3 className="text-white font-bold text-[13px]">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] font-bold rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] text-white/40 hover:text-[#C9A84C] transition-colors uppercase tracking-wider"
                  >
                    Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="text-white/30 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell size={32} className="text-white/10 mx-auto mb-3" />
                  <p className="text-white/30 text-[13px]">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-white/[0.06]">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 hover:bg-white/[0.02] transition-colors ${!notif.read ? "bg-white/[0.02]" : ""}`}
                    >
                      <div className="flex gap-3">
                        <div className="shrink-0 mt-0.5">{getIcon(notif.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={`text-[13px] font-semibold ${notif.read ? "text-white/60" : "text-white"}`}>
                              {notif.title}
                            </h4>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-[#C9A84C] rounded-full shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-white/40 text-[12px] mb-2">{notif.message}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-white/25 text-[10px]">
                              {format(notif.createdAt, "MMM d, h:mm a")}
                            </span>
                            <div className="flex items-center gap-2">
                              {!notif.read && (
                                <button
                                  onClick={() => markAsRead(notif.id)}
                                  className="text-[10px] text-[#C9A84C]/70 hover:text-[#C9A84C] transition-colors uppercase tracking-wider"
                                >
                                  Mark read
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notif.id)}
                                className="text-white/20 hover:text-white/60 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          </div>
                          {notif.link && (
                            <a
                              href={notif.link}
                              className="inline-block mt-2 text-[11px] text-[#C9A84C] hover:text-[#E8C97A] transition-colors uppercase tracking-wider"
                            >
                              View →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
