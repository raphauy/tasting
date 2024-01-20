"use server"
  
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth"
import { TastingDAO, TastingFormValues, createTasting, updateTasting, getFullTastingDAO, deleteTasting } from "@/services/tasting-services"


export async function getTastingDAOAction(id: string): Promise<TastingDAO | null> {
    return getFullTastingDAO(id)
}

export async function createOrUpdateTastingAction(id: string | null, data: TastingFormValues): Promise<TastingDAO | null> {       
    let updated= null
    if (id) {
        updated= await updateTasting(id, data)
    } else {
        // const currentUser= await getCurrentUser()
        // if (!currentUser) {
        //   throw new Error("User not found")
        // }
        // updated= await createTasting(data, currentUser.id)

        updated= await createTasting(data)
    }     

    revalidatePath("/admin/tastings")

    return updated as TastingDAO
}

export async function deleteTastingAction(id: string): Promise<TastingDAO | null> {    
    const deleted= await deleteTasting(id)

    revalidatePath("/admin/tastings")

    return deleted as TastingDAO
}

