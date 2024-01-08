import { Separator } from "@acme/ui";
import { Slider } from "@acme/ui";


export function Sidebar() {
  return (
    <nav className="bg-midnight w-2/12 h-screen flex flex-col p-8">
      <div className="flex gap-4 items-center">
        <div>
          <h1 className="text-3xl ">save-up</h1>
          <h4 className="text-purple">tracker</h4>
        </div>
      </div>
      <Separator className="my-5 bg-gray-500" />
      <Slider />
    </nav >
  )
}
