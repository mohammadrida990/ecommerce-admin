"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useModalStore } from "@/hooks/use-store-modal";
import Model from "../myComponents/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, "Store name is required"),
});

export const StoreModal = () => {
  const storeModal = useModalStore();
  const [loading, seLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      seLoading(true);
      const response = await axios.post("/api/stores", data);
      // toast.success("Store created successfully");
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error("Something went wrong while creating the store");
      console.error("[STORE_MODAL_ERROR]", error);
    } finally {
      seLoading(false);
      storeModal.onClose();
      form.reset();
    }
  };

  return (
    <Model
      title="Create Store"
      description="Create a new store to manage your products and orders."
      isOpen={storeModal.isOpen}
      onClose={() => storeModal.onClose()}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E-commerce"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  onClick={storeModal.onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Model>
  );
};
