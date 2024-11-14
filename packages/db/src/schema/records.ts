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

export const records = pgTable("records", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  createdAt: date("createdAt", { mode: "date" }).defaultNow().notNull(),
  link: text("link").notNull(),
});

export const recordRelations = relations(records, ({ one }) => ({
  users: one(users, {
    fields: [records.userId],
    references: [users.id],
  }),
}));
