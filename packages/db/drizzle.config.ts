import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const connectionString = process.env.DATABASE_URL!;

export default {
  schema: "./src/schema",
  dialect: "postgresql",

  dbCredentials: { url: connectionString },
  tablesFilter: ["saveup_*"],
} satisfies Config;
