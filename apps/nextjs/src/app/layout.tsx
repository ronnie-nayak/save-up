import type { Metadata, Viewport } from "next";
import { cache } from "react";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jullerino",
    creator: "@jullerino",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const getHeaders = cache(async () => headers());

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className="sm:text-[0.85vw]" suppressHydrationWarning>
      <body className={inter.className}>
        <TRPCReactProvider headersPromise={getHeaders()}>
          <Provider>{props.children}</Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
