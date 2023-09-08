import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";


    /*

      SELECT posts.id AS id_post, user.username AS nombre_usuario, posts.decription AS mensaje, posts.rating AS rating
      FROM posts
      JOIN user ON posts.userID = user.id

    */


export async function GET() {
  try {
    const results = await conn.query("SELECT posts.id AS id_post, user.username AS nombre_usuario, posts.decription AS mensaje, posts.rating AS rating FROM posts JOIN user ON posts.userID = user.id");
    return NextResponse.json(results);
  } catch (error) {
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

export async function POST(request) {
  try {
    const { userID, productID, description, rating } = await request.json();

    const result = await conn.query("INSERT INTO posts SET ?", {
      userID,
      productID,
      description,
      rating,
    });

    return NextResponse.json({
      userID,
      productID,
      description,
      rating,
      id: result.insertId,
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
