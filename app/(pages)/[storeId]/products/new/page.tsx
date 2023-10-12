"use client";

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import ImageUpload from "../../../../../components/uploadImg";

import { Heading } from "@/components/ui/heading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  img: z.string().min(1, {
    message: "Price must be at least 1.",
  }).optional(),
  title: z.string().min(1, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description name must be at least 2 characters.",
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be at least 1.",
  }),
  categoryId: z.coerce.number().min(1, {
    message: "Category name must be at least 1 characters.",
  }),
  sizeId: z.coerce.number().min(1, {
    message: "Size must be at least 2 characters.",
  }),
  featured: z.boolean().default(false).optional(),
  archived: z.boolean().default(false).optional(),
  storeId: z.string().min(2, {
    message: "storeId must be at least 2 characters.",
  }),
});

type Category = {
  id: number,
  name: string,
  description: string,
}

type Size = {
  id: number,
  name: string,
  description: string,
}


const CreatProduct = ({
  params
}: {
  params: { storeId: string }
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      img: "",
      title: "",
      description: "",
      price: 0,
      categoryId: 0,
      sizeId: 0,
      featured: false,
      archived: false,
      storeId: params.storeId
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post(`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/addProduct`, values);
      window.location.assign(`/${params.storeId}/products`);
      toast.success('You have added product')
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const categoryFetch = async () => {
    try {
      const response = await axios.get(`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getCategory`);
      setCategories(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const sizeFetch = async () => {
    try {
      const response = await axios.get(`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getSize`);
      setSizes(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  sizeFetch();
  categoryFetch();

  return (
    <section className="px-9 py-6 flex flex-col gap-4 box-border">
      <Heading title={`Create product`} description="Add a new product" />

      <hr />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-x-8 gap-y-4 grid-cols-3">
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
                    onRemove={() => field.onChange('')}
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
                  <Input placeholder="Enter product name" {...field} />
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
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: Category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                      )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size: Size) => (
                        <SelectItem key={size.id} value={size.id.toString()}>{size.name}</SelectItem>
                      )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className=" flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Featured
                  </FormLabel>
                  <FormDescription>
                    This product will be featured on the home page.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="archived"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Archived
                  </FormLabel>
                  <FormDescription>
                    This product will not appear anywhere in the store.
                  </FormDescription>
                </div>
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

export default CreatProduct