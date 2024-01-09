import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(({ ctx }) => {
    // testing type validation of overridden next-auth Session in @acme/auth package
    return ctx.session.user?.id || "no name";
  }),
});
