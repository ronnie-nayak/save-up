import type { Metadata, Viewport } from "next";
import { cache } from "react";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";
import { Sidebar } from "@acme/ui";
import { MoneyForm } from "~/_components/nav";
import Provider from "./provider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
      >
        <div className="flex text-white bg-[#121e2c] font-bold w-full h-screen">
          <TRPCReactProvider headersPromise={getHeaders()}>
            <Provider>
              <Sidebar addMoney={<MoneyForm />} />
              {props.children}
            </Provider>
          </TRPCReactProvider>
        </div>
      </body>
    </html >
  );
}
