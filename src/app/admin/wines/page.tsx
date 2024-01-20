import { getWinesDAO } from "@/services/wine-services"
import { WineDialog } from "./wine-dialogs"
import { DataTable } from "./wine-table"
import { columns } from "./wine-columns"

export default async function UsersPage() {
  
  const data= await getWinesDAO()

  return (
    <div className="w-full">      

      <div className="flex justify-end mx-auto my-2">
        <WineDialog />
      </div>

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Wine"/>      
      </div>
    </div>
  )
}
  
