import { relations } from "drizzle-orm";

import { pgTable } from "./_table";
import { integer, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("name", { length: 256 }).notNull(),
  category: varchar("content", { length: 256 }).notNull(),
  amount: integer("amount").notNull(),
  bankAccount: varchar("bankAccount", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const transactionRelations = relations(transactions, ({ one }) => ({
  users: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  })
}))
