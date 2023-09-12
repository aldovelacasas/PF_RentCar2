"use client";

import { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Rubik, Poppins } from "next/font/google";
import axios from "axios";
import CarCard from "@/components/CarCardDetail";

const apiUrl = process.env.API_URL;

async function loadProduct(id) {
  const { data } = await axios.get(`${apiUrl}/api/products/${id}`, id);
  console.log(data);
  return await data;
}

function page({ productId }) {
  const [productID, setProductID] = useState({});

  useEffect(() => {
    const url = window.location.href;
    console.log(url);
    const partes = url.split("/");
    const stringId = partes[partes.length - 1];
    const id = Number(stringId);

    loadProduct(+id).then((data) => setProductID(data));
  }, []);

  return (
    <>
      <div class="flex justify-center">
        <CarCard key={productID.id} product={productID} />
      </div>
    </>
  );
}

export default page;
