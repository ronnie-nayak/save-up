
import { schema } from "@acme/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { AddMoneySchema } from "@acme/validators";

export const transactionsRouter = createTRPCRouter({
  addNew: protectedProcedure
    .input(AddMoneySchema)
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.transactions).values({ ...input, userId: ctx.session.user.id });
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
