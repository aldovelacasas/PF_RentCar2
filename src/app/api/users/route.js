import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(){
  try {
      const results = await conn.query("SELECT * FROM user");
      return NextResponse.json(results)
      
  } catch (error) {
      return NextResponse.json(
      {
        message: error.message,
      },
      {
          status:500,
      }

      );
  }
}


export async function POST(request) {
  try {
    const { uid, emailUser } = await request.json();

    const result = await conn.query("INSERT INTO user SET ?", {
      uid,
      emailUser,
    });

    return NextResponse.json({
      uid: " ",
      id: result.insertId,
      emailUser: "",
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
