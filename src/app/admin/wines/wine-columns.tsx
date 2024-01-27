"use client"

import { Button } from "@/components/ui/button"
import { WineDAO } from "@/services/wine-services"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { DeleteWineDialog, WineDialog } from "./wine-dialogs"

import { TastingsDialog } from "./wine-dialogs"
import { TooltipProvider } from "@/components/ui/tooltip"
  

export const columns: ColumnDef<WineDAO>[] = [
  
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Name
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
  },

  {
    accessorKey: "region",
    header: ({ column }) => {
        return (
          <Button variant="ghost" className="pl-0 dark:text-white"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Region
            <ArrowUpDown className="w-4 h-4 ml-1" />
          </Button>
    )},
  },
  // {
  //   accessorKey: "role",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" className="pl-0 dark:text-white"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         Rol
  //         <ArrowUpDown className="w-4 h-4 ml-1" />
  //       </Button>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const data= row.original

      const deleteDescription= `Do you want to delete Wine ${data.id}?`
 
      return (
        <TooltipProvider delayDuration={0}>
          <div className="flex items-center justify-end gap-2">

            <WineDialog id={data.id} producerId={data.producerId} />
            <DeleteWineDialog description={deleteDescription} id={data.id} />
          </div>
        </TooltipProvider>
      )
    },
  },
]


