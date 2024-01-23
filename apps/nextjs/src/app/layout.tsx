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
      ? "https://save-up-web.vercel.app"
      : "http://localhost:3000",
  ),
  title: "Save Up",
  description: "Money Management Tracker",
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
