"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom-ui/Delete"
export const columns: ColumnDef<collectionsType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({row})=> <p>{row.original.title}</p>
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({row})=> <p>{row.original.products ?row.original.products : 0 }</p>

    },
    {
        id:'actions',
        cell: ({row})=><Delete></Delete>
    },
  ]