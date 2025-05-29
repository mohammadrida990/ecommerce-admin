import { prisma } from "@/lib/prismadb";
import React from "react";
import BillboardForm from "./components/BillboardForm";

const BillboardPage = async ({
  params,
}: {
  params: Promise<{ billboardId: string }>;
}) => {
  const { billboardId } = await params;

  const billboard = await prisma.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
