'use client'

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export function GraphUI({ data }: { data: any[] }) {
  return (
    <div className="w-[900px] bg-midnight rounded-3xl m-8 p-6">
      <AspectRatio ratio={16 / 9} className="">
        <div className="text-white font-bold text-lg mb-9">Coming Bills</div>
        <div className="w-full h-[90%] p-4">
          <div className='w-full h-full'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={data}>
                <XAxis padding={{ left: 25 }} dataKey="name" />
                <Line type='bump' dataKey="pv" stroke="#8884d8" strokeWidth={2} dot={false} />
                <Line type="bump" dataKey="uv" stroke="#82ca9d" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </AspectRatio>
    </div>
  )
} 
