import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { configDotenv } from "dotenv";
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM product");
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
    const data = await request.formData();

    const file = data.get("file");
    if (!file) throw new Error("No se subio ninguna imagen");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const answer = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        })
        .end(buffer);
    });

    const image = answer.url;

    let {
      name,
      price,
      year,
      model,
      capacity,
      type,
      description,
      transmission,
      rating,
    } = JSON.parse(data.get("data"));

    if (rating == null || rating == undefined) {
      rating = 5;
    }

    const result = await conn.query("INSERT INTO product SET ?", {
      name,
      price,
      year,
      model,
      capacity,
      type,
      transmission,
      rating,
      image,
      description,
    });

    return NextResponse.json({
      name,
      price,
      year,
      model,
      capacity,
      type,
      transmission,
      rating,
      image,
      description,
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
