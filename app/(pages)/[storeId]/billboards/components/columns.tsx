"use client";

import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { CellAction } from "./cell-action";

export type BillboardColumn = {
  id: number;
  title: string;
  createdAt: string;
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
