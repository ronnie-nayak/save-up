import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const connectionString = process.env.DATABASE_URL!;

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: { connectionString },
  tablesFilter: ["t3turbo_*"],
} satisfies Config;
