import { prisma } from "@/lib/prismadb";
import React from "react";
import CategoryForm from "./components/CategoryForm";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string; storeId: string }>;
}) => {
  const { categoryId, storeId } = await params;

  const billboards = await prisma.billboard.findMany({
    where: {
      storeId,
    },
  });

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;
