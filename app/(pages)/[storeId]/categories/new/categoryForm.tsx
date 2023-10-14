"use client";

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation"
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";

import { Heading } from "@/components/ui/heading";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type } from "os";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Category name must be at least 2 characters.",
    }),
    description: z.string().min(1, {
        message: "Description name must be at least 2 characters.",
    }),
    billboardId: z.coerce.number().min(1, {
        message: "Billboard name must be at least 1 characters.",
    }),
});

type Billboard = {
    id: number,
    title: string,
}


interface CategoryFormProps {
    billboards: Billboard[];
};

export const CreateCategory: React.FC<CategoryFormProps> = ({
    billboards,
}) => {
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            billboardId: 0,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post(`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/addCategory`, values);
            console.log(values.billboardId);
            window.location.assign(`/${params.storeId}/categories`);
            toast.success('You have added a category')
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="px-9 py-6 flex flex-col gap-4 box-border">
            <Heading title={`Create category`} description="Add a new category" />

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
                                    <Input placeholder="Enter category name" {...field} />
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
                        name="billboardId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Billboard</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a billboard" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard: Billboard) => (
                                                <SelectItem key={billboard.id} value={billboard.id.toString()}>{billboard.title}</SelectItem>
                                            )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                        <Button disabled={loading} type="submit">Create</Button>
                    </div>
                </form>
            </Form>
            <Toaster />
        </section>
    )
}