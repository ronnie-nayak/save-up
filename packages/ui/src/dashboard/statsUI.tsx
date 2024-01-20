'use client'
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import clsx from "clsx";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

export function StatsUI({ data, dataKey }) {
  console.log(data, "datastats")
  return (
    <div className="w-[18vw] bg-midnight rounded-3xl px-2">
      <AspectRatio ratio={3 / 1} className="grid grid-cols-2 place-items-center">
        {!data || data.length === 0 ? <div>No items graph transactions</div> :
          <>
            <div>
              <h4 className="text-gray-400">{dataKey.charAt(0).toUpperCase() + dataKey.slice(1)} this month</h4>
              <h2 className="text-[1.5vw] mt-1">${data[data.length - 1][dataKey] * 10}</h2>
            </div>
            <div className="h-16 w-32 bottom-0">
              <ResponsiveContainer width="100%" height="100%" >
                <BarChart width={150} height={40} data={data}>
                  <Bar dataKey={dataKey} fill={dataKey === "income" ? "#5ABF41" : dataKey === "expense" ? "#FC3928" : "#1168C9"} barSize={6} animationDuration={2000} radius={[10, 10, 10, 10]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        }
      </AspectRatio>
    </div>
  )
}

