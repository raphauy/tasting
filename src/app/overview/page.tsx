import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ProducerDAO, getFullProducerDAO, getFullProducersDAO } from "@/services/producer-services"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { ProducerDialog } from "../admin/producers/producer-dialogs"
import ProducerControls from "./producer-controls"
import { ProductorSelector, SelectorData } from "./productor-selector"
import WineBox from "./wine-box"
import OverviewBox from "./overview-box"

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

    let producer: ProducerDAO | undefined= undefined

    if (p) {        
        producer= await getFullProducerDAO(p)
    }

    return (
        <OverviewBox producer={producer} selectorData={selectorData}/>
    )
}
