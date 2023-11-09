import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/providers/SessionProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import ConfettiProvider from "@/components/providers/ConfettiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PES Academy",
  description: "Developing the next generation of businesses",
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
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
