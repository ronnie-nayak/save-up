import type { IconType } from "react-icons";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import {
  MdDashboard,
  MdOutlineAccountBalanceWallet,
  MdOutlineSavings,
} from "react-icons/md";

import { Button, Separator, Slider } from "@acme/ui";

interface linkType {
  title: string;
  icon: IconType;
}

const links: linkType[] = [
  { title: "Dashboard", icon: MdDashboard },
  { title: "Transactions", icon: MdOutlineAccountBalanceWallet },
  { title: "Savings", icon: MdOutlineSavings },
  { title: "Bills", icon: LiaMoneyBillWaveSolid },
];

export function SidebarUI() {
  return (
    <nav className="flex h-screen flex-col bg-midnight p-8 text-white">
      <div className="mb-4 flex items-center gap-4">
        <div>
          <h1 className="sm:text-[1.75vw] ">save-up</h1>
          <h4 className="text-purple">tracker</h4>
        </div>
      </div>
      <Link
        href="/login"
        className="flex h-12 w-max items-center gap-2 rounded-3xl bg-purple px-4 font-bold"
      >
        <FaPlus className="" />
        Add Transaction
      </Link>
      <Separator className="my-5 bg-gray-500" />
      {links.map((link: linkType, index: number) => (
        <Link
          href="/login"
          key={index}
          className={`${
            "Dashboard" === link.title ? "" : "text-gray-500"
          } relative z-20 my-5 flex items-center gap-4 p-2 font-normal transition sm:text-[1.75vw]`}
        >
          {"Dashboard" === link.title && (
            <span className="absolute inset-0 -z-10 h-full rounded-xl bg-purple" />
          )}

          {link.icon({
            size: 35,
            color: `${"Dashboard" === link.title ? "" : "grey"} `,
          })}
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
