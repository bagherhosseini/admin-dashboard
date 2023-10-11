"use client";

import { ColumnDef } from "@tanstack/react-table";

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
];
