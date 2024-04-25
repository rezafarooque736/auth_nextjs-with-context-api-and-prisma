import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import bcrypt from "bcryptjs";
import { getPrismaInstance } from "@/utils/prismaClient";

export const POST = async (req) => {
  const { email, password } = await req.json();

  // Check for missing fields
  if (!email || !password) {
    return NextResponse.json(
      { msg: "Please fill all fields" },
      { status: 400 }
    );
  }

  const prisma = getPrismaInstance();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ msg: "User not found" }, { status: 404 });
  } else {
    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      const token = sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const cookie = serialize("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60, //7 day in seconds
        path: "/",
        sameSite: "lax",
      });

      return NextResponse.json(user, {
        status: 200,
        headers: { "Set-Cookie": cookie },
      });
    } else {
      return NextResponse.json({ msg: "Invalid Credentials" }, { status: 401 });
    }
  }
};
