import { IoWalletOutline } from "react-icons/io5";
import { Separator } from "../components/ui/separator";
import { Slider } from "./nav";


export function Sidebar() {
  return (
    <nav className="bg-midnight w-2/12 h-screen flex flex-col p-8">
      <div className="flex gap-4 items-center">
        <IoWalletOutline size="50" className="bg-purple p-2 rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold">save-up</h1>
          <h4 className="text-purple">tracker</h4>
        </div>
      </div>
      <Separator className="my-5" />
      <Slider />
    </nav >
  )
}
