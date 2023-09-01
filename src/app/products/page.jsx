// import { conn } from "@/libs/mysql"
import axios from "axios";
import Buttons from "./[id]/buttons";

async function loadProducts() {
  const { data } = await axios.get("http://localhost:3000/api/products");
  return data;
  // const result=await conn.query('SELECT * FROM product')
  // console.log(result);
}

async function ProductPage() {
  const products = await loadProducts();
  console.log(products);
  return (
    <div className="bg-purple-600 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-900 p-6 rounded-lg shadow-md hover:cursor-pointer hover:scale-105 transform transition-transform duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto mb-4 rounded-lg w-32 h-32 object-cover"
            />
            <h2 className="text-lg font-semibold text-white mb-2">
              {product.name}
            </h2>
            <p className="text-gray-400 mb-2">
              {product.model} - {product.year}
            </p>
            <p className="text-gray-400 mb-4">
              {product.type} - {product.capacity}
            </p>
            <p className="text-gray-300">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-green-500 font-semibold">${product.price}</p>
              <Buttons productId={product.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
