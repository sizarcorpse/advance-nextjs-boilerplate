import type { Config } from "drizzle-kit";
import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   schema: "./src/drizzle/schema.ts",
//   out: "./src/drizzle/migrations",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL as string,
//   },
//   verbose: true,
//   strict: true,
// } satisfies Config);

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
} satisfies Config);
