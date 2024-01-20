'use client'
import { BillsUI, Button, GraphUI, HeroUI, SavingsUI, StatsUI } from "@acme/ui";
import { dataGraph } from "../dashboard/data";
import { BillsForm, History, SavingsForm } from "."
import { apiReact } from "~/trpc/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FormOpenState } from '@acme/atoms'
import { GetMoneyType } from "@acme/validators";
import { useRouter } from "next/navigation";


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "Oct", "Nov", "Dec"]
export function AppPage() {

  const router = useRouter()

  const { data: statsData, isLoading: statsIsLoading, error: statsError } = apiReact.transactions.get7monthstats.useQuery()
  const { data: savingsData, isLoading: savingsIsLoading, error: savingsError } = apiReact.transactions.getAllSavings.useQuery()
  const { data: billsData, isLoading: billsIsLoading, error: billsError } = apiReact.transactions.getAllBills.useQuery()
  const { data: historyData, isLoading: historyIsLoading, error: historyError } = apiReact.transactions.getAll.useQuery()
  if (statsError || savingsError || billsError || historyError) {
    router.replace('/login')
  }

  const [graphData, setGraphData] = useState([])


  const incomeList = statsData?.income
  const expenseList = statsData?.expense
  const savingsList = statsData?.savings

  useEffect(() => {

    if (statsData) {

      const finalStats = []
      let currentMonth = new Date().getMonth()
      let currentYear = new Date().getFullYear()
      for (let i = 0; i < 7; i++) {
        let currIncome = incomeList.find((item) => item.txn_month.getMonth() === currentMonth && item.txn_month.getFullYear() === currentYear)?.monthly_sum ?? 0
        let currExpense = expenseList.find((item) => item.txn_month.getMonth() === currentMonth && item.txn_month.getFullYear() === currentYear)?.monthly_sum ?? 0
        let currSavings = savingsList.find((item) => item.txn_month.getMonth() === currentMonth && item.txn_month.getFullYear() === currentYear)?.monthly_sum ?? 0
        finalStats.push({
          date: `${months[(new Date(currentYear, currentMonth)).getMonth()]} ${currentYear.toString().slice(2)}`,
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
