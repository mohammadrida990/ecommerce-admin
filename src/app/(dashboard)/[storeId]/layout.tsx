import Navbar from "@/components/myComponents/Navbar";
import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
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
      <div className="flex items-center justify-center bg-sky-200 w-full space-x-4 h-10">
        <span className="text-sm md:text-lg text-gray-500">
          View Store in E-Commerce Client:
        </span>

        <Link
          href="https://ecommerce-store-rho-three.vercel.app/"
          target="_blink"
          className="underline text-green-700 hover:text-green-400 text-sm md:text-lg"
        >
          E-Commerce Client
        </Link>
      </div>
      <Navbar />
      <div>{children}</div>;
    </>
  );
};

export default DashboardLayout;
