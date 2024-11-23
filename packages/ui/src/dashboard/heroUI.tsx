"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { motion } from "framer-motion";

export function HeroUI({ data }: { data: any }) {
  let percentage = 0;
  if (data && data.income > 0) {
    percentage = parseFloat(((data.savings / data.income) * 100).toFixed(2));
  }
  return (
    <div className="mb-2 w-full rounded-3xl bg-midnight p-2 sm:m-0 sm:w-[18vw]">
      {/* <AspectRatio ratio={15 / 16}> */}
      <div className="p-4 ">
        <div className="flex items-center justify-between">
          <div className="font-bold sm:text-[1.5vw]">Workout Summary</div>
        </div>
        <div className="mt-3 font-bold text-gray-400">
          Percentage of goal reached
        </div>
        {!data ? (
          <div className="p-4 text-center font-bold sm:text-[1vw]">
            Loading...
          </div>
        ) : (
          <h2 className="mt-1 text-[12vw] font-bold sm:text-[2vw]">
            {data.income}
          </h2>
        )}
        <div className="-mt-5 flex justify-center">
          <svg viewBox="0 0 700 380" fill="none">
            <path
              d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350"
              stroke="#ffffff"
              strokeWidth="50"
              strokeLinecap="round"
            />

            {!data ? (
              <div className="p-4 text-center font-bold sm:text-[1vw]">
                Loading...
              </div>
            ) : (
              <motion.path
                d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350"
                stroke="#7f56d9"
                strokeWidth="60"
                strokeLinecap="round"
                id="svgPath"
                className="svgPath"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: percentage / 100 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </svg>
        </div>

        <div className="flex justify-center">
          <div
            className="-mt-14 flex justify-between"
            style={{ width: "300px" }}
          >
            <div
              className=""
              style={{ width: "50px", paddingLeft: "16px" }}
            ></div>
            <div
              className=""
              style={{
                width: "150px",
                textAlign: "center",
              }}
            >
              {!data ? (
                <div className="p-4 text-center font-bold sm:text-[1vw]">
                  Loading...
                </div>
              ) : (
                <div className="text-[7vw] font-bold text-purple sm:text-[1.5vw]">
                  {percentage}%
                </div>
              )}
              <div className="">Goal Progress</div>
            </div>
            <div className="" style={{ width: "50px" }}></div>
          </div>
        </div>
      </div>
      {/* </AspectRatio> */}
    </div>
  );
}
