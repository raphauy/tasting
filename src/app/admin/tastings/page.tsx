import { getTastingsDAO } from "@/services/tasting-services"
import { TastingDialog } from "./tasting-dialogs"
import { DataTable } from "./tasting-table"
import { columns } from "./tasting-columns"

export default async function UsersPage() {
  
  const data= await getTastingsDAO()
  const vinatages = data.map((tasting) => tasting.vintage)
  const vintabesNumber= Array.from(new Set(vinatages))
  const diferentVintages: string[] = vintabesNumber.map((vintage) => vintage.toString())

  return (
    <div className="w-full">      

      <div className="container p-3 py-4 mx-auto border rounded-md text-muted-foreground dark:text-white">
        <DataTable columns={columns} data={data} subject="Tasting" columnsOff={["abv", "style"]} vintages={diferentVintages}/>
      </div>
    </div>
  )
}
  
