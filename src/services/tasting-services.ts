import * as z from "zod"
import { prisma } from "@/lib/db"
import { WineDAO } from "./wine-services"
import { ProducerDAO } from "./producer-services"

export type TastingDAO = {
	id: string
	taster: string
  style?: "sparkling" | "white" | "rosé" | "red" | "fortified" | ""
	colour?: "lemon" | "gold" | "amber" | "pink" | "pink-orange" | "orange" | "purple" | "ruby" | "garnet" | "tawny"
	abv?: number
	pesoPrice?: number
	score?: number
	aromas?: "primary" | "secondary" | "tertiary" | ""
  aromasDescriptors?: string
	acidity?: "low" | "medium(-)" | "medium" | "medium(+)" | "high" | ""
	tannins?: "low" | "medium(-)" | "medium" | "medium(+)" | "high" | ""
	body?: "light" | "medium(-)" | "medium" | "medium(+)" | "full" | ""
	finish?: "short" | "medium(-)" | "medium" | "medium(+)" | "long" | ""
	potential?: "suitable for bottle ageing" | "not suitable for bottle ageing" | ""
  aging?: string
	conclusion?: string
  tastingNote?: string
  tastingDate?: Date
	wineId: string
	//wine: WineDAO
	createdAt: Date
	updatedAt: Date
  wineName?: string
  producerName?: string
}

export const tastingSchema = z.object({
	taster: z.string({required_error: "taster is required."}),
	wineId: z.string({required_error: "wineId is required."}),
  colour: z.enum(["lemon", "gold", "amber", "pink", "pink-orange", "orange", "purple", "ruby", "garnet", "tawny", ""]).optional(),
  style: z.enum(["sparkling", "white", "rosé", "red", "fortified", ""]).optional(),
  aromas: z.enum(["primary", "secondary", "tertiary", ""]).optional(),
  aromasDescriptors: z.string().optional(),
  acidity: z.enum(["low", "medium(-)", "medium", "medium(+)", "high", ""]).optional(),
  tannins: z.enum(["low", "medium(-)", "medium", "medium(+)", "high", ""]).optional(),
  body: z.enum(["light", "medium(-)", "medium", "medium(+)", "full", ""]).optional(),
  finish: z.enum(["short", "medium(-)", "medium", "medium(+)", "long", ""]).optional(),
  potential: z.enum(["suitable for bottle ageing", "not suitable for bottle ageing", ""]).optional(),
  aging: z.string().optional(),
  conclusion: z.string().optional(),
  tastingNote: z.string().optional(),
  tastingDate: z.date().optional(),
  abv: z.coerce.number().optional(),
  pesoPrice: z.coerce.number().optional(),
  score: z.coerce.number().optional(),
})

export type TastingFormValues = z.infer<typeof tastingSchema>


export async function getTastingsDAO() {
  const found = await prisma.tasting.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
      wine: true
    }    
  })
  return found as TastingDAO[]
}

export async function getTastingDAO(id: string) {
  const found = await prisma.tasting.findUnique({
    where: {
      id
    },
    include: {
      wine: {
        include: {
          producer: true
        }
      }
    }
  })
  return found as TastingDAO
}
    
export async function createTasting(data: TastingFormValues) {
  // TODO: implement createTasting
  const created = await prisma.tasting.create({
    data
  })
  return created
}

export async function updateTasting(id: string, data: TastingFormValues) {
  const updated = await prisma.tasting.update({
    where: {
      id
    },
    data
  })
  return updated
}

export async function deleteTasting(id: string) {
  const deleted = await prisma.tasting.delete({
    where: {
      id
    },
  })
  return deleted
}


  
export async function getFullTastingsDAO() {
  const found = await prisma.tasting.findMany({
    orderBy: {
      id: 'asc'
    },
    include: {
			wine: {
        include: {
          producer: true
        }
      }
		}
  })
  return found as TastingDAO[]
}
  
export async function getFullTastingDAO(id: string) {
  const found = await prisma.tasting.findUnique({
    where: {
      id
    },
    include: {
			wine: {
        include: {
          producer: true,
          tastings: {
            orderBy: {
              taster: 'asc'
            }
          }
        }
      }
		}
  })
  return found as TastingDAO
}

