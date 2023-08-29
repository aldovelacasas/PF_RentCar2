import { NextResponse } from "next/server";
import {conn} from "@/libs/mysql";

export async function GET(){
    try {
        const results = await conn.query("SELECT * FROM product");
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

    export async function POST (request) {
  try {
    const {name, price, year, model, capacity, type, description, image, transmission,  }= await request.json();

    const result  = await conn.query("INSERT INTO product SET ?", {
        name,
        price,
        year,
        model,
        capacity,
        type,
        transmission,
        image,
        description

    })
    
    return NextResponse.json({
        name,
        price,
        year,
        model,
        capacity,
        type,
        transmission,
        image,
        description,
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