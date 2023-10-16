import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./form";
import { parse } from "path";

const CategoryPage = async ({
  params
}: {
  params: { id: number }
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: parseInt(params.id.toString())
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} />
      </div>
    </div>
  );
}

export default CategoryPage;