'use client'
import { AppPageUI, Sidebar, SidebarUI } from "@acme/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoneyForm } from "~/_components/nav";
import { apiReact } from "~/trpc/react";

export default function Homepage() {
  const router = useRouter()
  const { data: sessionExists, isLoading } = apiReact.transactions.sessionExists.useQuery()
  if (isLoading) return <div>Loading...</div>
  console.log(sessionExists)

  if (sessionExists) {
    router.replace("/homepage")
  }
  return (
    <div className="flex text-white bg-[#121e2c] font-bold w-full h-screen relative">
      <SidebarUI />
      <div className="w-4/12">
      </div>
      <main className="overflow-scroll w-full dark">

        <div className="flex m-8 gap-4 items-center">
          <div className="flex items-center gap-4">
            <Link href="/login" className="p-4 rounded-3xl bg-white text-black">SignIn</Link>
          </div>

          <h1 className="text-[1.25vw] font-bold">Hello Rony!</h1>
        </div>
        <AppPageUI />
      </main >
    </div>
  );
}
