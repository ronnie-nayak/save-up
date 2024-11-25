"use client";

import { useRouter } from "next/navigation";

import { Loading } from "@acme/ui";

export default function Page() {
  const router = useRouter();
  router.replace("/homepage/exercise/bicepCurl");
  return (
    <div>
      <Loading />
    </div>
  );
}
