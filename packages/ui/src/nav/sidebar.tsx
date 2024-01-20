'use client'
import { PopupButton, Separator, Slider } from "@acme/ui";
import { useRecoilState } from "recoil";
import { FormOpenState } from '@acme/atoms'


export function Sidebar({ addMoney }: { addMoney: JSX.Element }) {
  const [formOpen, setFormOpen] = useRecoilState(FormOpenState)
  return (
    <nav className="bg-midnight w-3/12 h-screen flex flex-col p-8 text-white">
      <div className="flex gap-4 items-center mb-4">
        <div >
          <h1 className="text-[1.75vw] ">save-up</h1>
          <h4 className="text-purple">tracker</h4>
        </div>
      </div>
      <div>
        <PopupButton formOpen={formOpen} setFormOpen={setFormOpen}>
          {addMoney}
        </PopupButton>
      </div>
      <Separator className="my-5 bg-gray-500" />
      <Slider />
    </nav >
  )
}
