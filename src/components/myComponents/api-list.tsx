"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import React from "react";
import ApiAlert from "./api-alert";

type ApiListProps = {
  entityName: string;
  entityIdName?: string;
};
const ApiList = ({ entityName }: ApiListProps) => {
  const origin = useOrigin();
  const params = useParams();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityName}}`}
      />

      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />

      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityName}}`}
      />

      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityName}}`}
      />
    </>
  );
};

export default ApiList;
