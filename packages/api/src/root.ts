import { authRouter } from "./router/auth";
import { transactionsRouter } from "./router/transaction";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  transactions: transactionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
