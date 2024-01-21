"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useRecoilState } from "recoil";

import type { GetBillsType } from "@acme/validators";
import { BillsFormOpenState } from "@acme/atoms";
import { AspectRatio, BillsButton, Button, Separator } from "@acme/ui";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
};

export function BillItem({ dataItem }: { dataItem: GetBillsType }) {
  return (
    <motion.div
      className={`flex items-center gap-4 ${
        new Date(dataItem.dueAt) < new Date()
          ? "rounded-xl bg-red-500 p-1 "
          : ""
      } `}
      variants={item}
    >
      <div className="self-stretch rounded-full border-2 border-purple"></div>
      <div>
        <h5 className="text-sm font-normal">{dataItem.title}</h5>
        <h5
          className={`text-sm font-normal ${
            new Date(dataItem.dueAt) < new Date()
              ? "text-white"
              : "text-gray-400"
          } `}
        >
          {dataItem.dueAt.toDateString()}
        </h5>
      </div>
      <h3 className="ml-auto">${dataItem.amount}</h3>
    </motion.div>
  );
}

export function BillItemBig({ data }: { data: GetBillsType }) {
  return (
    <motion.div
      className={`my-2 flex w-3/5 items-center gap-4 rounded-3xl bg-midnight p-5 ${
        new Date(data.dueAt) < new Date() ? "bg-red-500" : ""
      } `}
    >
      <div className="self-stretch rounded-full border-2 border-purple"></div>
      <div>
        <h5 className="font-normal sm:text-[1.25vw]">{data.title}</h5>
        <h5
          className={`text-[3.2vw] font-normal sm:text-[1vw] ${
            new Date(data.dueAt) < new Date() ? "text-white" : "text-gray-400"
          } `}
        >
          {data.dueAt.toDateString()}
        </h5>
      </div>
      <h3 className="ml-auto">${data.amount}</h3>
    </motion.div>
  );
}

export function BillsUI({
  data,
  buttonComp,
  buttonWorkable,
}: {
  data: GetBillsType[] | undefined;
  buttonComp: JSX.Element;
  buttonWorkable: boolean;
}) {
  const [formOpen, setFormOpen] = useRecoilState(BillsFormOpenState);
  return (
    <div className="w-full rounded-3xl bg-midnight p-6 sm:w-[18vw]">
      {/* <AspectRatio ratio={10 / 9} className=""> */}
      <div className="mb-2 flex items-center gap-6">
        <div className="font-bold sm:text-[1vw] ">Coming Bills</div>
        {buttonWorkable ? (
          <BillsButton
            text=""
            height={8}
            formOpen={formOpen}
            setFormOpen={setFormOpen}
          >
            {buttonComp}
          </BillsButton>
        ) : (
          <Link
            href="/login"
            className={`rounded-3xl bg-purple p-2 px-6 font-bold`}
          >
            <FaPlus className="" />
          </Link>
        )}
      </div>
      <motion.div
        className="flex flex-col "
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Separator className="m-3 bg-gray-600" />
        {!data || data.length === 0 ? (
          <div className="p-4 text-center font-bold sm:text-[1vw]">
            No Bills Yet
          </div>
        ) : (
          data
            .map((item, i) => (
              <div key={i}>
                <BillItem dataItem={item} />
                <Separator className="m-3 bg-gray-600" />
              </div>
            ))
            .slice(0, 3)
        )}
      </motion.div>
      {/* </AspectRatio > */}
    </div>
  );
}

// export function BillsUITemp({ data }) {
//
//   return (
//     <div className="w-[18vw] bg-midnight rounded-3xl p-6">
//       <AspectRatio ratio={10 / 9} className="">
//         <div className="font-bold sm:text-[1vw] mb-4">Coming Bills</div>
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
