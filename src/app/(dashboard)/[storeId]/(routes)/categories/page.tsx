import React from "react";
import BillboardClient from "./components/Client";
import { prisma } from "@/lib/prismadb";
import { CategoryColumns } from "./components/columns";
import { format } from "date-fns";

const CategoriesPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  const categories = await prisma.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumns[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 pt-6">
        <BillboardClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
