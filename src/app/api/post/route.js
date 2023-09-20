import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
  try {
    const results = await conn.query(`SELECT
    posts.id AS id_post,
    user.image AS image,
    user.username AS name,
    product.name AS nombre_producto,
    product.model AS modelo_producto,
    posts.description AS description,
    posts.rating AS rating
FROM
    posts
JOIN
    user
ON
    posts.userID = user.id
JOIN
    product
ON
    posts.productID = product.id;
`);

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

// Lo que se encuentra comentado debajo en ruta POST es en caso de querer agregar varios elementos juntos ej body:
// [ {
//   "userID": "14",
//   "productID": "9",
//   "description" : "En general, mi experiencia fue satisfactoria. La atención al cliente fue buena y el proceso de alquiler fue sencillo. Sin embargo, creo que podrían mejorar en la limpieza de los vehículos antes de entregarlos a los clientes.",
//   "rating": "4"},

//   {"userID": "16",
//   "productID": "10",
//   "description" : "Nunca habíamos rentado un auto antes, pero luego de haber puesto nuestro voto de confianza en esta página es una experiencia que quiero repetir cada que tenga vacaciones",
//   "rating": "5"},
// ]

export async function POST(request) {
  try {
    // const array = await request.json();

    // for (let obj in array) {
    //   const userID = array[obj].userID;
    //   const productID = array[obj].productID;
    //   const description = array[obj].description;
    //   const rating = array[obj].rating;

    //   const result = await conn.query("INSERT INTO posts SET ?", {
    //     userID,
    //     productID,
    //     description,
    //     rating,
    //   });
    // }

    // return NextResponse.json("ELEMENTOS DEL ARRAY AGREGADOS");

    const { userID, productID, description, rating } = await request.json();

    const result = await conn.query("INSERT INTO posts SET ?", {
      userID,
      productID,
      description,
      rating,
    });

    let avgRating = await conn.query(
      `(SELECT AVG(rating) AS rating FROM posts WHERE productID = ?)`,
      productID
    );

    let realRating = avgRating[0].rating;
    if (realRating === null) {
      realRating = rating;
    }

    await conn.query(
      `UPDATE product SET rating = ${realRating} WHERE id = ${productID}`
    );

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
