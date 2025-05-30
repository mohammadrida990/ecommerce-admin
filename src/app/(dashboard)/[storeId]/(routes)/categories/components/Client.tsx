"use client";

import Heading from "@/components/myComponents/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { CategoryColumns, columns } from "./columns";
import { DataTable } from "@/components/myComponents/data-table";
import ApiList from "@/components/myComponents/api-list";

type CategoryClientProps = {
  data: CategoryColumns[];
};
const CategoryClient = ({ data }: CategoryClientProps) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage Categories for your store"
        />

        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden md:block ml-2">Add new</span>
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Heading title="API" description="API calls for categories" />

      <Separator />

      <ApiList entityName="categories" entityIdName="categoriesId" />
    </>
  );
};

export default CategoryClient;
