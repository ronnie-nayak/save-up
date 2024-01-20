"use client"
import { Button, Calendar, FormControl, Input, Popover, PopoverContent, PopoverTrigger, PopupButton, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, cn } from "@acme/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { CalendarIcon } from "lucide-react";
import { apiReact } from "~/trpc/react";
import { GetMoneyType } from "@acme/validators";
import { FormOpenState } from '@acme/atoms'

import { useRecoilState } from "recoil";
import { MoneyForm } from ".";

export function DataTable() {
  const [localData, setLocalData] = useState<GetMoneyType[]>([])

  const [formOpen, setFormOpen] = useRecoilState(FormOpenState)

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
  if (error) {
    router.replace('/login')
  }

  useEffect(() => {
    if (data) setLocalData(() => [...data])
  }, [data])


  const endPage = Math.ceil(localData.length / 6)

  const [sorted, setSorted] = useState("createdAt")
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








  useEffect(() => {

    // const [formOpen, setFormOpen] = useRecoilState(FormOpenState)

    if (localData) {

      const timeout = setTimeout(() => {
        const search = searchParams.has("title") ? searchParams.get("title") : ""
        const typeSearch = searchParams.has("type") ? searchParams.get("type") : null
        const startDateSearch = searchParams.has("startDate") ? searchParams.get("startDate") : null
        const endDateSearch = searchParams.has("endDate") ? searchParams.get("endDate") : null
        let filteredData = localData
        if (data) filteredData = data.filter((row) => row.title.toLowerCase().includes(search?.toLowerCase()!))
        if (typeSearch) filteredData = filteredData.filter((row) => row.type === typeSearch)
        if (startDateSearch) filteredData = filteredData.filter((row) => row.createdAt >= new Date(startDateSearch))
        if (endDateSearch) filteredData = filteredData.filter((row) => row.createdAt <= new Date(endDateSearch))
        setLocalData(() => [...filteredData])
        setPage(1)
        // setLocalData(() => [...dataTable.filter((row) => row.title.toLowerCase().includes(search.toLowerCase()))])
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [searchParams])


  const [search, setSearch] = useState("")
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    router.replace(pathname + '?' + createQueryString('title', event.target.value))
  }


  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [page, setPage] = useState(1)

  if (isLoading) return <div>Loading...</div>

  return (
    <div className=" text-left bg-midnight m-10 my-2 p-6 rounded-3xl dark">
      <div className="h-14 flex gap-4 items-center">
        <h1 className="text-[1.5vw] ">Transactions</h1>
        <PopupButton formOpen={formOpen} setFormOpen={setFormOpen}>
          <MoneyForm />
        </PopupButton>
      </div>
      <div className="flex gap-4 items-center">
        <Button type="reset" onClick={() => {
          router.replace("/homepage/transactions")
          setStartDate(null)
          setEndDate(null)
          setSearch("")
        }}>Clear</Button>
        <Input type="text" placeholder="Search" value={search} className="w-1/3" onChange={handleSearchChange} />
        <Select value={searchParams.has("type") ? searchParams.get("type")! : ""} onValueChange={(val) => router.replace(pathname + '?' + createQueryString('type', val))} >
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Select a verified email to display" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="income">income</SelectItem>
            <SelectItem value="expense">expense</SelectItem>
            <SelectItem value="savings">savings</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              {startDate ? (
                startDate.toDateString()) : (
                <span>Pick Start date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              onSelect={(date) => {
                setStartDate(date!)
                router.replace(pathname + '?' + createQueryString('startDate', date?.toDateString()!))
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <span className="text-6xl">&#8651;</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              {endDate ? (
                endDate.toDateString()) : (
                <span>Pick End date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              onSelect={(date) => {
                setEndDate(date!)
                router.replace(pathname + '?' + createQueryString('endDate', date?.toDateString()!))
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <header className="text-gray-500 flex m-9 my-4 text-[1.25vw]">
        <h2 id="title" className="w-4/12" onClick={(e) => sortingFunction(e)}>title</h2>
        <h2 id="type" className="w-3/12" onClick={(e) => sortingFunction(e)}>type</h2>
        <h2 id="amount" className="w-2/12" onClick={(e) => sortingFunction(e)}>amount</h2>
        <h2 id="createdAt" className="w-3/12" onClick={(e) => sortingFunction(e)}>createdAt</h2>
      </header>
      <Separator className="w-full" />
      <AnimatePresence>
        {localData.length === 0 ? <div>No items transations</div> :
          (localData.map((row) => (
            <div key={row.id} className="h-auto">
              <motion.div layoutId={"" + row.id} className="flex text-[1vw] m-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              >
                <div className="w-4/12">
                  <h2 className="pb-1">{row.title}</h2>
                  <h3 className="text-sm text-gray-500">{row.category}</h3>
                </div>
                <div className="w-3/12">
                  <div className="relative p-2 bg-bermuda rounded-full w-min flex gap-1 justify-center items-center text-base pl-8">
                    <button className={`absolute left-4 top-4 w-2 h-2 rounded-full animate-ping ${row.type === "income" ? "bg-green-500" : row.type === "expense" ? "bg-red-500" : "bg-blue-500"}`} />
                    <button className={`absolute left-4 top-4 w-2 h-2 rounded-full ${row.type === "income" ? "bg-green-500" : row.type === "expense" ? "bg-red-500" : "bg-blue-500"}`} />
                    {row.type}
                  </div>
                </div >
                <h2 className="w-2/12">{row.type === "expense" && "-"}${row.amount}</h2>
                <h2 className="w-3/12">{row.createdAt.toDateString()}</h2>
              </motion.div >
              <Separator className="w-full" />
            </div>
          ))).slice((page - 1) * 6, page * 6)}
      </AnimatePresence >
      <div className="flex gap-6 items-center mt-7 ml-10">
        <Button disabled={page === 1 ? true : false} onClick={() => setPage(old => old - 1)}>Previous</Button>
        <Button disabled={endPage === page || !endPage ? true : false} onClick={() => setPage(old => old + 1)}>Next</Button>
        <p>Page {!endPage ? 0 : page} of {endPage}</p>
      </div>
    </div >
  )
}
