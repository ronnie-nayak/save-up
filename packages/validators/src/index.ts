import { z } from "zod";
// import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
// import { schema } from "@acme/db"

export const AddMoneySchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  type: z.enum(["income", "expense"]),
  amount: z.coerce.number(),
  bankAccount: z.string().min(1),
});

// Schema for inserting a user - can be used to validate API requests
// export const insertTransactionsSchema = createInsertSchema(schema.transactions);

// Schema for selecting a user - can be used to validate API responses
// export const selectTransactionsSchema = createSelectSchema(schema.transactions);
