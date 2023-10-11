"use client";

import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { CellAction } from "./cell-action";

export type SizeColumn = {
  id: number;
  name: string;
  description: string;
};

const handleDelete = async (id: number) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/deleteSize",
      {
        data: {
          sizeId: id,
        },
      }
    );
    return response.data.size;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Unit",
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