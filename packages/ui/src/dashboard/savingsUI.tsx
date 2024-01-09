'use client'

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { motion } from "framer-motion";

function SavingsItem() {
  return (
    <div className="mb-5">
      <h2 className="font-normal">Car</h2>
      <div className="bg-white h-3 rounded-full overflow-hidden w-full">
        <motion.div className="bg-yellow-300 h-full"
          initial={{ width: 0 }}
          animate={{ width: '50%' }}
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
        <div className="text-white font-bold text-lg mb-4">My Savings</div>
        <SavingsItem />
        <SavingsItem />
        <SavingsItem />
        <SavingsItem />
      </AspectRatio>
    </div>
  )
} 
