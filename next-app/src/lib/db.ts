// IMPORTANT: Prisma Client is generated to `src/generated` in this project
// (see `npx prisma generate` output). Therefore, import from that path
// instead of the default `@prisma/client`.
import { PrismaClient } from "@/src/generated/client";

// Warn early if DATABASE_URL isn't set (common cause of 500s in API routes)
if (!process.env.DATABASE_URL) {
	// eslint-disable-next-line no-console
	console.warn("[prisma] DATABASE_URL is not set. Prisma will fail to connect.");
}

declare global {
	// eslint-disable-next-line no-var
	var __prisma__: PrismaClient | undefined;
}

export const db = global.__prisma__ ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
	global.__prisma__ = db; // prevent creating multiple clients during HMR in dev
}