import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET(request) {
  try {
    const { postId } = request.query;

    const result = await conn.query("SELECT * FROM posts WHERE id = ?", [
      postId,
    ]);

    if (result.length === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const post = result[0];

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


