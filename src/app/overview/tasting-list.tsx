"use client"

import { TastingDAO } from "@/services/tasting-services"
import TastingControls from "./tasting-controls"
import { useState } from "react"
import ScoreBox from "./score-box"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { format } from "date-fns"

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

    return (
        <div>
            {tastings.map((tasting) => {
                return (
                    <div key={tasting.id} 
                        className="flex justify-between px-1 border-white rounded-lg hover:bg-green-50"
                        onMouseEnter={() => handleMouseEnter(tasting.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href={`/overview/${tasting.id}`} prefetch={false} className="w-full">
                            <div className="flex items-center gap-10 border-b w-full">
                                <p className="min-w-10">{tasting.taster}</p>
                                <p className="min-w-20 font-semibold text-right">{tasting.vintage}</p>
                                <p className="min-w-10 text-right">{ tasting.abv ? tasting.abv + "%" : "" }</p>
                                <p className="min-w-16 text-right">{tasting.pesoPrice ? Intl.NumberFormat("es-UY", { style: "currency", currency: "UYU", maximumFractionDigits: 0 }).format(tasting.pesoPrice) : ""}</p>
                                <ScoreBox score={tasting.score} visible={visible} />
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
                        </Link>

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
