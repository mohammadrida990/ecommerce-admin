import React from "react";
import { prisma } from "@/lib/prismadb";
import { OrderColumns } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import OrderClient from "./components/Client";

const OrdersPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  const orders = await prisma.order.findMany({
    where: {
      storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumns[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((sum, item) => sum + Number(item.product.price), 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex flex-col ">
      <div className="flex-1 space-y-4 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
