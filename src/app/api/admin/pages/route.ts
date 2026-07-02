import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkAuth } from "@/lib/admin";

export async function GET() {
  const authenticated = await checkAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await db.execute(
    "SELECT slug, title FROM pages ORDER BY slug"
  );

  return NextResponse.json({
    pages: result.rows.map((row: any) => ({
      slug: row.slug,
      title: row.title,
    })),
  });
}
