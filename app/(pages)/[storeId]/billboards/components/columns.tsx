"use client";

import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { CellAction } from "./cell-action";

export type BillboardColumn = {
  id: number;
  title: string;
  createdAt: string;
};

const handleDelete = async (id: number) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/deleteBillboard",
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

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "title",
    header: "Label",
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
