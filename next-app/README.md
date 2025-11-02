This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🔎 Quick map for AI/dev assistants

A concise overview of the app to speed up troubleshooting and changes.

### Stack
- Next.js 16 (App Router), React 19, TypeScript 5
- Prisma 6.18 (PostgreSQL)

### Key structure
```
next-app/
	prisma/
		schema.prisma           # DB schema (datasource uses env("DATABASE_URL"))
	prisma.config.ts          # Prisma CLI config (schema path, migrations path)
	src/
		app/
			api/
				jobs/route.ts       # REST endpoints: GET list jobs, POST create job
			page.tsx, layout.tsx  # Demo UI
		lib/db.ts               # Prisma client singleton + env warnings
		generated/              # Prisma Client output target (ignored in Git)
	.env                      # Put DATABASE_URL here (not committed)
	.gitignore                # Ignores .env*, .next, node_modules, src/generated
	package.json              # Scripts incl. prisma:generate/migrate, postinstall
	tsconfig.json             # Path alias: "@/*" → repo root
```

### Environment and runtime
- Next.js loads `.env` from `next-app/.env` at server start. Keep `DATABASE_URL` here.
- `src/lib/db.ts` warns at startup if `DATABASE_URL` is missing and uses a dev-time singleton
	to avoid multiple Prisma connections during HMR.

### Prisma specifics
- Generator output is configured to `./src/generated` (see `npx prisma generate` output).
- Import Prisma Client from `@/src/generated/client` (not `@prisma/client`).
- Common commands:
	```bash
	npm run prisma:generate   # generate client into src/generated
	npm run prisma:migrate    # create/apply migrations to the database
	npm run prisma:studio     # open Prisma Studio
	npm run db:reset          # drop/recreate dev DB (destructive)
	```

### API surface
- `GET /api/jobs` → returns all jobs ordered by `createdAt` desc
- `POST /api/jobs` → body is JSON, creates a `Job { payload }`
- Both handlers have try/catch and log server-side errors to console.

### Common issues and fast fixes
- Error: "@prisma/client did not initialize yet"
	- Cause: importing `@prisma/client` while client is generated to `src/generated`.
	- Fix: import from `@/src/generated/client` and restart dev server.
- Error: "Environment variable not found: DATABASE_URL"
	- Fix: create `next-app/.env` with `DATABASE_URL=postgresql://...` and restart dev server.
- Error: "relation \"Job\" does not exist" (or Postgres 42P01)
	- Fix: `npm run prisma:migrate` to create tables from `schema.prisma`.
- Error: P1001 (can’t reach DB)
	- Fix: check host/port/credentials, ensure DB is running and accessible.

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
