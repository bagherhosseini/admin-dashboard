"use client";

import axios from "axios";
import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SizeColumn } from "./columns";

interface CellActionProps {
  data: SizeColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/deleteSize`, {
        data: {
          sizeId: data.id,
        },
      });
      toast.success("Size deleted.");
      router.refresh();
    } catch (error) {
      toast.error(
        "Make sure you removed all products using this size first."
      );
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };



  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/sizes/${data.id}`)
            }
          >Update</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete()}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster />
    </>
  );
};
