"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { GetMoneyType } from "@acme/validators";

export function GraphUI({ data }: { data: any[] }) {
  return (
    <div className="sm:m-4">
      <div className="w-full rounded-3xl bg-midnight p-9">
        <AspectRatio ratio={16 / 9}>
          <div className="flex flex-col sm:flex-row">
            <div className="mr-auto font-bold sm:text-[1.5vw]">Calories</div>
            <div className="mb-4 flex gap-4">
              <div className="flex items-center gap-1 sm:gap-3">
                <div className="h-4 w-4 rounded-full bg-[#5ABF41]"></div>
                <span className="text-[2.25vw] sm:text-[1vw]">Burned</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-3">
                <div className="h-4 w-4 rounded-full bg-[#FC3928]"></div>
                <span className="text-[2.25vw] sm:text-[1vw]">Consumed</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-3">
                <div className="h-4 w-4 rounded-full bg-[#1168C9]"></div>
                <span className="text-[2.25vw] sm:text-[1vw]">Goal</span>
              </div>
            </div>
          </div>
          <div className="h-[90%] w-full p-4">
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                {!data || data.length === 0 ? (
                  <div className="p-4 text-center font-bold sm:text-[1vw]">
                    No Data Yet
                  </div>
                ) : (
                  <LineChart width={300} height={100} data={data}>
                    <XAxis padding={{ left: 25 }} dataKey="date" />
                    <Line
                      type="bump"
                      dataKey="income"
                      stroke="#5ABF41"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="bump"
                      dataKey="expense"
                      stroke="#FC3928"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="bump"
                      dataKey="savings"
                      stroke="#1168C9"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
}
