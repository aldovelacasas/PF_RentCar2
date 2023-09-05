import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function POST(request) {
  try {
    const { username, passport, email, password, phone } = await request.json();

    const result = await conn.query("INSERT INTO user SET ?", {
      username,
      passport,
      email,
      password,
      phone,
    });

    return NextResponse.json({
      username,
      passport,
      email,
      password,
      phone,
      id: result.insertId,
      isActive: 1,
      typeUser: 1,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
