
'use client'

import { Bar, BarChart, ResponsiveContainer } from "recharts";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 1,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 1,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 1,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 1,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 1,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 1,
    amt: 2100,
  },
];

export function History() {

  return (
    <div className="h-16 w-32 bottom-0">
      <ResponsiveContainer width="100%" height="100%" >
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="uv" fill="#81D16E" barSize={6} animationDuration={2000} radius={[10, 10, 10, 10]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
