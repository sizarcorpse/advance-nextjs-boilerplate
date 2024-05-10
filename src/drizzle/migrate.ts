import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});

async function main() {
  await migrate(drizzle(client), {
    migrationsFolder: "./src/drizzle/migrations",
  });

  await client.end();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
