
"use client"
import { Button, Calendar, FormControl, Input, Popover, PopoverContent, PopoverTrigger, SavingsItem, SavingsItemBig, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, cn } from "@acme/ui";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { apiReact } from "~/trpc/react";
import { GetSavingsType } from "@acme/validators";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export function SavingsTable() {
  const [localData, setLocalData] = useState<GetSavingsType[]>([])


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

  const utils = apiReact.useUtils()
  const { data, isLoading, error } = apiReact.transactions.getAllSavings.useQuery()
  if (error) {
    utils.transactions.sessionExists.invalidate()
    // router.replace('/login')
  }

  const contributeToSavings = apiReact.transactions.contributeToSavings.useMutation(
    {
      onSuccess: (data) => {
        utils.transactions.getAllSavings.invalidate()
      },
      onError: (error) => {
        utils.transactions.sessionExists.invalidate()
        // router.replace("/login")
      }
    }
  )
  const deleteSavings = apiReact.transactions.deleteSavings.useMutation(
    {
      onSuccess: (data) => {
        utils.transactions.getAllSavings.invalidate()
      },
      onError: (error) => {
        utils.transactions.sessionExists.invalidate()
        // router.replace("/login")
      }
    }
  )
  useEffect(() => {
    if (data) setLocalData(() => data)
  }, [data])


  const endPage = Math.ceil(localData.length / 3)



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
    // contributeToSavings.mutate
    contributeToSavings.mutate({ title: row.title, category: row.category, current: row.current, amount: row.amount, additional: parseInt(e.target[0].value), savingsId: row.id })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="text-left h-min dark">

      <form className="bg-midnight p-6 rounded-3xl flex gap-6">
        <Button className="rounded-full" type="reset" onClick={() => {
          router.replace("/homepage/savings")
        }}>Clear</Button>
        <Input type="text" placeholder="Search" className="w-1/2" onChange={(event) => router.replace(pathname + '?' + createQueryString('title', event.target.value))} />
      </form>

      <section className="my-2">
        <AnimatePresence>
          {localData.length === 0 ? <div>No items savings</div> :
            ((localData.map((row) => (
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
                  <PopoverTrigger>
                    <Button className="bg-orange-500 h-16 text-[1vw] font-bold" disabled={row.amount === row.current}>
                      <div className="flex gap-4 items-center">
                        <FiPlusCircle />
                        <h3>Add to Savings</h3>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <form onSubmit={(e) => contributeToSavingsHandler(row, e)}>
                      <h1>Add to savings</h1>
                      <Input type="number" placeholder="Amount" max={row.amount - row.current} min={0} />
                      <Button  >Submit</Button>
                    </form>

                  </PopoverContent>
                </Popover>
                <Button className="bg-green-500 h-16 text-[1vw] font-bold" disabled={row.amount !== row.current} onClick={() => deleteSavings.mutate({ savingsId: row.id })}>

                  <div className="flex gap-4 items-center">
                    <IoIosCheckmarkCircleOutline />
                    <h3>Complete</h3>
                  </div>
                </Button>
              </motion.div >
            ))).slice((page - 1) * 3, page * 3))}
        </AnimatePresence>
      </section>

      <div className="flex gap-6 items-center p-4 px-10">
        <Button disabled={page === 1 ? true : false} onClick={() => setPage(old => old - 1)}>Previous</Button>
        <Button disabled={endPage === page || !endPage ? true : false} onClick={() => setPage(old => old + 1)}>Next</Button>
        <p>Page {!endPage ? 0 : page} of {endPage}</p>
      </div>
    </div >
  )
}
