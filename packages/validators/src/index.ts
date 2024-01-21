import { z } from "zod";

// import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
// import { schema } from "@acme/db"

export const AddMoneySchema = z.object({
  id: z.number().optional(),
  userId: z.string().optional(),
  title: z.string().min(1).max(10),
  category: z.string().min(1),
  type: z.enum(["income", "expense"]),
  amount: z.coerce.number(),
  createdAt: z.date().optional(),
});

export type AddMoneyType = z.infer<typeof AddMoneySchema>;

export const GetMoneySchema = z.object({
  id: z.number(),
  userId: z.string().or(z.null()),
  title: z.string().min(1),
  category: z.string().min(1),
  type: z.enum(["income", "expense", "savings"]),
  amount: z.coerce.number(),
  createdAt: z.date(),
});

export type GetMoneyType = z.infer<typeof GetMoneySchema>;
// Schema for inserting a user - can be used to validate API requests
// export const insertTransactionsSchema = createInsertSchema(schema.transactions);

// Schema for selecting a user - can be used to validate API responses
// export const selectTransactionsSchema = createSelectSchema(schema.transactions);

export const AddSavingsSchema = z.object({
  id: z.number().optional(),
  userId: z.string().optional(),
  title: z.string().min(1).max(10),
  category: z.string().min(1),
  current: z.coerce.number().optional(),
  amount: z.coerce.number(),
  color: z.string().min(1).optional(),
});

export type AddSavingsType = z.infer<typeof AddSavingsSchema>;

export const GetSavingsSchema = z.object({
  id: z.number(),
  userId: z.string().or(z.null()),
  title: z.string().min(1),
  category: z.string().min(1),
  current: z.coerce.number().nullable(),
  amount: z.coerce.number(),
  color: z.string().min(1),
});

export type GetSavingsType = z.infer<typeof GetSavingsSchema>;
// Schema for inserting a user - can be used to validate API requests
// export const insertTransactionsSchema = createInsertSchema(schema.transactions);

// Schema for selecting a user - can be used to validate API responses
// export const selectTransactionsSchema = createSelectSchema(schema.transactions);
//

export const AddBillsSchema = z.object({
  id: z.number().optional(),
  userId: z.string().optional(),
  title: z.string().min(1).max(10),
  category: z.string().min(1),
  amount: z.coerce.number(),
  dueAt: z.date(),
});

export type AddBillsType = z.infer<typeof AddBillsSchema>;

export const GetBillsSchema = z.object({
  id: z.number(),
  userId: z.string().or(z.null()),
  title: z.string().min(1),
  category: z.string().min(1),
  amount: z.coerce.number(),
  dueAt: z.date(),
});

export type GetBillsType = z.infer<typeof GetBillsSchema>;
// Schema for inserting a user - can be used to validate API requests
// export const insertTransactionsSchema = createInsertSchema(schema.transactions);

// Schema for selecting a user - can be used to validate API responses
// export const selectTransactionsSchema = createSelectSchema(schema.transactions);
