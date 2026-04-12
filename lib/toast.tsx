"use client";
import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#0d0d0d",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.08)",
        },
        success: {
          iconTheme: {
            primary: "#C9A84C",
            secondary: "#0d0d0d",
          },
        },
      }}
    />
  );
}
