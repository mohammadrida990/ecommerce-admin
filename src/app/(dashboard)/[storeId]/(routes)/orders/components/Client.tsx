"use client";

import Heading from "@/components/myComponents/Heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { columns, OrderColumns } from "./columns";
import { DataTable } from "@/components/myComponents/data-table";

type OrderClientProps = {
  data: OrderColumns[];
};
const OrderClient = ({ data }: OrderClientProps) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage order for your store"
      />

      <Separator />

      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

export default OrderClient;
