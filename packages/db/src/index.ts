
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as auth from "./schema/auth";
import * as transactions from "./schema/transactions";
import * as savings from "./schema/savings";
import * as bills from "./schema/bills";

export * from './schema/types'

export const schema = { ...auth, ...transactions, ...savings, ...bills };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!, { ssl: true });
export const db = drizzle(queryClient, { schema });
