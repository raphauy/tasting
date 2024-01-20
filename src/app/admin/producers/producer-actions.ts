"use server"
  
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "@/lib/auth"
import { ProducerDAO, ProducerFormValues, createProducer, updateProducer, getFullProducerDAO, deleteProducer } from "@/services/producer-services"

import { getComplentaryWines, setWines} from "@/services/producer-services"
import { WineDAO } from "@/services/wine-services"
    

export async function getProducerDAOAction(id: string): Promise<ProducerDAO | null> {
    return getFullProducerDAO(id)
}

export async function createOrUpdateProducerAction(id: string | null, data: ProducerFormValues): Promise<ProducerDAO | null> {       
    let updated= null
    if (id) {
        updated= await updateProducer(id, data)
    } else {
        // const currentUser= await getCurrentUser()
        // if (!currentUser) {
        //   throw new Error("User not found")
        // }
        // updated= await createProducer(data, currentUser.id)

        updated= await createProducer(data)
    }     

    revalidatePath("/admin/producers")

    return updated as ProducerDAO
}

export async function deleteProducerAction(id: string): Promise<ProducerDAO | null> {    
    const deleted= await deleteProducer(id)

    revalidatePath("/admin/producers")

    return deleted as ProducerDAO
}
    
export async function getComplentaryWinesAction(id: string): Promise<WineDAO[]> {
    const complementary= await getComplentaryWines(id)

    return complementary as WineDAO[]
}

export async function setWinesAction(id: string, wines: WineDAO[]): Promise<boolean> {
    const res= setWines(id, wines)

    revalidatePath("/admin/producers")

    return res
}


