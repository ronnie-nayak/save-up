import { z } from "zod";

const IndiTransactionSchema = z.object({
  title: z.string(),
  category: z
    .enum([
      "Salary",
      "Food",
      "Rent",
      "Shopping",
      "Entertainment",
      "Transport",
      "Utilities",
      "Healthcare",
      "Education",
      "Others",
    ])
    .describe("Category of the transaction"),
  type: z.enum(["expense", "income", "savings"]),
  amount: z.number().positive(),
  date: z.string(),
});

export const TransactionSchema = z.object({
  transactions: z.array(IndiTransactionSchema),
});

export type Transaction = z.infer<typeof TransactionSchema>;
export type IndiTransaction = z.infer<typeof IndiTransactionSchema>;
