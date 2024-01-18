

"use client"
import { BillItem, BillItemBig, Button, Calendar, FormControl, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, cn } from "@acme/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { apiReact } from "~/trpc/react";
import { GetBillsType } from "@acme/validators";

export function BillsTable() {
  const [localData, setLocalData] = useState<GetBillsType[]>([])

  const { data, isLoading, error } = apiReact.transactions.getAllBills.useQuery()

  const utils = apiReact.useUtils()
  const payBill = apiReact.transactions.payBill.useMutation(
    {
      onSuccess: () => {
        utils.transactions.getAllBills.invalidate()
      },
      onError: (error) => {
        router.replace("/login")
      }
    }
  )
  useEffect(() => {
    if (data) setLocalData(() => [...data])
  }, [data])

  const endPage = Math.ceil(localData.length / 4)

  const [sorted, setSorted] = useState(null)
  const [dir, setDir] = useState(1)

  const sortingFunction = (event) => {
    let direction = 1
    let column = event.target.id
    if (sorted === column) {
      direction = -dir
      setDir(old => -old)
    } else {
      setSorted(old => column)
      setDir(old => 1)
    }
    const sortedData = localData.sort((a, b) => {
      if (a[column] >= b[column]) {
        return direction
      }
      return -direction
    })
    setLocalData(old => [...sortedData])
  }


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
        if (data) filteredData = data.filter((row) => row.title.toLowerCase().includes(search.toLowerCase()))
        setLocalData(() => [...filteredData])
        setPage(1)
        // setLocalData(() => [...dataTable.filter((row) => row.title.toLowerCase().includes(search.toLowerCase()))])
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [searchParams])


  const [page, setPage] = useState(1)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="h-min  m-10  dark">
      <form className="bg-midnight p-6 rounded-3xl flex gap-6">
        <Button className="rounded-full" type="reset" onClick={() => {
          router.replace("/bills")
        }}>Clear</Button>
        <Input type="text" placeholder="Search" className="w-1/2" onChange={(event) => router.replace(pathname + '?' + createQueryString('title', event.target.value))} />
      </form>

      <Button className="mt-8 ml-20 p-4 bg-midnight rounded-full">
        <h2 id="title" className="text-lg" onClick={(e) => sortingFunction(e)}>title</h2>
      </Button>
      <section className="h-[550px] p-5 ">
        <AnimatePresence>
          {(localData.map((row, i) => (
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
              {/* <h2 className="w-5/12">{row.title}</h2> */}
              {/* <h2 className="w-3/12">{row.amount}</h2> */}
              {/* <h2 className="w-4/12">{row.dueAt.toDateString()}</h2> */}
              <Button onClick={() => {
                payBill.mutate(row)
                // console.log(row)
                // console.log(new Date(row.dueAt.setMonth(row.dueAt.getMonth() + 1)))
              }}>Pay Bill</Button>
            </motion.div >
          ))).slice((page - 1) * 4, page * 4)}
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
