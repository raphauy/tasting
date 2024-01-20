"use client"

import { TastingDAO } from "@/services/tasting-services"
import TastingControls from "./tasting-controls"
import { useState } from "react"
import ScoreBox from "./score-box"

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
                        className="flex justify-between px-1 border-white hover:border-green-200 h-10 rounded-lg hover:border hover:bg-green-50"
                        onMouseEnter={() => handleMouseEnter(tasting.id)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="flex items-center gap-10">
                            <p className="w-12">{tasting.taster}</p>
                            <p className="w-12 font-semibold">{tasting.vintage}</p>
                            { tasting.abv ? <p className="w-14 text-right">{tasting.abv}%</p> : "" }
                            { tasting.pesoPrice ? <p className="w-20 text-right">{tasting.pesoPrice} UYU</p> : "" }
                            <ScoreBox score={tasting.score} visible={visible} />
                        </div>

                        {
                            hoverId === tasting.id &&
                            <TastingControls tasting={tasting} />
                        }

                    </div>
                )
            })}

        </div>
    )
}
