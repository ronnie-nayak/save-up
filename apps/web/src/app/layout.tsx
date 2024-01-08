import type { Metadata } from "next";
import { Inter } from 'next/font/google'

import { cache } from "react";
import { headers } from "next/headers";


import "~/app/globals.css";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
};


const getHeaders = cache(async () => headers());

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      <body
        className={inter.className}
      >
        <Provider header={getHeaders()}>
          {props.children}
        </Provider>
      </body>
    </html >
  );
}
