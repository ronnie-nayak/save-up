"use client"
import { TRPCReactProvider } from "~/trpc/react";
import { Sidebar } from "@acme/ui";


export default function Provider(props: { children: React.ReactNode, header: Promise<Headers> }) {
  return (

    <div className="flex text-white bg-[#121e2c] font-bold">
      <Sidebar />
      <TRPCReactProvider headersPromise={props.header}>
        {props.children}
      </TRPCReactProvider>
    </div>
  )
}
