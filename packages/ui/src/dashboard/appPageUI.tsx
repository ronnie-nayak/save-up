import { BillsUI, Button, GraphUI, HeroUI, HistoryUI, SavingsUI, StatsUI } from "@acme/ui";

export function AppPageUI() {
  return (
    <div className="dark ">
      <div className="mx-10">
        <div className="flex gap-10">
          <div className="w-full">
            <div className="flex justify-around mb-4">
              <HeroUI data={dataGraph[dataGraph.length - 1]} />
              <div className="flex flex-col justify-between">
                <StatsUI data={dataGraph} dataKey="income" />
                <StatsUI data={dataGraph} dataKey="expense" />
                <StatsUI data={dataGraph} dataKey="savings" />
              </div>
            </div>
            <div className="flex justify-around">
              {/* @ts-ignore */}
              <BillsUI data={billsGraph} buttonComp={<br />} buttonWorkable={false} />
              {/* @ts-ignore */}
              <SavingsUI data={savingsGraph} buttonComp={<br />} buttonWorkable={false} />
            </div>
            {/* @ts-ignore */}
            <GraphUI data={dataGraph} />
          </div>
          {/* @ts-ignore */}
          <HistoryUI localData={historyGraph} />
        </div>
      </div>
    </div>
  );
}


const savingsGraph = [
  {
    title: "Watch",
    amount: 4000,
    current: 2000,
    color: "green",
  },
  {
    title: "Phone",
    amount: 3000,
    current: 1000,
    color: "red",
  },
  {
    title: "Car",
    amount: 2000,
    current: 500,
    color: "blue",
  },
  {
    title: "House",
    amount: 5000,
    current: 3000,
    color: "yellow",
  },
]


const billsGraph = [
  {
    title: "Rent",
    amount: 4000,
    dueAt: new Date("2029-01-01"),
  },
  {
    title: "Electricity",
    amount: 3000,
    dueAt: new Date("2029-01-01"),
  },
  {
    title: "Water",
    amount: 2000,
    dueAt: new Date("2029-01-01"),
  }
]

const dataGraph = [
  {
    date: "Jan",
    income: 4000,
    expense: 2400,
    savings: 2400,
  },
  {
    date: "Feb",
    income: 3000,
    expense: 1398,
    savings: 2210,
  },
  {
    date: "Mar",
    income: 2000,
    expense: 9800,
    savings: 2290,
  },
  {
    date: "Apr",
    income: 2780,
    expense: 3908,
    savings: 2000,
  },
  {
    date: "May",
    income: 1890,
    expense: 4800,
    savings: 2181,
  },
  {
    date: "Jun",
    income: 2390,
    expense: 3800,
    savings: 2500,
  },
  {
    date: "Jul",
    income: 3490,
    expense: 4300,
    savings: 2100,
  },
];


const historyGraph = [
  {
    "id": 1,
    "title": "Freelance Mark",
    "category": "Salary",
    "type": "income",
    "amount": 9180,
    "createdAt": new Date("Mar 31, 2022")
  },
  {
    "id": 2,
    "title": "Car savings",
    "category": "Car",
    "type": "savings",
    "amount": 1926,
    "createdAt": new Date("Dec 9, 2022")
  },
  {
    "id": 3,
    "title": "Phone savings",
    "category": "Phone",
    "type": "savings",
    "amount": 3405,
    "createdAt": new Date("Dec 20, 2019")
  },
  {
    "id": 4,
    "title": "Sent to Mom",
    "category": "Miscellaneous",
    "type": "expense",
    "amount": 8355,
    "createdAt": new Date("Jan 26, 2023")
  },
  {
    "id": 5,
    "title": "Nov Rent",
    "category": "Rent",
    "type": "expense",
    "amount": 8979,
    "createdAt": new Date("Nov 16, 2020")
  },
  {
    "id": 6,
    "title": "Jan Salary",
    "category": "Salary",
    "type": "income",
    "amount": 8266,
    "createdAt": new Date("Jan 13, 2020")
  },
  {
    "id": 7,
    "title": "Electricity Bill",
    "category": "Miscellaneous",
    "type": "expense",
    "amount": 9480,
    "createdAt": new Date("Apr 9, 2020")
  },
  {
    "id": 8,
    "title": "Feb Rent",
    "category": "Rent",
    "type": "expense",
    "amount": 1644,
    "createdAt": new Date("Feb 27, 2022")
  },
  {
    "id": 9,
    "title": "Groceries",
    "category": "Food",
    "type": "income",
    "amount": 2083,
    "createdAt": new Date("Jan 10, 2023")
  },
  {
    "id": 10,
    "title": "Stock Earnings",
    "category": "Salary",
    "type": "income",
    "amount": 5271,
    "createdAt": new Date("Sep 19, 2021")
  },
]
