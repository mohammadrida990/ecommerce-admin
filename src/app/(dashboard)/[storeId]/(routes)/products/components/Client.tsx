"use client";

import Heading from "@/components/myComponents/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { columns, ProductColumns } from "./columns";
import { DataTable } from "@/components/myComponents/data-table";
import ApiList from "@/components/myComponents/api-list";

type ProductClientProps = {
  data: ProductColumns[];
};
const ProductClient = ({ data }: ProductClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage product for your store"
        />

        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="h-4 w-4" />
          <span className="hidden md:block ml-2">Add new</span>
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Heading title="API" description="API calls for products" />

      <Separator />

      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

export default ProductClient;
