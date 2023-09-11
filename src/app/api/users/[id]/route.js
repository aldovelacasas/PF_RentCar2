import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM user WHERE id = ?", [
      params.id,
    ]);
    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "usuario no encontrado",
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
    const result = await conn.query("UPDATE user SET ? WHERE id = ?", [
      data,
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const info = await request.formData();
    let file = info.get("image");

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const answer = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (err, result) => {
            if (err) reject(err);
            resolve(result);
          })
          .end(buffer);
      });

      const image = answer.url;
      var result = await conn.query("UPDATE user SET ? WHERE id = ?", [
        { image: image },
        params.id,
      ]);
    } else {
      const jsondata = info.get("data");
      const data = JSON.parse(jsondata);

      var result = await conn.query("UPDATE user SET ? WHERE id = ?", [
        data,
        params.id,
      ]);
    }

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "producto no encontrado",
        },
        {
          status: 400,
        }
      );
    }
    const updateProduct = await conn.query("SELECT * FROM user WHERE id = ?", [
      params.id,
    ]);

    return NextResponse.json(updateProduct[0]);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
