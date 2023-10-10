"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { columns, SizeColumn } from "./columns";

interface SizeClientProps {
  data: SizeColumn[];
}

export const SizeClient: React.FC<SizeClientProps> = ({
  data
}) => {
  return (
    <>
      <Heading title={`Sizes (${data.length})`} description="Manage sizes for your products" />
      <div className="flex justify-end mb-2">
  <Link href="/sizes/new" legacyBehavior passHref>
  <Button className="w-32">
    Create new size</Button>
    </Link>
  </div>
      <hr /> 
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};