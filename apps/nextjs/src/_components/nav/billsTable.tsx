

"use client"
import { BillItem, BillItemBig, Button, Calendar, FormControl, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, cn } from "@acme/ui";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { apiReact } from "~/trpc/react";
import { GetBillsType } from "@acme/validators";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";

export function BillsTable() {
  const [localData, setLocalData] = useState<GetBillsType[]>([])


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
  const { data, isLoading, error } = apiReact.transactions.getAllBills.useQuery()
  if (error) {
    utils.transactions.sessionExists.invalidate()
  }

  const payBill = apiReact.transactions.payBill.useMutation(
    {
      onSuccess: () => {
        utils.transactions.getAllBills.invalidate()
      },
      onError: (error) => {
        utils.transactions.sessionExists.invalidate()
      }
    }
  )
  useEffect(() => {
    if (data) setLocalData(() => [...data])
  }, [data])

  const endPage = Math.ceil(localData.length / 4)

  const [sorted, setSorted] = useState(null)
  const [dir, setDir] = useState(1)

  const sortingFunction = () => {
    let direction = dir
    setDir(old => -old)

    const sortedData = localData.sort((a, b) => {
      // @ts-ignore
      if (a.title >= b.title) {
        return direction
      }
      return -direction
    })
    setLocalData(old => [...sortedData])
  }



  useEffect(() => {
    if (localData) {

      const timeout = setTimeout(() => {
        const search = searchParams.has("title") ? searchParams.get("title") : ""
        let filteredData = localData
        if (data) filteredData = data.filter((row) => row.title?.toLowerCase().includes(search?.toLowerCase()!))
        setLocalData(() => [...filteredData])
        setPage(1)
        // setLocalData(() => [...dataTable.filter((row) => row.title.toLowerCase().includes(search.toLowerCase()))])
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [searchParams])


  const [page, setPage] = useState(1)

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="h-min dark">
      <form className="bg-midnight p-6 rounded-3xl flex gap-6">
        <Button className="rounded-full" type="reset" onClick={() => {
          router.replace("/bills")
        }}>Clear</Button>
        <Input type="text" placeholder="Search" className="w-1/2" onChange={(event) => router.replace(pathname + '?' + createQueryString('title', event.target.value))} />
      </form>

      <Button className="mt-3 ml-20 p-4 bg-midnight rounded-full">
        <h2 id="title" className="text-[1vw]" onClick={sortingFunction}>title{sorted === "title" ? (dir === 1 ? <FaSortDown /> : <FaSortUp />) : <FaSort />}</h2>
      </Button>
      <section className="my-2 ">
        <AnimatePresence>
          {localData.length === 0 ? <div>No items bills</div> :
            (localData.map((row) => (
              <motion.div key={row.id} layoutId={"" + row.id} className="flex items-center gap-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              >
                <BillItemBig data={row} />
                <Button className="bg-green-500 h-16 text-[1vw] font-bold" onClick={() => {
                  payBill.mutate(row)
                }}><div className="flex gap-4 items-center">
                    <LiaMoneyBillWaveSolid />
                    <h3>Pay Bill</h3>
                  </div>
                </Button>

              </motion.div >
            ))).slice((page - 1) * 4, page * 4)}
        </AnimatePresence>
      </section>

      <div className="flex gap-6 items-center p-1 px-10">
        <Button disabled={page === 1 ? true : false} onClick={() => setPage(old => old - 1)}>Previous</Button>
        <Button disabled={endPage === page || !endPage ? true : false} onClick={() => setPage(old => old + 1)}>Next</Button>
        <p>Page {!endPage ? 0 : page} of {endPage}</p>
      </div>
    </div >
  )
}
