
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as auth from "./schema/auth";
import * as transactions from "./schema/transactions";

export const schema = { ...auth, ...transactions };

export { pgTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

// for query purposes
const queryClient = postgres(process.env.DATABASE_URL!, { ssl: 'require' })
export const db = drizzle(queryClient, { schema });
