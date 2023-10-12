import React from 'react'
import axios from "axios";
import {CreatProduct} from './productForm'

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

const page = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const categoryFetch = async () => {
    try {
      const response = await axios.get(`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getCategory`);
      return response.data.categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const sizeFetch = async () => {
    try {
      const response = await axios.get(`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getSize`);
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

  return (
    <CreatProduct categories={formattedCategories} sizes={formattedSizes} />
  )
}

export default page