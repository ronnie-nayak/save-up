
'use client'
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { motion } from "framer-motion";


export function HeroUI() {
  return (
    <div className="w-[300px] bg-midnight rounded-3xl m-8 p-2">
      <AspectRatio ratio={15 / 16}>
        <div className="p-4 ">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-lg">Account Summary</div>
          </div>
          <div className="mt-3 font-bold text-gray-400">Your total balance</div>
          <h2 className="font-bold text-4xl mt-1">$5240.74</h2>
          <div className="flex justify-center">
            <svg
              viewBox="0 0 700 380"
              fill="none"
            >
              <path
                d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350"
                stroke="#ffffff"
                strokeWidth="50"
                strokeLinecap="round"
              />
              <motion.path
                d="M100 350C100 283.696 126.339 220.107 173.223 173.223C220.107 126.339 283.696 100 350 100C416.304 100 479.893 126.339 526.777 173.223C573.661 220.107 600 283.696 600 350"
                stroke="#7f56d9"
                strokeWidth="60"
                strokeLinecap="round"
                id="svgPath"
                className="svgPath"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.5 }}
                transition={{ duration: 0.5 }}
              />

            </svg>
          </div>

          <div className="flex justify-center">
            <div className="flex justify-between -mt-14" style={{ width: '300px' }}>
              <div className="" style={{ width: '50px', paddingLeft: '16px' }}>
              </div>
              <div
                className=""
                style={{
                  width: '150px',
                  textAlign: 'center',
                }}
              >
                <div
                  className="font-bold text-purple"
                  style={{ fontSize: '28px' }}
                >
                  97.78%
                </div>
                <div className="">Based on Likes</div>
              </div>
              <div className="" style={{ width: '50px' }}>
              </div>
            </div>
          </div>
        </div>
      </AspectRatio>
    </div >
  )
}
