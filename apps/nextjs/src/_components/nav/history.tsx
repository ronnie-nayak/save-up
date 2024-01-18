"use client"
import { PopupButton } from "@acme/ui";
import { useRecoilState } from "recoil";
import { FormOpenState } from '@acme/atoms'
import { MoneyForm } from ".";
import { useEffect, useState } from "react";
import { apiReact } from "~/trpc/react";
import { GetMoneyType } from "@acme/validators";
import { motion } from "framer-motion";

export function History() {

  const [formOpen, setFormOpen] = useRecoilState(FormOpenState)

  const [localData, setLocalData] = useState<GetMoneyType[]>([])

  const { data, isLoading, error } = apiReact.transactions.getAll.useQuery()

  useEffect(() => {
    if (data) {
      const sortedData = data.sort((a, b) => {
        if (a.createdAt >= b.createdAt) {
          return -1
        }
        return 1
      })
      setLocalData(old => [...sortedData])
    }
  }, [data])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.9
      }
    }
  }

  const item = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0 }
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="h-screen w-[300px] bg-midnight rounded-3xl m-9 p-4">
      <h1 className="text-2xl">Add Transaction</h1>
      <PopupButton formOpen={formOpen} setFormOpen={setFormOpen}>
        <MoneyForm />
      </PopupButton>


      <motion.section className="h-[550px]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {(localData.map((row, i) => (
          <motion.div key={row.id} className="flex text-lg m-3"
            variants={item}
          // transition={{
          //   type: "spring",
          //   stiffness: 500,
          //   damping: 30
          //
          // }}
          >
            <div className="w-4/12">
              <h2 className="pb-1">{row.title}</h2>
              <h3 className="text-sm text-gray-500">{row.category}</h3>
            </div>
            <h2 className="w-2/12">{row.amount}</h2>
          </motion.div >
        ))).slice(0, 8)}
      </motion.section>
    </div>
  )
}
