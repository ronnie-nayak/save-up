"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { AspectRatio, BillsButton, Button } from "@acme/ui";
import { Separator } from "@acme/ui";
import { GetBillsType } from "@acme/validators";
import clsx from "clsx";
import { useRecoilState } from "recoil";
import { BillsFormOpenState } from "@acme/atoms";
import { FaPlus } from "react-icons/fa";


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


export function BillItem({ dataItem }: { dataItem: GetBillsType }) {
  return (
    <motion.div className={`flex items-center gap-4 ${new Date(dataItem.dueAt) < new Date() ? "bg-red-500 p-1 rounded-xl " : ""} `}
      variants={item}
    >
      <div className="border-2 border-purple rounded-full self-stretch"></div>
      <div>
        <h5 className="text-sm font-normal">{dataItem.title}</h5>
        <h5 className={`text-sm font-normal ${new Date(dataItem.dueAt) < new Date() ? "text-white" : "text-gray-400"} `}>{dataItem.dueAt.toDateString()}</h5>
      </div>
      <h3 className="ml-auto">${dataItem.amount}</h3>
    </motion.div>
  )
}


export function BillItemBig({ data }: { data: GetBillsType }) {
  return (
    <motion.div className={`flex items-center gap-4 my-2 w-3/5 bg-midnight rounded-3xl p-5 ${new Date(data.dueAt) < new Date() ? "bg-red-500" : ""} `}>
      <div className="border-2 border-purple rounded-full self-stretch"></div>
      <div>
        <h5 className="text-[1.25vw] font-normal">{data.title}</h5>
        <h5 className={`text-[1vw] font-normal ${new Date(data.dueAt) < new Date() ? "text-white" : "text-gray-400"} `}>{data.dueAt.toDateString()}</h5>
      </div>
      <h3 className="ml-auto">${data.amount}</h3>
    </motion.div >
  )
}

export function BillsUI({ data, buttonComp, buttonWorkable }: { data: GetBillsType[] | undefined, buttonComp: JSX.Element, buttonWorkable: boolean }) {

  const [formOpen, setFormOpen] = useRecoilState(BillsFormOpenState)
  return (
    <div className="w-[18vw] bg-midnight rounded-3xl p-6">
      <AspectRatio ratio={10 / 9} className="">
        <div className="flex gap-6 items-center mb-2">
          <div className="font-bold text-[1vw] ">Coming Bills</div>
          {buttonWorkable ?
            <BillsButton text="" height={8} formOpen={formOpen} setFormOpen={setFormOpen}>
              {buttonComp}
            </BillsButton> :
            <Link href="/login" className={`rounded-3xl bg-purple font-bold p-2 px-6`}>
              <FaPlus className="" />
            </Link>
          }
        </div>
        <motion.div
          className="flex flex-col "
          variants={container}
          initial="hidden"
          animate="show"
        >
          <Separator className="m-3 bg-gray-600" />
          {
            !data || data.length === 0 ? <div>no items bills</div> :
              data.map((item, i) =>
                <div key={i}>
                  <BillItem dataItem={item} />
                  <Separator className="m-3 bg-gray-600" />
                </div>
              ).slice(0, 3)
          }
        </motion.div>
      </AspectRatio >
    </div >
  )
}


// export function BillsUITemp({ data }) {
//
//   return (
//     <div className="w-[18vw] bg-midnight rounded-3xl p-6">
//       <AspectRatio ratio={10 / 9} className="">
//         <div className="font-bold text-[1vw] mb-4">Coming Bills</div>
//         <motion.div
//           variants={container}
//           initial="hidden"
//           animate="show"
//         >
//           <Separator className="m-4 bg-gray-600" />
//           {
//             data.map((item, i) =>
//               <div key={i}>
//                 <BillItem dataItem={item} />
//                 <Separator className="m-4 bg-gray-600" />
//               </div>
//             ).slice(0, 3)
//           }
//         </motion.div>
//       </AspectRatio >
//     </div >
//   )
// }
