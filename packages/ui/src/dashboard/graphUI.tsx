'use client'

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export function GraphUI({ data }: { data: any[] }) {
  return (
    <div className="m-4">
      <div className="w-full bg-midnight rounded-3xl p-9">
        <AspectRatio ratio={16 / 9} >

          <div className="flex gap-4 mb-4">
            <div className="mr-auto font-bold text-[1.5vw]">Activities</div>
            <div className="flex gap-3 items-center">
              <div className="h-5 w-5 rounded-full bg-[#5ABF41]"></div>
              <span className="text-[1vw]">Income</span>
            </div>

            <div className="flex gap-3 items-center">
              <div className="h-5 w-5 rounded-full bg-[#FC3928]"></div>
              <span className="text-[1vw]" gap-4>Expense</span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="h-5 w-5 rounded-full bg-[#1168C9]"></div>
              <span className="text-[1vw]">Savings</span>
            </div>
          </div>
          <div className="w-full h-[90%] p-4">
            <div className='w-full h-full'>
              <ResponsiveContainer width="100%" height="100%">
                {!data || data.length === 0 ? <div>No items graph transactions</div> :
                  <LineChart width={300} height={100} data={data}>
                    <XAxis padding={{ left: 25 }} dataKey="date" />
                    <Line type='bump' dataKey="income" stroke="#5ABF41" strokeWidth={2} dot={false} />
                    <Line type="bump" dataKey="expense" stroke="#FC3928" strokeWidth={2} dot={false} />
                    <Line type="bump" dataKey="savings" stroke="#1168C9" strokeWidth={2} dot={false} />
                  </LineChart>
                }
              </ResponsiveContainer>
            </div>
          </div>
        </AspectRatio>
      </div>
    </div>
  )
} 
