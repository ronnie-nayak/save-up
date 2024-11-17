import { Badge, Card, CardContent, CardHeader, CardTitle } from "../shadcn";

const categoryColors = {
  Salary: "bg-green-500",
  Food: "bg-orange-500",
  Rent: "bg-blue-500",
  Shopping: "bg-purple-500",
  Entertainment: "bg-pink-500",
  Transport: "bg-yellow-500",
  Utilities: "bg-cyan-500",
  Healthcare: "bg-red-500",
  Education: "bg-indigo-500",
  Others: "bg-gray-500",
} as const;

const typeColors = {
  expense: "bg-red-500",
  income: "bg-green-500",
  savings: "bg-blue-500",
} as const;

export function TransactionCard({ transaction }: { transaction: any }) {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1">{transaction.title}</CardTitle>
          <span className="text-2xl font-bold">
            ₹{transaction.amount.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex gap-2">
          {/* @ts-ignore */}
          <Badge className={categoryColors[transaction.category]}>
            {transaction.category}
          </Badge>
          {/* @ts-ignore */}
          <Badge className={typeColors[transaction.type]}>
            {transaction.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{transaction.date}</p>
      </CardContent>
    </Card>
  );
}
