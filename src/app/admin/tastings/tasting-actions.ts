"use server"
  
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth"
import { TastingDAO, TastingFormValues, createTasting, updateTasting, getFullTastingDAO, deleteTasting, setWineId } from "@/services/tasting-services"
import { getFullProducerDAO } from "@/services/producer-services"
import { WineDAO, getWineDAO } from "@/services/wine-services"


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

export async function setWineIdAction(tastingId: string, wineId: string): Promise<TastingDAO | null> {    
    const updated= await setWineId(tastingId, wineId)

    revalidatePath("/admin/tastings")

    return updated as TastingDAO
}

export async function deleteTastingAction(id: string): Promise<TastingDAO | null> {    
    const deleted= await deleteTasting(id)

    revalidatePath("/admin/tastings")

    return deleted as TastingDAO
}

export async function getProducerWinesAction(wineId: string): Promise<WineDAO[]> {
    const wine= await getWineDAO(wineId)
    if (!wine) {
        throw new Error("Wine not found")
    }
    const producer= await getFullProducerDAO(wine.producerId)
    if (!producer) {
        throw new Error("Producer not found")
    }
    return producer.wines
}