"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom-ui/Delete"
import Link from "next/link"
export const columns: ColumnDef<collectionsType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({row})=> <Link href={`/collections/${row.original._id}`} className="hover:border-gray-400 hover:border-b-2 hover:text-red-600 transition-all">{row.original.title}</Link>
    },
    {
      accessorKey: "products",
      header: "Products",
      cell: ({row})=> <p>{row.original.products ?row.original.products : 0 }</p>

    },
    {
        id:'actions',
        cell: ({row})=><Delete id={row.original._id}></Delete>
    },
  ]