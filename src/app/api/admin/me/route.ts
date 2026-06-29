import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/admin";

export async function GET() {
  const authenticated = await checkAuth();
  if (!authenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}
