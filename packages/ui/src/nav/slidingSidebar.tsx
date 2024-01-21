"use client";

import { FaBars } from "react-icons/fa6";
import { useRecoilState } from "recoil";

import { SidebarOpenState } from "@acme/atoms";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
} from "@acme/ui";

export default function SlidingSidebar({
  children,
}: {
  children: JSX.Element;
}) {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(SidebarOpenState);
  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger>
        <div>
          <FaBars size={29} />
        </div>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="border-2 border-midnight bg-midnight p-0"
      >
        <SheetClose>
          <Sidebar addMoney={children} />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
