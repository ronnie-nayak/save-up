"use client";

import Link from "next/link";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { useRecoilState } from "recoil";

import type { GetSavingsType } from "@acme/validators";
import { SavingsFormOpenState } from "@acme/atoms";

import { Button, SavingsButton } from "..";

export function SavingsItem({ dataItem }: { dataItem: GetSavingsType }) {
  return (
    <div className="mb-4">
      <div className="mb-5 flex items-center justify-between font-normal sm:mb-1">
        <h2>{dataItem.title}</h2>
        <h3 className="text-sm" style={{ color: dataItem.color }}>
          {dataItem.amount - dataItem.current!} left
        </h3>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full">
        <motion.div
          className="h-full"
          style={{
            backgroundColor: dataItem.color,
            color: dataItem.color,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(dataItem.current! / dataItem.amount) * 100}%` }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>
    </div>
  );
}

export function SavingsItemBig({ data }: { data: GetSavingsType }) {
  return (
    <div className="my-2 w-3/5 rounded-3xl bg-midnight p-5">
      <div className="mb-4 flex items-center font-bold">
        <div className="w-8/12 sm:text-[1.5vw]">
          <h2>{data.title}</h2>
          <h3 className="sm:text-[1vw]">{data.category}</h3>
        </div>
        <h2 className="sm:text-[1.25vw]">
          {data.current} / {data.amount}
        </h2>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full">
        <motion.div
          className="h-full"
          style={{
            backgroundColor: data.color,
            color: data.color,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${(data.current! / data.amount) * 100}%` }}
          transition={{ duration: 1 }}
        ></motion.div>
      </div>
    </div>
  );
}

export function SavingsUI({
  data,
  buttonComp,
  buttonWorkable,
}: {
  data: GetSavingsType[] | undefined;
  buttonComp: JSX.Element;
  buttonWorkable: boolean;
}) {
  const [formOpen, setFormOpen] = useRecoilState(SavingsFormOpenState);
  return (
    <div className="my-4 h-max w-full rounded-3xl bg-midnight p-6 sm:m-0 sm:w-[18vw]">
      {/* <AspectRatio ratio={10 / 9} className=""> */}
      <div className="mb-4 flex items-center gap-6">
        <div className=" font-bold sm:text-[1vw] ">My Savings</div>
        {buttonWorkable ? (
          <SavingsButton
            height={8}
            text=""
            formOpen={formOpen}
            setFormOpen={setFormOpen}
          >
            {buttonComp}
          </SavingsButton>
        ) : (
          <Link
            href="/login"
            className={`rounded-3xl bg-purple p-2 px-6 font-bold`}
          >
            <FaPlus className="" />
          </Link>
        )}
      </div>
      {!data || data.length === 0 ? (
        <div className="p-4 text-center font-bold sm:text-[1vw]">
          No Savings Yet
        </div>
      ) : (
        data
          .map((item) => <SavingsItem key={item.id} dataItem={item} />)
          .splice(0, 4)
      )}
      {/* </AspectRatio> */}
    </div>
  );
}
