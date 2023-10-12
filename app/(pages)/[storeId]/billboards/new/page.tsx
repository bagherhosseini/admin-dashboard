"use client";

import { Heading } from "@/components/ui/heading";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import ImageUpload from "../../../../../components/uploadImg";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title name must be at least 2 characters.",
  }),
  img: z.string().min(1, {
    message: "Insert a valid picture.",
  }),
  storeId: z.string().min(2, {
    message: "storeId must be at least 2 characters.",
  }),
});

const CreatBillboard = ({ params }: { params: { storeId: string } }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      img: "",
      storeId: params.storeId,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/addBillboard", values);
      toast.success("You have successfully created a billboard");
      window.location.assign(`/${params.storeId}/billboards`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong - please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-9 py-6 flex flex-col gap-4 box-border">
      <Heading title={`Create Billboard`} description="Add a new billboard" />

      <hr />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-x-8 gap-y-4 grid-cols-3"
        >
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter billbord name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </section>
  );
};

export default CreatBillboard;
