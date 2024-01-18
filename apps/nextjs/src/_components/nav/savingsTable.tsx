
"use client"
import { Button, Calendar, FormControl, Input, Popover, PopoverContent, PopoverTrigger, SavingsItem, SavingsItemBig, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, cn } from "@acme/ui";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { apiReact } from "~/trpc/react";
import { GetSavingsType } from "@acme/validators";
import clsx from "clsx";

export function SavingsTable() {
  const [localData, setLocalData] = useState<GetSavingsType[]>([])

  const { data, isLoading, error } = apiReact.transactions.getAllSavings.useQuery()

  const utils = apiReact.useUtils()
  const contributeToSavings = apiReact.transactions.contributeToSavings.useMutation(
    {
      onSuccess: (data) => {
        console.log(data[0])
        utils.transactions.getAllSavings.invalidate()
      },
      onError: (error) => {
        router.replace("/login")
      }
    }
  )
  const deleteSavings = apiReact.transactions.deleteSavings.useMutation(
    {
      onSuccess: (data) => {
        console.log(data)
        utils.transactions.getAllSavings.invalidate()
      },
      onError: (error) => {
        router.replace("/login")
      }
    }
  )
  useEffect(() => {
    if (data) setLocalData(() => data)
  }, [data])


  const endPage = Math.ceil(localData.length / 3)


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

  useEffect(() => {
    if (localData) {

      const timeout = setTimeout(() => {
        const search = searchParams.has("title") ? searchParams.get("title") : ""
        let filteredData = localData
        if (data) filteredData = data.filter((row) => row.title.toLowerCase().includes(search?.toLowerCase()!))
        setLocalData(() => [...filteredData])
        setPage(1)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [searchParams])


  const [page, setPage] = useState(1)


  const contributeToSavingsHandler = (row: GetSavingsType, e) => {
    e.preventDefault()
    console.log(e.target[0].value)
    // contributeToSavings.mutate
    contributeToSavings.mutate({ title: row.title, category: row.category, current: row.current, amount: row.amount, additional: parseInt(e.target[0].value), savingsId: row.id })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="text-left h-min  m-10  dark">
      <form className="bg-midnight p-6 rounded-3xl flex gap-6">
        <Button className="rounded-full" type="reset" onClick={() => {
          router.replace("/homepage/savings")
        }}>Clear</Button>
        <Input type="text" placeholder="Search" className="w-1/2" onChange={(event) => router.replace(pathname + '?' + createQueryString('title', event.target.value))} />
      </form>

      <section className="h-[550px] p-5 ">
        <AnimatePresence>
          {localData.length ? ((localData.map((row, i) => (
            <motion.div key={row.id} layoutId={"" + row.id} className="flex items-center gap-6"
              style={{
                color: row.color
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30

              }}
            >
              <SavingsItemBig data={row} />
              <Popover>
                <PopoverTrigger><Button disabled={row.amount === row.current}>Add to savings</Button></PopoverTrigger>
                <PopoverContent>
                  <form onSubmit={(e) => contributeToSavingsHandler(row, e)}>
                    <h1>Add to savings</h1>
                    <Input type="number" placeholder="Amount" max={row.amount - row.current} min={0} />
                    <Button  >Submit</Button>
                  </form>

                </PopoverContent>
              </Popover>
              <Button disabled={row.amount !== row.current} onClick={() => deleteSavings.mutate({ savingsId: row.id })}>Complete</Button>
            </motion.div >
          ))).slice((page - 1) * 3, page * 3)) : (<div>No items</div>)}
        </AnimatePresence>
      </section>

      <div className="flex gap-6 items-center p-10">
        <Button disabled={page === 1 ? true : false} onClick={() => setPage(old => old - 1)}>Previous</Button>
        <Button disabled={endPage === page || !endPage ? true : false} onClick={() => setPage(old => old + 1)}>Next</Button>
        <p>Page {!endPage ? 0 : page} of {endPage}</p>
      </div>
    </div >
  )
}
