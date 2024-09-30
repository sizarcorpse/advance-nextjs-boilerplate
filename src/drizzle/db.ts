import * as comment_s from "@/drizzle/schema/comment";
import * as like_s from "@/drizzle/schema/like";
import * as shout_s from "@/drizzle/schema/shout";
import { env } from "@/libs/env";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

declare global {
  var database: PostgresJsDatabase<typeof schema> | undefined;
}

const schema = {
  ...shout_s,
  ...like_s,
  ...comment_s,
};

let db: PostgresJsDatabase<typeof schema>;
let pg: ReturnType<typeof postgres>;

if (process.env.NODE_ENV === "production") {
  pg = postgres(env.DATABASE_URL as string);
  db = drizzle(pg, { schema, logger: false });
} else {
  if (!global.database) {
    pg = postgres(env.DATABASE_URL as string);
    global.database = drizzle(pg, { schema, logger: false });
  }
  db = global.database;
}

export { db, pg };
