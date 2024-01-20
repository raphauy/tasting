"use client"

import { Button } from "@/components/ui/button"
import { ProducerDAO } from "@/services/producer-services"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { DeleteProducerDialog, ProducerDialog } from "./producer-dialogs"

import { WinesDialog } from "./producer-dialogs"
import { TooltipProvider } from "@/components/ui/tooltip"
  

export const columns: ColumnDef<ProducerDAO>[] = [
  
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

      const deleteDescription= `Do you want to delete Producer ${data.id}?`
 
      return (
        <TooltipProvider delayDuration={0}>
          <div className="flex items-center justify-end gap-2">

            <WinesDialog id={data.id} title={"Wines"} />
    
            <ProducerDialog id={data.id} />
            <DeleteProducerDialog description={deleteDescription} id={data.id} />
          </div>
        </TooltipProvider>
      )
    },
  },
]


