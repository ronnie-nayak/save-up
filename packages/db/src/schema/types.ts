import type { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { bills } from "./bills";
import { savings } from "./savings";
import { transactions } from "./transactions";

export const insertTransactionSchema = createInsertSchema(transactions);
export const selectTransactionSchema = createSelectSchema(transactions);

export type insertTransactionType = z.infer<typeof insertTransactionSchema>;
export type selectTransactionType = z.infer<typeof selectTransactionSchema>;

export const insertSavingsSchema = createInsertSchema(savings);
export const selectSavingsSchema = createSelectSchema(savings);

export type insertSavingsType = z.infer<typeof insertSavingsSchema>;
export type selectSavingsType = z.infer<typeof selectSavingsSchema>;

export const insertBillsSchema = createInsertSchema(bills);
export const selectBillsSchema = createSelectSchema(bills);

export type insertBillsType = z.infer<typeof insertBillsSchema>;
export type selectBillsType = z.infer<typeof selectBillsSchema>;
