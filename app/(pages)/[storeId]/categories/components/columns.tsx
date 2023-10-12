"use client"
import axios from "axios";
import { CellAction } from "./cell-action";

import { ColumnDef } from "@tanstack/react-table"

export type CategoryColumn = {
  id: number;
  name: string;
  description: string,
}

const handleDelete = async (id: number) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/deleteCategory",
      {
        data: {
          billboardId: id,
        },
      }
    );
    return response.data.billboard;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
  
];