"use client"

import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ProducerDAO } from "@/services/producer-services"
import { Eye, EyeOff, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { ProducerDialog } from "../admin/producers/producer-dialogs"
import ProducerControls from "./producer-controls"
import { ProductorSelector, SelectorData } from "./productor-selector"
import WineBox from "./wine-box"
import { Input } from "@/components/ui/input"
import { WineDAO } from "@/services/wine-services"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type Props = {
    producer: ProducerDAO | undefined
    selectorData: SelectorData[]
}

export default function OverviewBox({ producer, selectorData }: Props) {

    const [scoreVisible, setScoreVisible] = useState(true)
    const [wineSearchText, setWineSearchText] = useState("")
    const [initialWines, setInitialWines] = useState<WineDAO[]>(producer?.wines || [])
    const [wines, setWines] = useState<WineDAO[]>(initialWines)
    const [filteredCount, setFilteredCount] = useState<number>(0)
    const [gabiSelected, setGabiSelected] = useState(true)
    const [timSelected, setTimSelected] = useState(true)

    useEffect(() => {
        if (!producer) return

        console.log("filtrando");
        
        let filtered: WineDAO[] = []

        if (gabiSelected && timSelected) {
            setWines(producer.wines)
            filtered= producer.wines
        } else if (gabiSelected) {
            filtered= producer.wines.filter((wine) => wine.tastings.some((tasting) => tasting.taster === "Gabi") )
            setWines(filtered)
        } else if (timSelected) {
            filtered= producer.wines.filter((wine) => wine.tastings.some((tasting) => tasting.taster === "Tim") )
            setWines(filtered)
        } else {
            setWines([])
        }

        setFilteredCount(filtered.length)

        if (wineSearchText.trim() === "") return

        const filtered2= filtered.filter((wine) => wine.name.toLowerCase().includes(wineSearchText.trim().toLocaleLowerCase()) )

        setWines(filtered2)
        setFilteredCount(filtered2.length)

    }, [producer, gabiSelected, timSelected, wineSearchText])
    
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
                                    <Input placeholder="Search wine" value={wineSearchText} className="pl-8" onChange={(e) => setWineSearchText(e.target.value)} />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="Gabi" onCheckedChange={(e) => setGabiSelected(!gabiSelected)} checked={gabiSelected}/>
                                    <Label htmlFor="Gabi">Gabi</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="Tim" onCheckedChange={(e) => setTimSelected(!timSelected)} checked={timSelected}/>
                                    <Label htmlFor="Tim">Tim</Label>
                                </div>

                                <p className="text-lg">
                                    ({filteredCount} filtered)
                                </p>

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
