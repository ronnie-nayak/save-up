"use client";

import type { ChangeEvent, MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import { useRecoilState } from "recoil";

import { FormOpenState } from "@acme/atoms";
import {
  Button,
  Calendar,
  cn,
  FormControl,
  Input,
  Loading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopupButton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@acme/ui";

import { apiReact } from "~/trpc/react";

type recordType = {
  id: number;
  createdAt: Date;
  link: string;
};

export function RecordsTable() {
  const [localData, setLocalData] = useState<recordType[]>([]);

  const router = useRouter();

  const utils = apiReact.useUtils();
  const { data, isLoading, isError } =
    apiReact.transactions.getAllRecords.useQuery();
  if (isError) {
    utils.transactions.sessionExists.invalidate();
    router.replace("/login");
  }

  useEffect(() => {
    if (data) setLocalData(() => [...data]);
  }, [data]);

  const endPage = Math.ceil(localData.length / 6);

  const [sorted, setSorted] = useState("createdAt");
  const [dir, setDir] = useState(1);

  const sortingFunction = (
    event: MouseEvent<HTMLHeadingElement, globalThis.MouseEvent>,
  ) => {
    let direction = 1;
    // @ts-ignore
    const column = event.target.id;
    if (sorted === column) {
      direction = -dir;
      setDir((old) => -old);
    } else {
      setSorted((old) => column);
      setDir((old) => 1);
    }
    const sortedData = localData.sort((a, b) => {
      // @ts-ignore
      if (a[column] >= b[column]) {
        return direction;
      }
      return -direction;
    });
    setLocalData((old) => [...sortedData]);
  };

  const [page, setPage] = useState(1);

  if (isLoading) return <Loading />;

  return (
    <div className=" dark m-2 my-2 rounded-3xl bg-midnight p-6 text-left sm:m-10">
      <div className="flex h-14 items-center gap-4">
        <h1 className="sm:text-[1.5vw] ">Records</h1>
      </div>
      <header className="m-9 my-4 flex text-gray-500 sm:text-[1.25vw]">
        <h2
          id="createdAt"
          className="flex w-9/12 cursor-pointer items-center gap-1"
          onClick={(e) => sortingFunction(e)}
        >
          Created Date
          {sorted === "createdAt" ? (
            dir === 1 ? (
              <FaSortDown />
            ) : (
              <FaSortUp />
            )
          ) : (
            <FaSort />
          )}
        </h2>
        <h2 id="link" className="flex w-3/12 cursor-pointer items-center gap-1">
          Link
        </h2>
      </header>
      <Separator className="w-full" />
      <div className="h-[50vh] overflow-hidden sm:h-[25vw]">
        <AnimatePresence>
          {localData.length === 0 ? (
            <div className="p-4 text-center font-bold sm:text-[1vw]">
              No Transactions Yet
            </div>
          ) : (
            localData
              .map((row) => (
                <motion.div
                  key={row.id}
                  className="h-auto"
                  layoutId={`${row.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0, display: "absolute" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="m-9 my-4 flex items-center sm:text-[1vw]">
                    <div className="flex w-9/12 items-center gap-1 overflow-hidden">
                      <h2 className="pb-1">
                        {row.createdAt.toLocaleDateString()}
                      </h2>
                    </div>
                    <h2 className="flex w-3/12 items-center gap-1">
                      <Link
                        href={row.link}
                        className="rounded-3xl bg-purple p-4 text-white transition hover:bg-white hover:text-black"
                      >
                        Link
                      </Link>
                    </h2>
                  </div>
                  <Separator className="w-full" />
                </motion.div>
              ))
              .slice((page - 1) * 6, page * 6)
          )}
        </AnimatePresence>
      </div>
      <div className="mt-7 flex items-center gap-6 sm:ml-10">
        <Button
          disabled={page === 1 ? true : false}
          onClick={() => setPage((old) => old - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={endPage === page || !endPage ? true : false}
          onClick={() => setPage((old) => old + 1)}
        >
          Next
        </Button>
        <p>
          Page {!endPage ? 0 : page} of {endPage}
        </p>
      </div>
    </div>
  );
}
