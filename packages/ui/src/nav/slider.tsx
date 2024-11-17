"use client";

import type { IconType } from "react-icons";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { IoAnalytics } from "react-icons/io5";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import {
  MdDashboard,
  MdOutlineAccountBalanceWallet,
  MdOutlineSavings,
} from "react-icons/md";
import { useSetRecoilState } from "recoil";

import { SidebarOpenState } from "@acme/atoms";

import { Sheet, SheetClose } from "..";

interface linkType {
  title: string;
  location: string;
  icon: IconType;
}

const links: linkType[] = [
  { title: "Dashboard", location: "/homepage", icon: MdDashboard },
  {
    title: "Transactions",
    location: "/homepage/transactions",
    icon: MdOutlineAccountBalanceWallet,
  },
  { title: "Savings", location: "/homepage/savings", icon: MdOutlineSavings },
  { title: "Bills", location: "/homepage/bills", icon: LiaMoneyBillWaveSolid },
];

export function Slider() {
  const pathname = usePathname();
  const setSidebarOpen = useSetRecoilState(SidebarOpenState);

  return (
    <div>
      {links.map((link: linkType, index: number) => (
        <Link
          href={link.location}
          key={link.location}
          className={`${
            (
              link.location === "/homepage"
                ? pathname === link.location
                : pathname.search(link.location) != -1
            )
              ? ""
              : "sm:text-gray-500"
          } relative z-20 my-5 flex items-center gap-4 p-2 font-normal transition sm:text-[1.75vw]`}
          onClick={() => setSidebarOpen(false)}
        >
          {(link.location === "/homepage"
            ? pathname === link.location
            : pathname.search(link.location) != -1) && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 -z-10 h-full rounded-xl bg-purple"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}

          {link.icon({
            size: 35,
            color: `${
              link.location === "/homepage" ||
              pathname.search(link.location) != -1
                ? ""
                : "grey"
            } `,
          })}
          {link.title}
        </Link>
      ))}
    </div>
  );
}
