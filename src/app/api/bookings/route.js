import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM bookings");
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
    const { userID, productID, fecha_inicio, fecha_fin, monto, statusB } =
      await request.json();

    const result = await conn.query("INSERT INTO bookings SET ?", {
      userID,
      productID,
      fecha_inicio,
      fecha_fin,
      monto,
      statusB,
    });

    return NextResponse.json({
      userID,
      productID,
      fecha_inicio,
      fecha_fin,
      monto,
      statusB,
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
