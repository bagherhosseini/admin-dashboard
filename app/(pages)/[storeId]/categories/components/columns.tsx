"use client"
import axios from "axios";
import { CellAction } from "./cell-action";

import { ColumnDef } from "@tanstack/react-table"

export type CategoryColumn = {
  id: number;
  name: string;
  description: string,
}

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