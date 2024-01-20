'use client'
import { useRouter } from "next/navigation";
import { apiReact } from "~/trpc/react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const { data: sessionExists, isLoading } = apiReact.transactions.sessionExists.useQuery()
  const router = useRouter()

  if (isLoading) return <div>Loading...</div>
  console.log(sessionExists)
  if (sessionExists) {
    router.replace("/homepage")
  }
  return (
    <div>
      {children}
    </div>
  )
}
