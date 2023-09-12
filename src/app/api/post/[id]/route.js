import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM posts WHERE id = ?", [
      params.id,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Post not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const result = conn.query(
      `DELETE FROM posts
    WHERE id=?
    `,
      [params.id]
    );
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
