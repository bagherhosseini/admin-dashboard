"use client";

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2),
});

type StoreDialogProps = {
  isOpen: boolean; // Change this prop name to 'isOpen'
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const StoreDialog: React.FC<StoreDialogProps> = ({ isOpen, setIsOpen }) => {
  // Your component code here
  const [loading, setLoading] = useState<boolean>(false);
  const [onOpenChange, setOnOpenChange] = useState<boolean>(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/createStore', values);
      window.location.assign(`/${response.data.store.id}`);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setOnOpenChange(false);
    } else {
      setOnOpenChange(true);
    }
  }, [isOpen, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={() => { setIsOpen(onOpenChange) }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create store</DialogTitle>
          <DialogDescription>Add a new store</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="E-Commerce" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button type="button" disabled={loading} variant="outline" onClick={() => { setIsOpen(false) }}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StoreDialog;