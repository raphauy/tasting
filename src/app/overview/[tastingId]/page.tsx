import { TastingFullForm } from "@/app/admin/tastings/tasting-full-form"
import { getFullTastingDAO } from "@/services/tasting-services"

type Props = {
    params: {
        tastingId: string
    }
}

export default async function TastingPage({ params }: Props) {
    const tastingId = params.tastingId
    const tasting= await getFullTastingDAO(tastingId)
    if (!tasting) {
        return <div>Tasting Not found</div>
    }
    return (
        <div className="w-full">
            {/** @ts-ignore */}
            <p className="text-3xl font-bold mt-5 mb-10 text-center">{tasting.wineName} {tasting.vintage} - {tasting.wine.producer.name}</p>
            
            <TastingFullForm id={params.tastingId}/>
        </div>
  )
}
