"use client";

import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

import {
  BillItem,
  BillItemBig,
  Button,
  Calendar,
  cn,
  FormControl,
  Input,
  Loading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@acme/ui";
import { GetBillsType } from "@acme/validators";

import { apiReact } from "~/trpc/react";

export function BillsTable() {
  const [localData, setLocalData] = useState<GetBillsType[]>([]);

  const [loader, setLoader] = useState<number | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const utils = apiReact.useUtils();
  const { data, isLoading, isError } =
    apiReact.transactions.getAllBills.useQuery();
  if (isError) {
    utils.transactions.sessionExists.invalidate();
    router.replace("/login");
  }

  const payBill = apiReact.transactions.payBill.useMutation({
    onSuccess: () => {
      utils.transactions.getAllBills.invalidate();
    },
    onError: (error) => {
      utils.transactions.sessionExists.invalidate();
    },
  });
  useEffect(() => {
    if (data) setLocalData(() => [...data]);
  }, [data]);

  const endPage = Math.ceil(localData.length / 4);

  const [sorted, setSorted] = useState("");
  const [dir, setDir] = useState(1);

  const sortingFunction = () => {
    let direction = dir;
    setDir((old) => -old);
    setSorted("title");

    const sortedData = localData.sort((a, b) => {
      // @ts-ignore
      if (a.title >= b.title) {
        return direction;
      }
      return -direction;
    });
    setLocalData((old) => [...sortedData]);
  };

  useEffect(() => {
    if (localData) {
      const timeout = setTimeout(() => {
        const search = searchParams.has("title")
          ? searchParams.get("title")
          : "";
        let filteredData = localData;
        if (data)
          filteredData = data.filter(
            (row) => row.title?.toLowerCase().includes(search?.toLowerCase()!),
          );
        setLocalData(() => [...filteredData]);
        setPage(1);
        // setLocalData(() => [...dataTable.filter((row) => row.title.toLowerCase().includes(search.toLowerCase()))])
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  const [page, setPage] = useState(1);

  if (isLoading) return <Loading />;

  return (
    <div className="dark h-min">
      <form className="flex gap-6 rounded-3xl bg-midnight p-6">
        <Button
          className="rounded-full"
          type="reset"
          onClick={() => {
            router.replace("/bills");
          }}
        >
          Clear
        </Button>
        <Input
          type="text"
          placeholder="Search"
          className="w-1/2"
          onChange={(event) =>
            router.replace(
              pathname + "?" + createQueryString("title", event.target.value),
            )
          }
        />
      </form>

      <Button
        className="ml-20 mt-3 rounded-full bg-midnight p-4"
        onClick={sortingFunction}
      >
        <h2 id="title" className="flex items-center gap-1 sm:text-[1vw]">
          title
          {sorted === "title" ? (
            dir === 1 ? (
              <FaSortDown />
            ) : (
              <FaSortUp />
            )
          ) : (
            <FaSort />
          )}
        </h2>
      </Button>
      <div className="h-[55vh] overflow-hidden sm:h-[26vw]">
        <AnimatePresence>
          {localData.length === 0 ? (
            <div className="p-4 text-center font-bold sm:text-[1vw]">
              No Bills Yet
            </div>
          ) : (
            localData
              .map((row) => (
                <motion.div
                  key={row.id}
                  layoutId={"" + row.id}
                  className="flex items-center gap-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <BillItemBig data={row} />
                  <Button
                    className="h-16 bg-green-500 font-bold sm:text-[1vw]"
                    onClick={() => {
                      payBill.mutate(row);
                      try {
                        fetch("/api/ses", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            title: row.title,
                            category: row.category,
                            amount: row.amount,
                            dueAt: row.dueAt,
                          }),
                        })
                          .then((res) => res.json())
                          .then((body) => {
                            if (body.ok) {
                              console.log("mail sent");
                            } else {
                              console.log("not sent ???");
                            }
                          });
                      } catch (error) {
                        console.error(error);
                      }
                      setTimeout(() => {
                        setLoader(null);
                      }, 1000);
                      setLoader(row.id);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {loader === row.id ? (
                        <div className="loader"></div>
                      ) : (
                        <>
                          <LiaMoneyBillWaveSolid />
                          <h3>Pay Bill</h3>
                        </>
                      )}
                    </div>
                  </Button>
                </motion.div>
              ))
              .slice((page - 1) * 4, page * 4)
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6 p-1 px-10">
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
