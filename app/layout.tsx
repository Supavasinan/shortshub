import { auth } from "@/auth";
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { fontMonoOne, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "ShortsHub",
  description: "ShortsHub",
};

type RootLayoutProps = {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {

  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={cn("flex relative min-h-screen flex-col", fontMonoOne.variable, fontSans.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
