'use client'
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

export function StatsUI({ data }) {
  return (
    <div className="w-[350px] bg-midnight rounded-3xl m-8 px-2">
      <AspectRatio ratio={3 / 1} className="grid grid-cols-2 place-items-center">
        <div>
          <h4 className="text-gray-400">Earned this month</h4>
          <h2 className="text-2xl mt-1">$4682.5</h2>
        </div>
        <div className="h-16 w-32 bottom-0">
          <ResponsiveContainer width="100%" height="100%" >
            <BarChart width={150} height={40} data={data}>
              <Bar dataKey="uv" fill="#81D16E" barSize={6} animationDuration={2000} radius={[10, 10, 10, 10]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </AspectRatio>
    </div>
  )
} 
