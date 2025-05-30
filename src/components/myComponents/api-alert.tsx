"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Copy, Server } from "lucide-react";
import { Badge, badgeVariants } from "../ui/badge";
import { type VariantProps } from "class-variance-authority";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

type ApiAlertProps = {
  title: string;
  description: string;
  variant: "public" | "admin";
  children?: React.ReactNode;
};
type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeVariant> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert = ({
  title,
  description,
  variant = "public",
}: ApiAlertProps) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API route copied to clipboard");
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />

      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>

      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="flex  wrap-anywhere bg-muted px-1 py-1 font-mono text-sm font-semibold rounded">
          {description}
        </code>

        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
export default ApiAlert;
