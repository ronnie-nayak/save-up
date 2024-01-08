
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { History } from ".";


export function Stats() {
  return (
    <div className="w-[350px] bg-midnight rounded-3xl m-8 px-2">
      <AspectRatio ratio={3 / 1} className="grid grid-cols-2 place-items-center">
        <div>
          <h4 className="text-gray-400">Earned this month</h4>
          <h2 className="text-2xl mt-1">$4682.5</h2>
        </div>
        <History />
      </AspectRatio>
    </div>
  )
} 
