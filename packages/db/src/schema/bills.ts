

import { relations } from "drizzle-orm";

import { pgTable } from "./_table";
import { date, integer, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const bills = pgTable("bills", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("name", { length: 256 }).notNull(),
  category: varchar("content", { length: 256 }).notNull(),
  amount: integer("amount").notNull(),
  dueAt: date("dueAt", { mode: "date" }).notNull(),
});


export const billsRelations = relations(bills, ({ one }) => ({
  users: one(users, {
    fields: [bills.userId],
    references: [users.id],
  })
}))
