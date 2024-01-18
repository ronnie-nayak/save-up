
import { relations } from "drizzle-orm";

import { pgTable } from "./_table";
import { date, integer, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 256 }).notNull(),
  category: varchar("category", { length: 256 }).notNull(),
  type: varchar("type", { length: 7, enum: ["income", "expense", "savings"] }).notNull(),
  amount: integer("amount").notNull(),
  createdAt: date("createdAt", { mode: "date" })
    .defaultNow()
    .notNull(),
});


export const transactionRelations = relations(transactions, ({ one }) => ({
  users: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  })
}))
