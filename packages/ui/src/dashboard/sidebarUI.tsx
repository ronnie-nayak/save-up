
import Link from "next/link";
import { IconType } from "react-icons";
import { MdDashboard, MdOutlineAccountBalanceWallet, MdOutlineSavings } from "react-icons/md";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { Button, Separator, Slider } from "@acme/ui";
import { FaPlus } from "react-icons/fa";

type linkType = {
  title: string,
  icon: IconType
}

const links: Array<linkType> = [
  { title: "Dashboard", icon: MdDashboard },
  { title: "Transactions", icon: MdOutlineAccountBalanceWallet },
  { title: "Savings", icon: MdOutlineSavings },
  { title: "Bills", icon: LiaMoneyBillWaveSolid },
]


export function SidebarUI() {
  return (
    <nav className="fixed bg-midnight w-3/12 h-screen flex flex-col p-8 text-white">
      <div className="flex gap-4 items-center mb-4">
        <div >
          <h1 className="text-[1.75vw] ">save-up</h1>
          <h4 className="text-purple">tracker</h4>
        </div>
      </div>
      <Link href="/login" className="h-12 rounded-3xl bg-purple flex gap-2 items-center w-max px-4 font-bold">
        <FaPlus className="" />
        Add Transaction
      </Link>
      <Separator className="my-5 bg-gray-500" />
      {links.map((link: linkType, index: number) => (
        < Link href="/login" key={index} className={`${"Dashboard" === link.title ? '' : 'text-gray-500'} p-2 relative z-20 flex gap-4 my-5 items-center text-[1.75vw] transition font-normal`}
        >

          {"Dashboard" === link.title && (
            <span
              className="absolute inset-0 bg-purple -z-10 rounded-xl h-full"
            />
          )}

          {link.icon({ size: 35, color: `${"Dashboard" === link.title ? '' : 'grey'} ` })}
          {link.title}
        </Link>

      ))
      }
    </nav >
  )
}


