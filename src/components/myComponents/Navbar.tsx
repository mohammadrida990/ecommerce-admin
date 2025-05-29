import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "./Main-nav";
import StoreSwitcher from "./StoreSwitcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prismadb";
import { ToggleTheme } from "../ToggleTheme";

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b ">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />

        <MainNav className="mx-6" />

        <div className="ml-auto flex items-center space-x-4 px-4">
          <ToggleTheme />

          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
