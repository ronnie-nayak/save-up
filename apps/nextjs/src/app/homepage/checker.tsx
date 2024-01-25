"use client";

import { notFound, useRouter } from "next/navigation";

import { Loading } from "@acme/ui";

import { apiReact } from "~/trpc/react";

export default function Checker(props: { children: React.ReactNode }) {
  const router = useRouter();
  const {
    data: sessionExists,
    isLoading,
    isError,
  } = apiReact.transactions.sessionExists.useQuery();
  if (isError) {
    return notFound();
  }
  if (!sessionExists) {
    router.replace("/login");
  }
  if (isLoading || !sessionExists)
    return (
      <div className="h-screen w-screen">
        <Loading />
      </div>
    );
  return props.children;
}
