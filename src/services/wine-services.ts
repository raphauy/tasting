import * as z from "zod"
import { prisma } from "@/lib/db"
import { ProducerDAO } from "./producer-services"
import { TastingDAO } from "./tasting-services"
import { getTastingsDAO } from "./tasting-services"

export type WineDAO = {
	id: string
	name: string
	region: string
	country: string
	producerId: string
	producer: ProducerDAO
	createdAt: Date
	updatedAt: Date
	tastings: TastingDAO[]
}

export const wineSchema = z.object({
	name: z.string({required_error: "name is required."}),
	region: z.string({required_error: "region is required."}),
	producerId: z.string({required_error: "producerId is required."}),
})

export type WineFormValues = z.infer<typeof wineSchema>


export async function getWinesDAO() {
  const found = await prisma.wine.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as WineDAO[]
}

export async function getWineDAO(id: string) {
  const found = await prisma.wine.findUnique({
    where: {
      id
    },
  })
  return found as WineDAO
}
    
export async function createWine(data: WineFormValues) {
  // TODO: implement createWine
  const created = await prisma.wine.create({
    data
  })
  return created
}

export async function updateWine(id: string, data: WineFormValues) {
  const updated = await prisma.wine.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteWine(id: string) {
  const deleted = await prisma.wine.delete({
    where: {
      id
    },
  })
  return deleted
}
    
export async function getComplentaryTastings(id: string) {
  const found = await prisma.wine.findUnique({
    where: {
      id
    },
    include: {
      tastings: true,
    }
  })
  const all= await getTastingsDAO()
  const res= all.filter(aux => {
    return !found?.tastings.find(c => c.id === aux.id)
  })
  
  return res
}

export async function setTastings(id: string, tastings: TastingDAO[]) {
  const oldTastings= await prisma.wine.findUnique({
    where: {
      id
    },
    include: {
      tastings: true,
    }
  })
  .then(res => res?.tastings)

  await prisma.wine.update({
    where: {
      id
    },
    data: {
      tastings: {
        disconnect: oldTastings
      }
    }
  })

  const updated= await prisma.wine.update({
    where: {
      id
    },
    data: {
      tastings: {
        connect: tastings.map(c => ({id: c.id}))
      }
    }
  })

  if (!updated) {
    return false
  }

  return true
}



export async function getFullWinesDAO() {
  const found = await prisma.wine.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
			producer: true,
			tastings: true,
		}
  })
  // @ts-ignore
  return found as WineDAO[]
}
  
export async function getFullWineDAO(id: string) {
  const found = await prisma.wine.findUnique({
    where: {
      id
    },
    include: {
			producer: true,
			tastings: true,
		}
  })
  // @ts-ignore
  return found as WineDAO
}
    