import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Products, columns } from "./columns"
import { DataTable } from "./data-table"


async function getData(): Promise<Products[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      title: "Gurka",
      price: 25,
      archived: false,
      featured: true,
      date: "2023-10-06",
    },
    // ...
  ]
}
 
export default async function DemoPage() {
  const data = await getData()
 
  return (
    <div className="container mx-auto py-10">
  <h2 className="text-4xl font-extrabold dark:text-white ">Products</h2>
  <div className="flex justify-end mb-2">
  <Link href="/products/new" legacyBehavior passHref>
  <Button className="w-32">
    Create new product</Button>
    </Link>
  </div>
  

      <DataTable columns={columns} data={data} />
    </div>
  )
}

