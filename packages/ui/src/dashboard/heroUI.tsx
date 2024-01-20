
'use client'
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { motion } from "framer-motion";


export function HeroUI({ data }: { data: any }) {
  let percentage = 0
  if (data && data.income > 0) {
    percentage = parseFloat(((data.savings / data.income) * 100).toFixed(2))
  }
  return (
    <div className="w-[18vw] bg-midnight rounded-3xl p-2">
      <AspectRatio ratio={15 / 16}>
        <div className="p-4 ">
          <div className="flex justify-between items-center">
            <div className="font-bold text-[1.5vw]">Account Summary</div>
          </div>
          <div className="mt-3 font-bold text-gray-400">Your total Income this month</div>
          {!data ? <div>No items transactions</div> :
            <h2 className="font-bold text-[2vw] mt-1">${data.income}</h2>
          }
          <div className="flex justify-center -mt-5">
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

              {!data ? <div>No items transactions</div> :
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
              }

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

                {!data ? <div>No items transactions</div> :
                  <div
                    className="font-bold text-purple text-[1.5vw]"
                  >
                    {percentage}%
                  </div>
                }
                <div className="">Monthly Income Saved</div>
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
