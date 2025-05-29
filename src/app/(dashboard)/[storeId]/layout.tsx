import Navbar from "@/components/myComponents/Navbar";
import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const { storeId } = await params;

  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div>{children}</div>;
    </>
  );
};

export default DashboardLayout;
