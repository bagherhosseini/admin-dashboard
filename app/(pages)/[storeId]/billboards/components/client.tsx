"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

import { columns, BillboardColumn } from "./columns";

interface BillboardClientProps {
  data: Array<BillboardColumn>;
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <hr />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
