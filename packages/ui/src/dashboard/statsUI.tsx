"use client";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import clsx from "clsx";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

export function StatsUI({ data, dataKey }: { data: any[]; dataKey: string }) {
  const title = dataKey.charAt(0).toUpperCase() + dataKey.slice(1);
  return (
    <div className="my-1 w-full rounded-3xl bg-midnight px-2 sm:my-0 sm:w-[18vw]">
      <AspectRatio
        ratio={3 / 1}
        className="grid grid-cols-2 place-items-center"
      >
        {!data || data.length === 0 ? (
          <div className="p-4 text-center font-bold sm:text-[1vw]">
            No Data Yet
          </div>
        ) : (
          <>
            <div className="text-center sm:text-left">
              <h4 className="text-gray-400">
                {title === "Income"
                  ? "Calories burned"
                  : title === "Expense"
                    ? "Calories consumed"
                    : "Calorie goal"}{" "}
              </h4>
              <h2 className="mt-1 sm:text-[1.5vw]">
                {data[data.length - 1][dataKey] * 10}
              </h2>
            </div>
            <div className="bottom-0 h-16 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={data}>
                  <Bar
                    dataKey={dataKey}
                    fill={
                      dataKey === "income"
                        ? "#5ABF41"
                        : dataKey === "expense"
                          ? "#FC3928"
                          : "#1168C9"
                    }
                    barSize={6}
                    animationDuration={2000}
                    radius={[10, 10, 10, 10]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </AspectRatio>
    </div>
  );
}
