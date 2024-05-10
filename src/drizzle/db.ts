import * as schema from "@/drizzle/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/libs/env";

const client = postgres(env.DATABASE_URL as string);

export const db = drizzle(client, {
  schema: schema,
  logger: true,
});
