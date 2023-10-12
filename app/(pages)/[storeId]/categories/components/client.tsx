"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { columns, CategoryColumn } from "./columns";
import { useParams, useRouter } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";

interface CategoryClientProps {
  data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();
  return (
<>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <hr /> 
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};