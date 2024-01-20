import { DeleteTastingDialog } from "@/app/admin/tastings/tasting-dialogs"
import { TastingFullForm } from "@/app/admin/tastings/tasting-full-form"
import { Separator } from "@/components/ui/separator"
import { getFullTastingDAO } from "@/services/tasting-services"
import TastingControls from "../tasting-controls"
import { TooltipProvider } from "@/components/ui/tooltip"

type Props = {
    params: {
        tastingId: string
    }
}

export default async function TastingPage({ params }: Props) {
    const tastingId = params.tastingId
    const tasting= await getFullTastingDAO(tastingId)
    //@ts-ignore
    const wine= tasting.wine
    if (!tasting) {
        return <div>Tasting Not found</div>
    }
    return (
        <div className="w-full">
            <div className="mt-5 mb-10 flex justify-between">
                <p></p>
                {/** @ts-ignore */}
                <p className="text-3xl font-bold text-center">{tasting.wine.producer.name} - {tasting.wine.name} {tasting.vintage}</p>
                <TooltipProvider delayDuration={0}>
                    <TastingControls tasting={tasting} />
                </TooltipProvider>

            </div>
            

            {/** @ts-ignore */}
            <TastingFullForm id={params.tastingId} producerId={tasting.wine.producer.id} wine={wine} />
        </div>
  )
}
