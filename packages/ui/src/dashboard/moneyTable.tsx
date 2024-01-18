'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/ui"
// import { selectTransactionSchema } from "@acme/db"
import { GetMoneyType } from '@acme/validators'

export function MoneyTable({ data }: { data: GetMoneyType[] }) {
  const newer = new Date()
  return (
    <div className="m-10">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-[100px]">Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Account</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">{newer.toDateString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">{newer.toDateString()}</TableCell>
          </TableRow>
          {data.map((item) => (
            <TableRow>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.bankAccount}</TableCell>
              <TableCell className="text-right">{item.amount}</TableCell>
              <TableCell className="text-right">{item.createdAt?.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
