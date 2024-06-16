"use client";

import { Heading } from "@/components/ui/heading";

import { cn } from "@/lib/utils"
import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

import toast, { Toaster } from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Unit name must be at least 1 characters.",
  }),
  description: z.string().min(2, {
    message: "Description name must be at least 2 characters.",
  }),
  storeId: z.string().min(2, {
    message: "storeId must be at least 2 characters.",
  }),
});

const CreateSize = ({
  params
}: {
  params: { storeId: string }
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      storeId: params.storeId
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/addSize`, values);
      toast.success('You have added a size');
      window.location.assign(`/${params.storeId}/sizes`);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-9 py-6 flex flex-col gap-4 box-border">
      <Heading title={`Create size`} description="Add a new size"/>

      <hr />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-x-8 gap-y-4 grid-cols-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl>
                  <Input placeholder="Enter abbreviation for unit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description of unit" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} type="submit">Continue</Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </section>
  )
}

export default CreateSize