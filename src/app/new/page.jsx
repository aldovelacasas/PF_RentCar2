"use client";
import ProductForm from "@/components/productform";
import { withAuth } from "@/withAuth";

function NewPage() {
  return (
    <div className="flex justify-center items-center h-full ">
      <ProductForm />
    </div>
  );
}

export default withAuth(NewPage);

//h-full clasname
