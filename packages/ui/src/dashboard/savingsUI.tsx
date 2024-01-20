'use client'
import Link from "next/link";
import { GetSavingsType } from "@acme/validators";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil"
import { SavingsFormOpenState } from "@acme/atoms"
import { Button, SavingsButton } from "..";
import { FaPlus } from "react-icons/fa";



export function SavingsItem({ dataItem }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center font-normal mb-1" >
        <h2 >{dataItem.title}</h2>
        <h3 className="text-sm" style={{ color: dataItem.color }}>{dataItem.amount - dataItem.current} left</h3>
      </div>
      <div className="h-3 rounded-full overflow-hidden w-full">
        <motion.div className="h-full"
          style={{
            backgroundColor: dataItem.color,
            color: dataItem.color
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(dataItem.current / dataItem.amount) * 100}%` }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>
    </div >
  )
}


export function SavingsItemBig({ data }: { data: GetSavingsType }) {
  return (
    < div className="my-2 w-3/5 bg-midnight rounded-3xl p-5" >
      <div className="flex font-bold mb-4 items-center">
        <div className="w-8/12 text-[1.5vw]">
          <h2>{data.title}</h2>
          <h3 className="text-[1vw]">{data.category}</h3>
        </div>
        <h2 className="text-[1.25vw]">{data.current} / {data.amount}</h2>
      </div >

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

export function SavingsUI({ data, buttonComp, buttonWorkable }) {

  const [formOpen, setFormOpen] = useRecoilState(SavingsFormOpenState)
  return (
    <div className="w-[18vw] bg-midnight rounded-3xl p-6">
      <AspectRatio ratio={10 / 9} className="">
        <div className="flex gap-6 items-center mb-4">
          <div className=" font-bold text-[1vw] ">My Savings</div>
          {buttonWorkable ?
            <SavingsButton height={8} text="" formOpen={formOpen} setFormOpen={setFormOpen}>
              {buttonComp}
            </SavingsButton> :
            <Link href="/login" className={`rounded-3xl bg-purple font-bold p-2 px-6`}>
              <FaPlus className="" />
            </Link>
          }
        </div>
        {
          !data || data.length === 0 ? <div className="text-center">No items savings yet</div> : (
            data.map((item) => <SavingsItem key={item.id} dataItem={item} />).splice(0, 4)
          )
        }
      </AspectRatio>
    </div>
  )
}


export function SavingsUITemp({ data }) {

  const [formOpen, setFormOpen] = useRecoilState(SavingsFormOpenState)
  return (
    <div className="w-[18vw] bg-midnight rounded-3xl p-6">
      <AspectRatio ratio={10 / 9} className="">
        <div className=" font-bold text-[1vw] mb-4">My Savings</div>

        {
          data.map((item) => <SavingsItem key={item.id} dataItem={item} />).splice(0, 4)
        }
      </AspectRatio>
    </div>
  )
} 
