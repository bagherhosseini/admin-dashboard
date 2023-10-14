import React from 'react'
import axios from "axios";
import {CreateCategory} from './categoryForm'

type Billboard = {
  id: number,
  title: string,
}

const page = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const billboardsFetch = async () => {
    try {
      const response = await axios.get(`https://admin-dashboard-kappa-one.vercel.app/api/${params.storeId}/getBillboard`);
      return response.data.billboard;
    } catch (error) {
      console.error("Error fetching billboards:", error);
      throw error;
    }
  };


  const billboards = await billboardsFetch();

  const formattedBillboards: Billboard[] = billboards.map((item: Billboard) => ({
    id: item.id,
    title: item.title,
  }));

  return (
    <CreateCategory billboards={formattedBillboards} />
  )
}

export default page