import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return NextResponse.json({ msg: "Unauthorized" }, { status: 500 });
  }

  const { value } = token;
  try {
    const payload = verify(value, process.env.JWT_SECRET);
    return NextResponse.json({ msg: "Authorized User", payload: payload }, { status: 200 });
  } catch (err) {
    throw new Error(err);
  }
}