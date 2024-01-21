import * as z from "zod"
import { prisma } from "@/lib/db"
import { WineDAO } from "./wine-services"
import { getWinesDAO } from "./wine-services"

export type ProducerDAO = {
	id: string
	name: string
	createdAt: Date
	updatedAt: Date
	wines: WineDAO[]
}

export const producerSchema = z.object({
	name: z.string({required_error: "name is required."}),
})

export type ProducerFormValues = z.infer<typeof producerSchema>


export async function getProducersDAO() {
  const found = await prisma.producer.findMany({
    orderBy: {
      id: 'asc'
    },
  })
  return found as ProducerDAO[]
}

export async function getProducerDAO(id: string) {
  const found = await prisma.producer.findUnique({
    where: {
      id
    },
  })
  return found as ProducerDAO
}
    
export async function createProducer(data: ProducerFormValues) {
  // TODO: implement createProducer
  const created = await prisma.producer.create({
    data
  })
  return created
}

export async function updateProducer(id: string, data: ProducerFormValues) {
  const updated = await prisma.producer.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteProducer(id: string) {
  const deleted = await prisma.producer.delete({
    where: {
      id
    },
  })
  return deleted
}
    
export async function getComplentaryWines(id: string) {
  const found = await prisma.producer.findUnique({
    where: {
      id
    },
    include: {
      wines: true,
    }
  })
  const all= await getWinesDAO()
  const res= all.filter(aux => {
    return !found?.wines.find(c => c.id === aux.id)
  })
  
  return res
}

export async function setWines(id: string, wines: WineDAO[]) {
  const oldWines= await prisma.producer.findUnique({
    where: {
      id
    },
    include: {
      wines: true,
    }
  })
  .then(res => res?.wines)

  await prisma.producer.update({
    where: {
      id
    },
    data: {
      wines: {
        disconnect: oldWines
      }
    }
  })

  const updated= await prisma.producer.update({
    where: {
      id
    },
    data: {
      wines: {
        connect: wines.map(c => ({id: c.id}))
      }
    }
  })

  if (!updated) {
    return false
  }

  return true
}



export async function getFullProducersDAO() {
  const found = await prisma.producer.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
			wines: {
        include: {
          tastings: {
            orderBy: [
              {
                tastingDate: 'asc'
              },
              {
                taster: 'asc'
              }
            ]
          }
        },
        orderBy: {
          vintage: 'desc',
        }
      }
		}
  })
  // @ts-ignore
  return found as ProducerDAO[]
}
  
export async function getFullProducerDAO(id: string) {
  const found = await prisma.producer.findUnique({
    where: {
      id
    },
    include: {
      wines: {
        include: {
          tastings: {
            orderBy: [
              {
                tastingDate: 'asc'
              },
              {
                taster: 'asc'
              }
            ]
          }
        },
        orderBy: {
          vintage: 'desc',
        }
      }
    }
  })
  
  return found as ProducerDAO
}