'use client';
import { useEffect } from 'react';
import "./globals.css";
import { Inter } from "next/font/google";
import SessionProvider from "@/providers/SessionProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import ConfettiProvider from "@/components/providers/ConfettiProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])
  
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
