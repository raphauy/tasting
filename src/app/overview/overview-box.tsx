"use client"

import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ProducerDAO } from "@/services/producer-services"
import { Eye, EyeOff, Search } from "lucide-react"
import { useState } from "react"
import { ProducerDialog } from "../admin/producers/producer-dialogs"
import ProducerControls from "./producer-controls"
import { ProductorSelector, SelectorData } from "./productor-selector"
import WineBox from "./wine-box"
import { Input } from "@/components/ui/input"
import { WineDAO } from "@/services/wine-services"

type Props = {
    producer: ProducerDAO | undefined
    selectorData: SelectorData[]
}

export default function OverviewBox({ producer, selectorData }: Props) {

    const [scoreVisible, setScoreVisible] = useState(true)
    const [wineSearchText, setWineSearchText] = useState("")
    const [initialWines, setInitialWines] = useState<WineDAO[]>(producer?.wines || [])
    const [wines, setWines] = useState<WineDAO[]>(initialWines)

    function filterWine(text: string) {
        setWineSearchText(text)
        
        if (text.trim() === "") {
            setWines(initialWines)
            return
        }
        const filtered= initialWines.filter((wine) => wine.name.includes(text.trim().toLocaleLowerCase()) )
        setWines(filtered)
    }
    

    return (
        <TooltipProvider delayDuration={0}>
            <div className="w-full">
                <div className="flex w-full justify-between items-center">
                    <div className="w-fit">
                        <ProductorSelector selectors={selectorData} />
                    </div>
                    <div className="flex justify-end mt-2 mb-4">
                        <Button variant="ghost" onClick={() => setScoreVisible(!scoreVisible)}>
                            {scoreVisible ? <Eye /> : <EyeOff />}
                        </Button>
                        <ProducerDialog />
                    </div>
                </div>

                {
                    producer &&
                    <div className="mb-24">
                        <div className="flex justify-between border px-2 mb-3 border-verde-claro h-12 items-center bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-5">
                                <p className="font-bold text-3xl">
                                    {producer.name} 
                                </p>
                                <p className="text-lg">
                                    ({producer.wines.length} wines)
                                </p>
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search wine" value={wineSearchText} className="pl-8" onChange={(e) => filterWine(e.target.value)} />
                                </div>

                            </div>
                            <ProducerControls producer={producer} />
                        </div>
                        {wines.map((wine) => {
                            return (
                                <WineBox key={wine.id} wine={wine} initVisible={scoreVisible} />
                            )
                        })}
                    </div>                
                }
            </div>
        </TooltipProvider>
    )
}
