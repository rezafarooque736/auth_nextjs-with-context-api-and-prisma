import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET() {
  const cookie = serialize("token", "", {
    httpOnly: true,
    maxAge: -1,
    path: "/",
  })
  return NextResponse.json({ msg: "Logout Successfully" }, { status: 201, headers: { "Set-Cookie": cookie } });
}