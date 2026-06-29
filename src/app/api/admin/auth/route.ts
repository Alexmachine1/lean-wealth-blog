import { NextResponse } from "next/server";
import { createToken } from "@/lib/admin";

export async function POST(request: Request) {
  const { password } = await request.json();
  const token = createToken(password);

  if (!token) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
