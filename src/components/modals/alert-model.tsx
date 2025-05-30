"use client";

import React, { useEffect, useState } from "react";
import Model from "../myComponents/Modal";
import { Button } from "../ui/button";

type AlertModelProps = {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
const AlertModel = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: AlertModelProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Model
      title="Are you sure"
      description="This action cant be done"
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Model>
  );
};

export default AlertModel;
