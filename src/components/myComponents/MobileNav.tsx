"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";

const MobileNav = ({
  className,
  ...props
}: {
  className?: string;
  props?: React.HTMLAttributes<HTMLElement>;
}) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger className="border border-gray-400 p-1 rounded-lg">
        <MenuIcon size={20} />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle />
        </SheetHeader>

        <SheetDescription className="h-full my-auto">
          <nav
            className={cn(
              "flex flex-col items-center space-y-5 justify-center h-full my-auto",
              className
            )}
            {...props}
          >
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "font-medium underline transition-colors text-sm hover:text-primary",
                  route.active
                    ? "text-black darg:text-white"
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
