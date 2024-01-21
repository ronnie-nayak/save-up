"use client";

import { notFound, useRouter } from "next/navigation";

import { Loading } from "@acme/ui";

import { apiReact } from "~/trpc/react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  return <div>{children}</div>;
}
