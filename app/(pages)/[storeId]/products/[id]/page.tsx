import prismadb from "@/lib/prismadb";

import { ProductForm } from "./form";

const ProductPage = async ({
  params
}: {
  params: { id: number, storeId: string }
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: parseInt(params.id.toString()),
    }
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          categories={categories} 
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
}

export default ProductPage;