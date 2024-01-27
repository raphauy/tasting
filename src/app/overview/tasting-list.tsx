"use client"

import { TastingDAO } from "@/services/tasting-services"
import TastingControls from "./tasting-controls"
import { useState } from "react"
import ScoreBox from "./score-box"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { format } from "date-fns"
import { ChangeWineDialog } from "../admin/tastings/tasting-dialogs"
import { cn } from "@/lib/utils"

type Props = {
    tastings: TastingDAO[]
    visible: boolean
}
export default function TastingList({ tastings, visible }: Props) {
    const [hoverId, setHoverId] = useState<string | null>(null)

    function handleMouseEnter(id: string) {
        setHoverId(id)
    }
    function handleMouseLeave() {
        setHoverId(null)
    }

    const lastIndex = tastings.length - 1

    return (
        <div>
            {tastings.map((tasting, index) => {
                return (
                    <div key={tasting.id} 
                        className="flex justify-between items-center px-1 border-white rounded-lg hover:bg-green-50"
                        onMouseEnter={() => handleMouseEnter(tasting.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href={`/overview/${tasting.id}`} prefetch={false} className="w-full">
                            <div className={cn("flex py-1 items-center gap-10 w-full", index !== lastIndex && "border-b")}>                            
                                <p className={cn("min-w-11 px-1", tasting.taster === "Gabi" && "bg-verde-claro rounded-md text-center font-bold")}>{tasting.taster}</p>
                                <p className="w-fit font-semibold text-right">{tasting.vintage}</p>
                                <p className="min-w-10 text-right">{ tasting.abv ? tasting.abv + "%" : "" }</p>
                                <p className="min-w-16 text-right">{tasting.pesoPrice ? Intl.NumberFormat("es-UY", { style: "currency", currency: "UYU", maximumFractionDigits: 0 }).format(tasting.pesoPrice) : ""}</p>
                                <ScoreBox score={tasting.score} visible={visible} />
                                <div className="flex-1">

                                    {
                                        tasting.tastingNote && (
                                            <div className="flex items-center justify-between w-full py-2">
                                                <p className="line-clamp-3">{tasting.tastingNote}</p>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div>
                                                            <Info size={20} />
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <div className="max-w-lg text-base">
                                                            <p>{tasting.tastingNote}</p>
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                        )
                                    }
                                </div>
                                <p className="text-sm mr-2">{tasting.tastingDate ? "TD: " + format(tasting.tastingDate, "yyyy") : ""}</p>
                            </div>
                        </Link>
                        <ChangeWineDialog id={tasting.id} wineId={tasting.wineId} />

                        {/* {
                            hoverId === tasting.id &&
                            <TastingControls tasting={tasting} />
                        } */}

                    </div>
                )
            })}

        </div>
    )
}
