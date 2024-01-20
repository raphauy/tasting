import { getTastingsDAO } from "@/services/tasting-services"
import { TastingDialog } from "./tasting-dialogs"
import { DataTable } from "./tasting-table"
import { columns } from "./tasting-columns"

export default async function UsersPage() {
  
  const data= await getTastingsDAO()

  return (
    <div className="w-full">      

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Tasting"/>      
      </div>
    </div>
  )
}
  
