"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ProductColumn = {
  id: number,
  title: string,
  price: number,
  description: string,
  img: string,
  createdAt: string,
  categoryId: number,
  archived: boolean,
  featured: boolean,
  sizeId: number,
  storeId: number
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "title",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "categoryId",
    header: "Category",
  },
  {
    accessorKey: "sizeId",
    header: "Size",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "archived",
    header: "Is archived",
  },
  {
    accessorKey: "featured",
    header: "Is featured",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
];