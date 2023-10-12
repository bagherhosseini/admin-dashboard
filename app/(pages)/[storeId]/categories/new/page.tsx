"use client";

import { Heading } from "@/components/ui/heading";

import { cn } from "@/lib/utils"
import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

const CreateCategory = ({
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
      const response = await axios.post('/api/addCategory', values);
      toast.success('You have added a new category');
      window.location.assign(`/${params.storeId}/categories`);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-9 py-6 flex flex-col gap-4 box-border">
      <Heading title={`Create category`} description="Add a new category"/>

      <hr />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-x-8 gap-y-4 grid-cols-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} />
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
                  <Input placeholder="Category description" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
          <div className="pt-6 space-x-2 flex">
            <Button disabled={loading} type="submit">Create</Button>
          </div>
        </form>
      </Form>
      <Toaster />
    </section>
  )
}

export default CreateCategory