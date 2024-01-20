
'use client'
import { useRouter } from "next/navigation";
import { apiReact } from "~/trpc/react";

export default function Checker(props: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: sessionExists, isLoading } = apiReact.transactions.sessionExists.useQuery()
  if (isLoading) return <div>Loading...</div>
  console.log(sessionExists)
  if (!sessionExists) {
    router.replace("/login")
  }
  return props.children
}

