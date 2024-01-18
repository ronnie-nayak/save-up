"use client"
import { motion } from "framer-motion";
import { AspectRatio } from "@acme/ui";
import { Separator } from "@acme/ui";
import { GetBillsType } from "@acme/validators";
import clsx from "clsx";


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 }
}


export function BillItem() {
  return (
    <motion.div className="flex items-center gap-4 "
      variants={item}
    >
      <div className="border-2 border-purple rounded-full self-stretch"></div>
      <div>
        <h5 className="text-sm font-normal">Loan (Laptop)</h5>
        <h5 className="text-sm font-normal text-gray-400">23 Sept 2023</h5>
      </div>
      <h3 className="ml-auto">$130.00</h3>
    </motion.div>
  )
}


export function BillItemBig({ data }: { data: GetBillsType }) {
  return (
    <motion.div className={clsx("flex items-center gap-4 m-5 w-3/5 bg-midnight rounded-3xl p-5",
      `${new Date(data.dueAt) < new Date() && "bg-red-500"}}`
    )} >
      <div className="border-2 border-purple rounded-full self-stretch"></div>
      <div>
        <h5 className="text-xl font-normal">{data.title}</h5>
        <h5 className="text-lg font-normal text-gray-400">{data.dueAt.toDateString()}</h5>
      </div>
      <h3 className="ml-auto">${data.amount}</h3>
    </motion.div >
  )
}

export function BillsUI() {
  return (
    <div className="w-[300px] bg-midnight rounded-3xl m-8 p-6">
      <AspectRatio ratio={15 / 16} className="">
        <div className="font-bold text-lg mb-4">Coming Bills</div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <BillItem />
          <Separator className="m-4 bg-gray-600" />
          <BillItem />
          <Separator className="m-4 bg-gray-600" />
          <BillItem />
        </motion.div>
      </AspectRatio >
    </div >
  )
}
