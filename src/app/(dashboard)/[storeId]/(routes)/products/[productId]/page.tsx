import { prisma } from "@/lib/prismadb";
import React from "react";
import ProductForm from "./components/ProductForm";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string; storeId: string }>;
}) => {
  const { productId, storeId } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      storeId,
    },
  });

  const sizes = await prisma.size.findMany({
    where: {
      storeId,
    },
  });

  const colors = await prisma.color.findMany({
    where: {
      storeId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
