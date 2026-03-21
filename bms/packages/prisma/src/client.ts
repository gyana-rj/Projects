import { config as loadEnv } from "dotenv";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Monorepo apps (e.g. ws-server) don't load packages/prisma/.env by default.
// Resolve this package's .env from dist/ or src/ so DATABASE_URL is always set in dev.
const __packageDir = dirname(fileURLToPath(import.meta.url));
loadEnv({ path: join(__packageDir, "..", ".env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "@repo/db: DATABASE_URL is missing. Add it to packages/prisma/.env or your process environment."
  );
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;