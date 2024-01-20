import { getProducersDAO } from "@/services/producer-services"
import { ProducerDialog } from "./producer-dialogs"
import { DataTable } from "./producer-table"
import { columns } from "./producer-columns"
import { TooltipProvider } from "@/components/ui/tooltip"

export default async function UsersPage() {
  
  const data= await getProducersDAO()

  return (
    <div className="w-full">      
      <TooltipProvider delayDuration={0}>

        <div className="flex justify-end mx-auto my-2">
          <ProducerDialog />
        </div>

        <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
          <DataTable columns={columns} data={data} subject="Producer"/>      
        </div>

      </TooltipProvider>
    </div>
  )
}
  
