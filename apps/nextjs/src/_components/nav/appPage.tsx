'use client'
import { BillsUI, Button, GraphUI, HeroUI, SavingsUI, StatsUI } from "@acme/ui";
import { dataGraph } from "../dashboard/data";
import { History } from "."
import { apiReact } from "~/trpc/react";
import { useEffect, useState } from "react";
export function AppPage() {

  // const addNewBills = apiReact.transactions.addNewBills.useMutation(
  // cnst inialize = apact.trpations.initiize.usation()
  const { data, isLoading, error } = apiReact.transactions.get7monthstats.useQuery()
  const [graphData, setGraphData] = useState([])

  const incomeList = data?.income
  const expenseList = data?.expense
  const savingsList = data?.savings

  useEffect(() => {

    if (data) {

      const finalStats = []
      let currentMonth = new Date().getMonth()
      let currentYear = new Date().getFullYear()
      for (let i = 0; i < 7; i++) {
        let currIncome = incomeList.find((item) => item.txn_month.getMonth() === currentMonth && item.txn_month.getFullYear() === currentYear)?.monthly_sum ?? 0
        let currExpense = expenseList.find((item) => item.txn_month.getMonth() === currentMonth && item.txn_month.getFullYear() === currentYear)?.monthly_sum ?? 0
        let currSavings = savingsList.find((item) => item.txn_month.getMonth() === currentMonth && item.txn_month.getFullYear() === currentYear)?.monthly_sum ?? 0
        console.log(currIncome, currExpense, currSavings)
        finalStats.push({
          date: (new Date(currentYear, currentMonth)).getMonth() + 1,
          income: currIncome / 10,
          expense: currExpense / 10,
          savings: currSavings / 10
        })
        currentMonth = currentMonth - 1
        if (currentMonth === -1) {
          currentMonth = 11
          currentYear = currentYear - 1
        }
      }
      console.log(finalStats)
      setGraphData(finalStats)
    }
  }, [data])

  if (isLoading) return <div>Loading...</div>
  return (
    <div className="dark">
      {/* <History /> */}



      {/* <Butick={() => initialtate()}>InitiaButton> */}
      {graphData.length === 0 ? <div>Click on the button to get 7 month stats</div> : (
        <>
          <GraphUI data={graphData} />
          <HeroUI />
          <SavingsUI />
          <BillsUI />
          <StatsUI data={graphData} />
        </>
      )}
    </div>
  );
}
