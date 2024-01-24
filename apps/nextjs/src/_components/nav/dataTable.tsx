"use client";

import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { GetMoneyType } from "@acme/validators";

import { apiReact } from "~/trpc/react";
import { MoneyForm } from ".";

export function DataTable() {
  const [localData, setLocalData] = useState<GetMoneyType[]>([]);

  const [formOpen, setFormOpen] = useRecoilState(FormOpenState);

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
  const { data, isLoading, isError } = apiReact.transactions.getAll.useQuery();
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
    let column = event.target.id;
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

  useEffect(() => {
    // const [formOpen, setFormOpen] = useRecoilState(FormOpenState)

    if (localData) {
      const timeout = setTimeout(() => {
        const search = searchParams.has("title")
          ? searchParams.get("title")
          : "";
        const typeSearch = searchParams.has("type")
          ? searchParams.get("type")
          : null;
        const startDateSearch = searchParams.has("startDate")
          ? searchParams.get("startDate")
          : null;
        const endDateSearch = searchParams.has("endDate")
          ? searchParams.get("endDate")
          : null;
        let filteredData = localData;
        if (data)
          filteredData = data.filter((row) =>
            row.title.toLowerCase().includes(search?.toLowerCase()!),
          );
        if (typeSearch)
          filteredData = filteredData.filter((row) => row.type === typeSearch);
        if (startDateSearch)
          filteredData = filteredData.filter(
            (row) => row.createdAt >= new Date(startDateSearch),
          );
        if (endDateSearch)
          filteredData = filteredData.filter(
            (row) => row.createdAt <= new Date(endDateSearch),
          );
        setLocalData(() => [...filteredData]);
        setPage(1);
        // setLocalData(() => [...dataTable.filter((row) => row.title.toLowerCase().includes(search.toLowerCase()))])
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  const [search, setSearch] = useState("");
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    router.replace(
      pathname + "?" + createQueryString("title", event.target.value),
    );
  };

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);

  if (isLoading) return <Loading />;

  return (
    <div className=" dark m-2 my-2 rounded-3xl bg-midnight p-6 text-left sm:m-10">
      <div className="flex h-14 items-center gap-4">
        <h1 className="sm:text-[1.5vw] ">Transactions</h1>
        <PopupButton formOpen={formOpen} setFormOpen={setFormOpen}>
          <MoneyForm />
        </PopupButton>
      </div>
      <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
        <div className="flex w-full items-center gap-2 sm:w-1/3 ">
          <Button
            type="reset"
            onClick={() => {
              router.replace("/homepage/transactions");
              setStartDate(null);
              setEndDate(null);
              setSearch("");
            }}
          >
            Clear
          </Button>
          <Input
            type="text"
            placeholder="Search"
            value={search}
            className="w-full"
            onChange={handleSearchChange}
          />
        </div>
        <Select
          value={searchParams.has("type") ? searchParams.get("type")! : ""}
          onValueChange={(val) =>
            router.replace(pathname + "?" + createQueryString("type", val))
          }
        >
          <SelectTrigger className="w-full sm:w-1/6">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">income</SelectItem>
            <SelectItem value="expense">expense</SelectItem>
            <SelectItem value="savings">savings</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !startDate && "text-muted-foreground",
              )}
            >
              {startDate ? (
                startDate.toDateString()
              ) : (
                <span>Pick Start date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              onSelect={(date) => {
                setStartDate(date!);
                router.replace(
                  pathname +
                    "?" +
                    createQueryString("startDate", date?.toDateString()!),
                );
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <span className="hidden sm:inline sm:text-6xl">&#8651;</span>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !endDate && "text-muted-foreground",
              )}
            >
              {endDate ? endDate.toDateString() : <span>Pick End date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              onSelect={(date) => {
                setEndDate(date!);
                router.replace(
                  pathname +
                    "?" +
                    createQueryString("endDate", date?.toDateString()!),
                );
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <header className="m-9 my-4 flex text-gray-500 sm:text-[1.25vw]">
        <h2
          id="title"
          className="flex w-4/12 cursor-pointer items-center gap-1"
          onClick={(e) => sortingFunction(e)}
        >
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
        <h2
          id="type"
          className="hidden w-3/12 cursor-pointer items-center gap-1 sm:flex"
          onClick={(e) => sortingFunction(e)}
        >
          type
          {sorted === "type" ? (
            dir === 1 ? (
              <FaSortDown />
            ) : (
              <FaSortUp />
            )
          ) : (
            <FaSort />
          )}
        </h2>
        <h2
          id="amount"
          className="flex w-2/12 cursor-pointer items-center gap-1"
          onClick={(e) => sortingFunction(e)}
        >
          amount
          {sorted === "amount" ? (
            dir === 1 ? (
              <FaSortDown />
            ) : (
              <FaSortUp />
            )
          ) : (
            <FaSort />
          )}
        </h2>
        <h2
          id="createdAt"
          className="ml-auto flex w-3/12 cursor-pointer items-center gap-1 sm:m-0"
          onClick={(e) => sortingFunction(e)}
        >
          createdAt
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
                  <div className="m-3 flex sm:text-[1vw]">
                    <div className="w-4/12 overflow-hidden">
                      <h2 className="pb-1">{row.title}</h2>
                      <h3 className="text-sm text-gray-500">{row.category}</h3>
                    </div>
                    <div className="hidden w-3/12 sm:block">
                      <div className="relative flex w-min items-center justify-center gap-1 rounded-full bg-bermuda p-2 pl-8 text-base">
                        <button
                          className={`absolute left-4 top-4 h-2 w-2 animate-ping rounded-full ${
                            row.type === "income"
                              ? "bg-green-500"
                              : row.type === "expense"
                                ? "bg-red-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <button
                          className={`absolute left-4 top-4 h-2 w-2 rounded-full ${
                            row.type === "income"
                              ? "bg-green-500"
                              : row.type === "expense"
                                ? "bg-red-500"
                                : "bg-blue-500"
                          }`}
                        />
                        {row.type}
                      </div>
                    </div>
                    <h2 className="w-2/12">
                      {row.type === "expense" && "-"}${row.amount}
                    </h2>
                    <h2 className="ml-auto w-3/12 sm:m-0">
                      {row.createdAt.toDateString()}
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
