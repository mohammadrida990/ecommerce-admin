"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { uploadFile } from "./upload";

type ImageUpload = {
  disabled: boolean;
  value: string[];
  onChange: (v: string) => void;
  onRemove: (v: string) => void;
};
const ImageUpload = ({ disabled, value, onChange, onRemove }: ImageUpload) => {
  const [isMounted, setIsMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setIsMounted(true);
    console.log(value);
  }, [value]);

  if (!isMounted) {
    return null;
  }

  const handleUpload = async () => {
    if (!file) return;
    const thumbnail = await uploadFile(file);
    onChange(thumbnail);
    setFile(null);
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>

            <Image
              src={url}
              alt=""
              priority
              fill
              sizes=""
              className="relative object-cover"
            />
          </div>
        ))}
      </div>

      <Input
        id="picture"
        type="file"
        multiple
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <Button onClick={handleUpload} disabled={!file || disabled}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
