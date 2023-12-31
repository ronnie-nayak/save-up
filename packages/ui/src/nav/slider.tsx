'use client'
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { IconType } from "react-icons";
import { IoAnalytics } from "react-icons/io5";
import { MdDashboard, MdOutlineAccountBalanceWallet, MdOutlineSettings } from "react-icons/md";

type linkType = {
  title: string,
  location: string,
  icon: IconType
}

const links: Array<linkType> = [
  { title: "Dashboard", location: "/", icon: MdDashboard },
  { title: "Analytics", location: "/analytics", icon: IoAnalytics },
  { title: "Transaction", location: "/transaction", icon: MdOutlineAccountBalanceWallet },
  { title: "Settings", location: "/settings", icon: MdOutlineSettings }
]
export function Slider() {
  const pathname = usePathname()
  let [activeTab, setActiveTab] = useState(pathname);
  return (
    <div>
      {links.map((link: linkType, index: number) => (
        < Link href={link.location} key={index} className={`${pathname === link.location ? '' : 'text-gray-500'} p-2 relative z-20 flex gap-4 my-5 items-center text-lg transition`}
          onClick={() => setActiveTab(link.location)}
        >

          {activeTab === link.location && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 bg-purple -z-10 rounded-xl h-[47px]"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}

          {link.icon({ size: 25, color: `${pathname === link.location ? '' : 'grey'} ` })}
          {link.title}
        </Link>

      ))
      }
    </div>
  )
}
