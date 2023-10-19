"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";

import { columns, ProductColumn } from "./columns";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <hr /> 
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};