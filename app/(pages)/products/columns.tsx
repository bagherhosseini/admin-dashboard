"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: string
  title: string
  price: number
  archived: boolean
  featured: boolean
  date: string
}

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "id",
    header: "ID",
  }, 
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "featured",
    header: "Featured",
  },
  {
    accessorKey: "archived",
    header: "Archived",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
]
