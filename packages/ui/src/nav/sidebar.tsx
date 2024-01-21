"use client";

import { useRecoilState } from "recoil";

import { FormOpenState } from "@acme/atoms";
import { PopupButton, Separator, SheetClose, Slider } from "@acme/ui";

export function Sidebar({ addMoney }: { addMoney: JSX.Element }) {
  const [formOpen, setFormOpen] = useRecoilState(FormOpenState);
  return (
    <nav className="flex  h-screen flex-col bg-midnight p-8 text-white ">
      <div className="mb-4 flex items-center gap-4">
        <div>
          <h1 className="text-[7vw] sm:text-[1.75vw] ">save-up</h1>
          <h4 className="text-[5vw] text-purple sm:text-[0.85vw]">tracker</h4>
        </div>
      </div>
      <div>
        <PopupButton formOpen={formOpen} setFormOpen={setFormOpen}>
          {addMoney}
        </PopupButton>
      </div>
      <Separator className="my-5 bg-gray-500" />
      <Slider />
    </nav>
  );
}
