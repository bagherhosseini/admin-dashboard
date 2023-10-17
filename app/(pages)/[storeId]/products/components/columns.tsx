"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

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
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
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
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];