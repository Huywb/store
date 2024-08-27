"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import Delete from "../custom-ui/Delete"
import Link from "next/link"
export const ProductsColumn: ColumnDef<productsType>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({row})=> <Link href={`/products/${row.original._id}`} className="hover:border-gray-400 hover:border-b-2 hover:text-red-600 transition-all">{row.original.title}</Link>
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({row})=> <p>{row.original.category}</p>
      },
    {
      accessorKey: "collections",
      header: "Collections",
      cell: ({row})=> <p>{row.original.collections.map((collection)=>collection.title).join(",")}</p>

    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "expense",
        header: "Cost",
    },
    {
        id:'actions',
        cell: ({row})=><Delete item='products' id={row.original._id}></Delete>
    },
  ]