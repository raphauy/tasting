"use server"
  
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth"
import { WineDAO, WineFormValues, createWine, updateWine, getFullWineDAO, deleteWine } from "@/services/wine-services"

import { getComplentaryTastings, setTastings} from "@/services/wine-services"
import { TastingDAO } from "@/services/tasting-services"
    

export async function getWineDAOAction(id: string): Promise<WineDAO | null> {
    return getFullWineDAO(id)
}

export async function createOrUpdateWineAction(id: string | null, data: WineFormValues): Promise<WineDAO | null> {       
    let updated= null
    if (id) {
        updated= await updateWine(id, data)
    } else {
        // const currentUser= await getCurrentUser()
        // if (!currentUser) {
        //   throw new Error("User not found")
        // }
        // updated= await createWine(data, currentUser.id)

        updated= await createWine(data)
    }     

    revalidatePath("/admin/wines")

    return updated as WineDAO
}

export async function deleteWineAction(id: string): Promise<WineDAO | null> {    
    const deleted= await deleteWine(id)

    revalidatePath("/admin/wines")

    return deleted as WineDAO
}
    
export async function getComplentaryTastingsAction(id: string): Promise<TastingDAO[]> {
    const complementary= await getComplentaryTastings(id)

    return complementary as TastingDAO[]
}

export async function setTastingsAction(id: string, tastings: TastingDAO[]): Promise<boolean> {
    const res= setTastings(id, tastings)

    revalidatePath("/admin/wines")

    return res
}


