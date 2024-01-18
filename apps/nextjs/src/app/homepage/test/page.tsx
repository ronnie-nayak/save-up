'use client'

import { Button } from "@acme/ui"
import { motion } from "framer-motion"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useCallback } from "react"
import { apiReact } from "~/trpc/react"

export default function Test() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )
  const { data, isLoading, error } = apiReact.transactions.getAll.useQuery()
  console.log("data", data)
  let localdata = data
  console.log("localdata", localdata)

  const filterdata = () => {
    const rere = searchParams.get("rere") ? parseInt(searchParams.get("rere")) : 1
    const filtered = data.sort((a, b) => rere * (a.id - b.id))
    router.replace(pathname + '?' + createQueryString('rere', '' + rere * -1))
    localdata = filtered
    console.log("localdata", localdata)
  }
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <motion.div layout>
      {localdata && localdata.map((item) => (<motion.div layout key={item.id}>{item.id} - {item.title}</motion.div>))}
      <Button onClick={filterdata}>Filter</Button>
    </motion.div>
  )
}
