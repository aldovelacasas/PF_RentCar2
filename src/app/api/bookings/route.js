import { NextResponse } from "next/server";
import {conn} from "@/libs/mysql";

export async function POST (request) {
    try {
      const {userID, productID, fecha_inicio, fecha_fin,  }= await request.json();
      const statusB=1

      const result  = await conn.query("INSERT INTO bookings SET ?", {
          userID,
          productID,
          fecha_inicio,
          fecha_fin,
          statusB  
      })
      
      return NextResponse.json({
          userID,
          productID,
          fecha_inicio,
          fecha_fin,
          statusB,
          id: result.insertId,
  
      })
      
    } catch (error) {
      console.log(error);
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