import { relations } from "drizzle-orm";
import {
  date,
  integer,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import { pgTable } from "./_table";
import { users } from "./auth";

export const savings = pgTable("savings", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 256 }).notNull(),
  category: varchar("category", { length: 256 }).notNull(),
  current: integer("current"),
  amount: integer("amount").notNull(),
  color: varchar("color", { length: 256 }).notNull(),
});

export const savingsRelations = relations(savings, ({ one }) => ({
  users: one(users, {
    fields: [savings.userId],
    references: [users.id],
  }),
}));
