import { getFullProducersDAO } from "@/services/producer-services"
import { ProducerDialog } from "../admin/producers/producer-dialogs"
import { TooltipProvider } from "@/components/ui/tooltip"
import ProducerControls from "./producer-controls"
import WineControls from "./wine-controls"
import TastingList from "./tasting-list"
import WineBox from "./wine-box"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

type Props = {
    searchParams: {
        p?: string
        v?: string
    }
}

export default async function OverviewPage({ searchParams }: Props) {
    const p= searchParams.p
    const v= searchParams.v
    
    const initVisible= v && v === "true" ? true : false    

    const producers= await getFullProducersDAO()
    return (
        <TooltipProvider delayDuration={0}>
            <div className="w-full">
                <div className="flex justify-end mx-auto mt-2 mb-4">
                    <Link href={`/overview?v=${initVisible ? "false" : "true"}`} prefetch={false}>
                        <Button variant="ghost">
                            {initVisible ? <Eye /> : <EyeOff />}
                        </Button>
                    </Link>
                    <ProducerDialog />
                </div>

                {producers.map((producer) => {
                    return (
                        <div key={producer.id} className="mb-24">
                            <div className="flex justify-between border px-2 mb-3 border-verde-claro h-10 bg-slate-50 rounded-lg">
                                <p className="font-bold text-3xl mb-4">{producer.name}</p>
                                <ProducerControls producer={producer} />
                            </div>
                            {producer.wines.map((wine) => {
                                return (
                                    <WineBox key={wine.id} wine={wine} initVisible={initVisible} />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </TooltipProvider>
    )
}
