import { ProductColumn } from "./components/columns"
import { ProductClient } from "./components/client";
import axios from 'axios';
import { format } from "date-fns";

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const productsFetch = async () => {
    try {
      const response = await axios.get(`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getProduct`);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };

  const products = await productsFetch();

  const formattedProducts: ProductColumn[] = products.map((item: ProductColumn) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    description: item.description,
    img: item.img,
    createdAt: format(new Date(item.createdAt), 'do MMMM, yyyy'),
    categoryId: item.categoryId,
    archived: item.archived,
    featured: item.featured,
    sizeId: item.sizeId,
    storeId: item.storeId
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );

};

export default ProductsPage;