/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Rubik, Poppins } from "next/font/google";
import axios from "axios";
import CarCard from "@/components/CarCardDetail";

async function loadProduct(id) {
  const { data } = await axios.get(
    `${process.env.API_BASE_URL}/api/products/${id}`,
    id
  );
  return await data;
}

function Page({ productId }) {
  const [productID, setProductID] = useState({});

  useEffect(() => {
    const url = window.location.href;
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

export default Page;
