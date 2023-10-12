"use client";

import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { CellAction } from "./cell-action";

export type SizeColumn = {
  id: number;
  name: string;
  description: string;
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