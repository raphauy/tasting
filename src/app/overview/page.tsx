import { ProducerDAO, getFullProducerDAO, getFullProducersDAO, getProducersDAO } from "@/services/producer-services"
import { ProducerDialog } from "../admin/producers/producer-dialogs"
import { TooltipProvider } from "@/components/ui/tooltip"
import ProducerControls from "./producer-controls"
import WineControls from "./wine-controls"
import TastingList from "./tasting-list"
import WineBox from "./wine-box"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { ProductorSelector, SelectorData } from "./productor-selector"
import { count } from "console"

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

    let producers= await getFullProducersDAO()
    const selectorData: SelectorData[]= producers.map(producer => {
        const winesCount= producer.wines.length
        return {
            id: producer.id,
            name: producer.name,
            count: winesCount
        }
    })

    if (p && p !== "ALL") {
        const producer= await getFullProducerDAO(p)
        producers= []
        producers.push(producer)        
    }

    return (
        <TooltipProvider delayDuration={0}>
            <div className="w-full">
                <div className="flex w-full justify-between items-center">
                    <div className="w-fit">
                        <ProductorSelector selectors={selectorData} />
                    </div>
                    <div className="flex justify-end mt-2 mb-4">
                        <Link href={`/overview?v=${initVisible ? "false" : "true"}`} prefetch={false}>
                            <Button variant="ghost">
                                {initVisible ? <Eye /> : <EyeOff />}
                            </Button>
                        </Link>
                        <ProducerDialog />
                    </div>
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
