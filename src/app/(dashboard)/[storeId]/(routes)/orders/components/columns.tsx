"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumns = {
  id: string;
  phone: string;
  address: string;
  totalPrice: string;
  products: string;
  createdAt: string;
  isPaid: boolean;
};

export const columns: ColumnDef<OrderColumns>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "TotalPrice",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
