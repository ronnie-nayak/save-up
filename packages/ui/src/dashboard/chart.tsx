
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { HistoryChart } from "./historyChart";


export function Chart() {
  return (
    <div className="w-[900px] bg-midnight rounded-3xl m-8 p-6">
      <AspectRatio ratio={16 / 9} className="">
        <div className="text-white font-bold text-lg mb-9">Coming Bills</div>
        <div className="w-full h-[90%] p-4">
          <HistoryChart />
        </div>
      </AspectRatio>
    </div>
  )
} 
