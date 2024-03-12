"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { BillsUI, GraphUI, HeroUI, SavingsUI, StatsUI } from "@acme/ui";

import { apiReact } from "~/trpc/react";
import { BillsForm, History, SavingsForm } from ".";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function AppPage() {
  const router = useRouter();
  const utils = apiReact.useUtils();
  const { data: statsData, isError: isStatsError } =
    apiReact.transactions.get7monthstats.useQuery();
  const { data: savingsData, isError: isSavingsError } =
    apiReact.transactions.getAllSavings.useQuery();
  const { data: billsData, isError: isBillsError } =
    apiReact.transactions.getAllBills.useQuery();
  const { data: historyData, isError: isHistoryError } =
    apiReact.transactions.getAll.useQuery();
  if (isStatsError || isSavingsError || isBillsError || isHistoryError) {
    utils.transactions.sessionExists.invalidate();
    router.replace("/login");
  }

  const [graphData, setGraphData] = useState<(typeof statsData)[]>([]);

  const incomeList = statsData?.income ?? [];
  const expenseList = statsData?.expense ?? [];
  const savingsList = statsData?.savings ?? [];

  useEffect(() => {
    if (statsData) {
      const finalStats = [];
      let currentMonth = new Date().getMonth();
      let currentYear = new Date().getFullYear();
      for (let i = 0; i < 7; i++) {
        // @ts-ignore
        const currIncome =
          incomeList.find(
            (item) =>
              // @ts-ignore
              item.txn_month.getMonth() === currentMonth &&
              // @ts-ignore
              item.txn_month.getFullYear() === currentYear,
          )?.monthly_sum ?? 0;
        // @ts-ignore
        const currExpense =
          expenseList.find(
            (item) =>
              // @ts-ignore
              item.txn_month.getMonth() === currentMonth &&
              // @ts-ignore
              item.txn_month.getFullYear() === currentYear,
          )?.monthly_sum ?? 0;
        const currSavings =
          savingsList.find(
            (item) =>
              // @ts-ignore
              item.txn_month.getMonth() === currentMonth &&
              // @ts-ignore
              item.txn_month.getFullYear() === currentYear,
          )?.monthly_sum ?? 0;
        finalStats.push({
          date: `${
            months[new Date(currentYear, currentMonth).getMonth()]
          } ${currentYear.toString().slice(2)}`,
          income: currIncome,
          expense: currExpense,
          savings: currSavings,
        });
        currentMonth = currentMonth - 1;
        if (currentMonth === -1) {
          currentMonth = 11;
          currentYear = currentYear - 1;
        }
      }
      // const tempArray = JSON.parse(JSON.stringify(finalStats))
      // console.log(tempArray, "finaltempstatse1")
      // setRawData(tempArray.reverse())
      // const maxValue = Math.max(...finalStats.map((item) => Math.max(item.income, item.expense, item.savings)))
      // console.log(maxValue, "maxvalue")
      // adjusting all values based on max value of 10000
      // finalStats.forEach((item) => {
      //   item.income = Math.round(item.income / (maxValue / 10000))
      //   item.expense = Math.round(item.expense / (maxValue / 10000))
      //   item.savings = Math.round(item.savings / (maxValue / 10000))
      // })
      // @ts-ignore
      setGraphData(finalStats.reverse());
    }
  }, [statsData]);

  return (
    <div className="dark">
      <div className="mx-10">
        <div className="flex flex-col gap-10 sm:flex-row">
          <div className="w-full">
            <div className="mb-4 flex flex-col justify-around sm:flex-row">
              <HeroUI data={graphData[graphData.length - 1]} />
              <div className="flex flex-col justify-between">
                <StatsUI data={graphData} dataKey="income" />
                <StatsUI data={graphData} dataKey="expense" />
                <StatsUI data={graphData} dataKey="savings" />
              </div>
            </div>
            <div className="flex flex-col justify-around sm:flex-row">
              <BillsUI
                data={billsData}
                buttonComp={<BillsForm />}
                buttonWorkable
              />
              <SavingsUI
                data={savingsData}
                buttonComp={<SavingsForm />}
                buttonWorkable
              />
            </div>
            <GraphUI data={graphData} />
          </div>
          <History localData={historyData} />
        </div>
      </div>
    </div>
  );
}
