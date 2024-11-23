import type { IconType } from "react-icons";
import Link from "next/link";

import { IoIosVideocam } from "react-icons/io";
import { CiBoxList } from "react-icons/ci";
import { FaDumbbell, FaPlus } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GrSchedule } from "react-icons/gr";
import { IoAnalytics } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

import { Button, Separator, Slider } from "@acme/ui";

interface linkType {
  title: string;
  icon: IconType;
}

const links: linkType[] = [
  { title: "Dashboard", icon: MdDashboard },
  { title: "Records", icon: CiBoxList },
  { title: "Goals", icon: GoGoal },
  { title: "Schedule", icon: GrSchedule },
  { title: "Calorie Calc", icon: IoAnalytics },
  { title: "Exercise", icon: IoIosVideocam },
];

export function SidebarUI() {
  return (
    <nav className="flex h-screen flex-col bg-midnight p-8 text-white">
      <div className="mb-4 flex items-center gap-4">
        <div className="mb-4 flex items-end gap-5">
          <div className="rounded-xl bg-purple p-2 text-white">
            <FaDumbbell size={50} />
          </div>
          <div>
            <h1 className="text-[7vw] sm:text-[1.75vw] ">fit-tech</h1>
            <h4 className="text-[5vw] text-purple sm:text-[0.85vw]">
              fitness tracker
            </h4>
          </div>
        </div>
      </div>
      <Link
        href="/login"
        className="flex h-12 w-max items-center gap-2 rounded-3xl bg-purple px-4 font-bold"
      >
        <FaPlus className="" />
        Add Record
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
