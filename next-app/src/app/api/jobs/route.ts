import { db } from "@/src/lib/db";

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => ({}));
    const job = await db.job.create({ data: { payload } });
    return Response.json(job, { status: 201 });
  } catch (error) {
    console.error("POST /api/jobs failed:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { error: "Internal Server Error", message },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const jobs = await db.job.findMany({ orderBy: { createdAt: "desc" } });
    return Response.json(jobs);
  } catch (error) {
    console.error("GET /api/jobs failed:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { error: "Internal Server Error", message },
      { status: 500 },
    );
  }
}
