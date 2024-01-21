"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as PopoverRadix from "@radix-ui/react-popover";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

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
  SavingsItem,
  SavingsItemBig,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@acme/ui";
import { GetSavingsType } from "@acme/validators";

import { apiReact } from "~/trpc/react";

export function SavingsTable() {
  const [localData, setLocalData] = useState<GetSavingsType[]>([]);

  const [loader, setLoader] = useState<number | null>(null);
  const [loader2, setLoader2] = useState<number | null>(null);

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
    apiReact.transactions.getAllSavings.useQuery();
  if (isError) {
    utils.transactions.sessionExists.invalidate();
    router.replace("/login");
  }

  const contributeToSavings =
    apiReact.transactions.contributeToSavings.useMutation({
      onSuccess: (data) => {
        utils.transactions.getAllSavings.invalidate();
      },
      onError: (error) => {
        utils.transactions.sessionExists.invalidate();
      },
    });
  const deleteSavings = apiReact.transactions.deleteSavings.useMutation({
    onSuccess: (data) => {
      utils.transactions.getAllSavings.invalidate();
    },
    onError: (error) => {
      utils.transactions.sessionExists.invalidate();
    },
  });
  useEffect(() => {
    if (data) setLocalData(() => [...data]);
  }, [data]);

  const endPage = Math.ceil(localData.length / 3);

  useEffect(() => {
    if (localData) {
      const timeout = setTimeout(() => {
        const search = searchParams.has("title")
          ? searchParams.get("title")
          : "";
        let filteredData = localData;
        if (data)
          filteredData = data.filter((row) =>
            row.title!.toLowerCase().includes(search?.toLowerCase()!),
          );
        setLocalData(() => [...filteredData]);
        setPage(1);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  const [page, setPage] = useState(1);

  const contributeToSavingsHandler = (
    row: GetSavingsType,
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    contributeToSavings.mutate({
      title: row.title,
      category: row.category,
      current: row.current!,
      amount: row.amount!,
      // @ts-ignore
      additional: parseInt(e.target[0].value),
      savingsId: row.id,
    });
    setTimeout(() => {
      setLoader(null);
    }, 1000);
    setLoader(row.id);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="dark h-min text-left">
      <form className="mb-4 flex gap-6 rounded-3xl bg-midnight p-6">
        <Button
          className="rounded-full"
          type="reset"
          onClick={() => {
            router.replace("/homepage/savings");
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

      <div className="h-[45vh] overflow-hidden sm:h-[26vw]">
        <AnimatePresence>
          {localData.length === 0 ? (
            <div className="p-4 text-center font-bold sm:text-[1vw]">
              No Savings Yet
            </div>
          ) : (
            localData
              .map((row) => (
                <motion.div
                  key={row.id}
                  layoutId={"" + row.id}
                  className="flex items-center gap-6"
                  style={{
                    color: row.color!,
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <SavingsItemBig data={row} />
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        className="h-16 bg-orange-500 font-bold sm:text-[1vw]"
                        disabled={row.amount === row.current}
                      >
                        <div className="flex items-center gap-4">
                          {loader === row.id ? (
                            <div className="loader"></div>
                          ) : (
                            <>
                              <FiPlusCircle />
                              <h3 className="hidden sm:block">
                                Add to Savings
                              </h3>
                            </>
                          )}
                        </div>
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <form
                        onSubmit={(e) => contributeToSavingsHandler(row, e)}
                        className="flex flex-col items-start gap-2"
                      >
                        <h1 className="font-bold">Add to savings</h1>
                        <Input
                          type="number"
                          placeholder="Amount"
                          max={row.amount! - row.current!}
                          min={0}
                        />
                        <PopoverRadix.Close>
                          <Button>Submit</Button>
                        </PopoverRadix.Close>
                      </form>
                    </PopoverContent>
                  </Popover>
                  <Button
                    className="h-16 bg-green-500 font-bold sm:text-[1vw]"
                    disabled={row.amount !== row.current}
                    onClick={() => {
                      deleteSavings.mutate({ savingsId: row.id });
                      setTimeout(() => {
                        setLoader2(null);
                      }, 1000);
                      setLoader2(row.id);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      {loader2 === row.id ? (
                        <div className="loader"></div>
                      ) : (
                        <>
                          <IoIosCheckmarkCircleOutline />
                          <h3 className="hidden sm:block">Complete</h3>
                        </>
                      )}
                    </div>
                  </Button>
                </motion.div>
              ))
              .slice((page - 1) * 3, page * 3)
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-6 p-4 px-10">
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
