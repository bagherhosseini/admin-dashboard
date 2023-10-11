"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

import { columns, SizeColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";

interface SizeClientProps {
  data: Array<SizeColumn>;
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <hr />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};