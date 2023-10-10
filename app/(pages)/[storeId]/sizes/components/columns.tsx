"use client"

import { ColumnDef } from "@tanstack/react-table"


export type SizeColumn = {
  id: number;
  name: string;
  description: string;
}
export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Sizes",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];