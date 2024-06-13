"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa6";

import { AppPageUI, Loading, SidebarUI } from "@acme/ui";

import { apiReact } from "~/trpc/react";

export default function Homepage() {
  const router = useRouter();
  const {
    data: sessionExists,
    isLoading,
    isError,
  } = apiReact.transactions.sessionExists.useQuery();
  if (isError) {
    return notFound();
  }
  if (!isLoading && sessionExists) {
    router.replace("/homepage");
  }
  if (isLoading || sessionExists)
    return (
      <div className="h-screen w-screen">
        <Loading />
      </div>
    );

  return (
    <div className="relative flex h-screen w-full bg-[#121e2c] font-bold text-white">
      <div className="hidden w-3/12 sm:block">
        <SidebarUI />
      </div>
      {/* <div className="w-4/12 hidden sm:block"> */}
      {/* </div> */}
      <main className="dark w-full overflow-scroll">
        <div className="m-8 flex items-center gap-4">
          <Link href="/login" className="sm:hidden">
            <FaBars size={29} />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-3xl bg-white p-4 text-black transition hover:bg-purple hover:text-white"
            >
              SignIn
            </Link>
          </div>
        </div>
        <AppPageUI />
      </main>
    </div>
  );
}
