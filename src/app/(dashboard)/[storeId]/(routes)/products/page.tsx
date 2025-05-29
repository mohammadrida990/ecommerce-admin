import React from "react";
import { prisma } from "@/lib/prismadb";
import { ProductColumns } from "./components/columns";
import { format } from "date-fns";
import ProductClient from "./components/Client";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  const products = await prisma.product.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
  });

  const formattedProducts: ProductColumns[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
