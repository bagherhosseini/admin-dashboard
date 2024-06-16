import { ProductColumn } from "./components/columns"
import { ProductClient } from "./components/client";
import axios from 'axios';
import { format } from "date-fns";

type Category = {
  id: number,
  name: string,
  description: string,
}

type Size = {
  id: number,
  name: string,
  description: string,
}

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const productsFetch = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/getProduct`);
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

  const categoryFetch = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/getCategory`);
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const sizeFetch = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${params.storeId}/getSize`);
      return response.data.sizes;
    } catch (error) {
      console.error("Error fetching sizes:", error);
      throw error;
    }
  };

  const categories = await categoryFetch();
  const sizes = await sizeFetch();

  const formattedCategories: Category[] = categories.map((item: Category) => ({
    id: item.id,
    name: item.name,
    description: item.description,
  }));

  const formattedSizes: Size[] = sizes.map((item: Size) => ({
    id: item.id,
    name: item.name,
    description: item.description,
  }));

  const productArrayWithCategoryAndSize = formattedProducts.map((item: ProductColumn) => {
    const category = formattedCategories.find((category: Category) => category.id === item.categoryId);
    const size = formattedSizes.find((size: Size) => size.id === item.sizeId);
    return {
      ...item,
      category: category?.name,
      size: size?.name,
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={productArrayWithCategoryAndSize}/>
      </div>
    </div>
  );

};

export default ProductsPage;