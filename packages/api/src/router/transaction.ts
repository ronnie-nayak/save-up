
import { desc, eq, insertBillsSchema, insertSavingsSchema, insertSavingsType, schema, sql } from "@acme/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { insertTransactionSchema } from "@acme/db";
import { z } from "zod";

export const transactionsRouter = createTRPCRouter({
  // initialize: protectedProcedure
  //   .mutation(async ({ ctx }) => {
  //     return await ctx.db
  //       .insert(schema.transactions)
  //       .values(dataman);
  //   }),
  sessionExists: publicProcedure.query(({ ctx }) => {
    return ctx.session
  }),


  get7monthstats: protectedProcedure.query(async ({ ctx }) => {
    let income = await ctx.db.execute(sql`SELECT date_trunc('month', ${schema.transactions.createdAt}) AS txn_month, sum(${schema.transactions.amount}) as monthly_sum FROM ${schema.transactions} where ${schema.transactions.type}=${"income"} AND ${schema.transactions.userId}=${ctx.session.user.id} GROUP BY txn_month`)
    income = income.sort((a, b) => (a.txn_month as number) - (b.txn_month as number))

    let expense = await ctx.db.execute(sql`SELECT date_trunc('month', ${schema.transactions.createdAt}) AS txn_month, sum(${schema.transactions.amount}) as monthly_sum FROM ${schema.transactions} where ${schema.transactions.type}=${"expense"} AND ${schema.transactions.userId}=${ctx.session.user.id} GROUP BY txn_month`)
    expense = expense.sort((a, b) => (a.txn_month as number) - (b.txn_month as number))

    let savings = await ctx.db.execute(sql`SELECT date_trunc('month', ${schema.transactions.createdAt}) AS txn_month, sum(${schema.transactions.amount}) as monthly_sum FROM ${schema.transactions} where ${schema.transactions.type}=${"savings"} AND ${schema.transactions.userId}=${ctx.session.user.id} GROUP BY txn_month`)
    savings = savings.sort((a, b) => (a.txn_month as number) - (b.txn_month as number))
    return { income, expense, savings }
  }),

  addNew: protectedProcedure
    .input(insertTransactionSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(schema.transactions)
        .values({ ...input, userId: ctx.session.user.id });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(schema.transactions).where(eq(schema.transactions.userId, ctx.session.user.id)).orderBy(desc(schema.transactions.createdAt));
  }),

  addNewSavings: protectedProcedure
    .input(insertSavingsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(schema.savings)
        .values({ ...input, current: 0, userId: ctx.session.user.id });
    }),

  getAllSavings: protectedProcedure.query(async ({ ctx }) => {
    // return await ctx.db.query.savings.findMany({
    //   where: eq(schema.savings.userId, ctx.session.user.id)
    // })
    return await ctx.db.select().from(schema.savings).where(eq(schema.savings.userId, ctx.session.user.id)).orderBy(desc(sql<number>`(current/amount)*100`));
  }),


  addNewBills: protectedProcedure
    .input(insertBillsSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(schema.bills)
        .values({ ...input, userId: ctx.session.user.id });
    }),

  getAllBills: protectedProcedure.query(async ({ ctx }) => {
    // return await ctx.db.query.bills.findMany({
    //   where: eq(schema.bills.userId, ctx.session.user.id)
    // })
    return await ctx.db.select().from(schema.bills).where(eq(schema.bills.userId, ctx.session.user.id)).orderBy(schema.bills.dueAt);
  }),

  contributeToSavings: protectedProcedure
    .input(z.object(
      {
        title: z.string().min(1),
        category: z.string().min(1),
        current: z.coerce.number(),
        amount: z.coerce.number(),
        additional: z.coerce.number(),
        savingsId: z.coerce.number(),
      }
    ))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(schema.transactions)
        .values({ title: input.title, category: input.category, amount: input.additional, type: "savings", userId: ctx.session.user.id });
      return await ctx.db
        .update(schema.savings)
        .set({ current: input.current + input.additional })
        .where(eq(schema.savings.id, input.savingsId))
        .returning({ updatedId: schema.savings.id, updatedCurrent: schema.savings.current });
    }),

  deleteSavings: protectedProcedure
    .input(z.object({ savingsId: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .delete(schema.savings)
        .where(eq(schema.savings.id, input.savingsId))
        .returning({ deletedId: schema.savings.id });
    }),

  payBill: protectedProcedure
    .input(insertBillsSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(schema.transactions)
        .values({ title: input.title, category: input.category, amount: input.amount, type: "expense", userId: ctx.session.user.id })
      await ctx.db
        .delete(schema.bills)
        .where(eq(schema.bills.id, input.id!))
      await ctx.db
        .insert(schema.bills)
        .values({ title: input.title, category: input.category, amount: input.amount, dueAt: new Date(input.dueAt.setMonth(input.dueAt.getMonth() + 1)), userId: ctx.session.user.id })
    })


  // all: publicProcedure.query(({ ctx }) => {
  //   // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
  //   return ctx.db.query.post.findMany({
  //     orderBy: desc(schema.post.id),
  //     limit: 10,
  //   });
  // }),

  // byId: publicProcedure
  //   .input(z.object({ id: z.number() }))
  //   .query(({ ctx, input }) => {
  //     // return ctx.db
  //     //   .select()
  //     //   .from(schema.post)
  //     //   .where(eq(schema.post.id, input.id));
  //
  //     return ctx.db.query.post.findFirst({
  //       where: eq(schema.post.id, input.id),
  //     });
  //   }),
  //
  // create: protectedProcedure
  //   .input(CreatePostSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.db.insert(schema.post).values(input);
  //   }),
  //
  // delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
  //   return ctx.db.delete(schema.post).where(eq(schema.post.id, input));
  // }),
});
