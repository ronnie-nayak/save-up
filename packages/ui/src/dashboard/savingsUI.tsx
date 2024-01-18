'use client'

import { GetSavingsType } from "@acme/validators";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { motion } from "framer-motion";

export function SavingsItem() {
  return (
    <div className="mb-5">
      <h2 className="font-normal">Car</h2>
      <div className="h-3 rounded-full overflow-hidden w-full">
        <motion.div className="bg-yellow-300 h-full"
          initial={{ width: 0 }}
          animate={{ width: '50%' }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>
    </div >
  )
}


export function SavingsItemBig({ data }: { data: GetSavingsType }) {
  return (
    < div className="m-5 w-3/5 bg-midnight rounded-3xl p-5" >
      <div className="flex font-bold mb-4 items-center">
        <div className="w-8/12">
          <h2 className="text-2xl">{data.title}</h2>
          <h3 className="text-lg">{data.category}</h3>
        </div>
        <h2 className="text-xl">{data.current} / {data.amount}</h2>
      </div>

      <div className="h-3 rounded-full overflow-hidden w-full">
        <motion.div className="h-full"
          style={{
            backgroundColor: data.color,
            color: data.color
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(data.current / data.amount) * 100}%` }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>
    </div >
  )
}

export function SavingsUI() {

  return (
    <div className="w-[350px] bg-midnight rounded-3xl m-8 p-6">
      <AspectRatio ratio={10 / 9} className="">
        <div className=" font-bold text-lg mb-4">My Savings</div>
        <SavingsItem />
        <SavingsItem />
        <SavingsItem />
        <SavingsItem />
      </AspectRatio>
    </div>
  )
} 
