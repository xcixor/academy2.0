import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/providers/SessionProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import ConfettiProvider from "@/components/providers/ConfettiProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PES Academy",
    template: `%s | PES Academy`
  },
  description: "Join us on a transformative journey at PES Academy, where innovation meets education, developing the leaders of tomorrow's successful enterprises.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
