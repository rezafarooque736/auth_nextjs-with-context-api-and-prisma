import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPrismaInstance } from "@/utils/prismaClient";

export const POST = async (req) => {
  const { name, email, password } = await req.json();

  // Check for missing fields
  if (!name || !email || !password)
    return NextResponse.json(
      { msg: "Please fill all fields" },
      { status: 400 }
    );

  const prisma = getPrismaInstance();

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    console.log(user);

    return NextResponse.json({ msg: "New User Created" }, { status: 201 });
  } catch (error) {
    console.log("New User not created", error.message);
  }
};
