"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

import { columns, BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";

interface BillboardClientProps {
  data: Array<BillboardColumn>;
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <hr />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
