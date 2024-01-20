'use client'
import { BillsUI, Button, GraphUI, HeroUI, SavingsUI, StatsUI } from "@acme/ui";
import { BillsForm, History, SavingsForm } from "."
import { apiReact } from "~/trpc/react";
import { useEffect, useState } from "react";


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "Oct", "Nov", "Dec"]
export function AppPage() {


  const utils = apiReact.useUtils()
  const { data: statsData, error: statsError } = apiReact.transactions.get7monthstats.useQuery()
  const { data: savingsData, error: savingsError } = apiReact.transactions.getAllSavings.useQuery()
  const { data: billsData, error: billsError } = apiReact.transactions.getAllBills.useQuery()
  const { data: historyData, error: historyError } = apiReact.transactions.getAll.useQuery()
  if (statsError || savingsError || billsError || historyError) {
    utils.transactions.sessionExists.invalidate()
  }

  const [graphData, setGraphData] = useState<(typeof statsData)[]>([])
  // const [rawData, setRawData] = useState([])


  const incomeList = statsData?.income ?? []
  const expenseList = statsData?.expense ?? []
  const savingsList = statsData?.savings ?? []

  useEffect(() => {

    if (statsData) {
      console.log(statsData, "statsdata")
      const finalStats = []
      let currentMonth = new Date().getMonth()
      let currentYear = new Date().getFullYear()
      for (let i = 0; i < 7; i++) {
        // @ts-ignore
        let currIncome = incomeList.find((item) => item.txn_month.getMonth() === currentMonth && item.txn_month.getFullYear() === currentYear)?.monthly_sum ?? 0
        // @ts-ignore
        let currExpense = expenseList.find((item) => item.txn_month.getMonth() === currentMonth && item.txn_month.getFullYear() === currentYear)?.monthly_sum ?? 0
        // @ts-ignore
        let currSavings = savingsList.find((item) => item.txn_month.getMonth() === currentMonth && item.txn_month.getFullYear() === currentYear)?.monthly_sum ?? 0
        finalStats.push({
          date: `${months[(new Date(currentYear, currentMonth)).getMonth()]} ${currentYear.toString().slice(2)}`,
          income: currIncome,
          expense: currExpense,
          savings: currSavings
        })
        currentMonth = currentMonth - 1
        if (currentMonth === -1) {
          currentMonth = 11
          currentYear = currentYear - 1
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
      console.log(finalStats, "finalstatse2")
      // @ts-ignore
      setGraphData(finalStats.reverse())
    }
  }, [statsData])

  return (
    <div className="dark">
      <div className="mx-10">
        <div className="flex gap-10">
          <div className="w-full">
            <div className="flex justify-around mb-4">
              <HeroUI data={graphData[graphData.length - 1]} />
              <div className="flex flex-col justify-between">
                <StatsUI data={graphData} dataKey="income" />
                <StatsUI data={graphData} dataKey="expense" />
                <StatsUI data={graphData} dataKey="savings" />
              </div>
            </div>
            <div className="flex justify-around">
              <BillsUI data={billsData} buttonComp={<BillsForm />} buttonWorkable />
              <SavingsUI data={savingsData} buttonComp={<SavingsForm />} buttonWorkable />
            </div>
            <GraphUI data={graphData} />
          </div>
          <History localData={historyData} />
        </div>
      </div>
    </div>
  );
}
