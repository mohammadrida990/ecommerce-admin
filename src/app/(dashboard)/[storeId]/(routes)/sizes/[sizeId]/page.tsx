import { prisma } from "@/lib/prismadb";
import React from "react";
import SizeForm from "./components/SizeForm";

const SizePage = async ({
  params,
}: {
  params: Promise<{ sizeId: string }>;
}) => {
  const { sizeId } = await params;

  const size = await prisma.size.findUnique({
    where: {
      id: sizeId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
