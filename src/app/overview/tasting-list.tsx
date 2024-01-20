"use client"

import { TastingDAO } from "@/services/tasting-services"
import TastingControls from "./tasting-controls"
import { useState } from "react"
import ScoreBox from "./score-box"
import Link from "next/link"

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
                        <Link href={`/overview/${tasting.id}`} prefetch={false}>
                            <div className="flex items-center gap-10">
                                <p className="min-w-12">{tasting.taster}</p>
                                <p className="min-w-12 font-semibold">{tasting.vintage}</p>
                                <p className="min-w-14 text-right">{ tasting.abv ? tasting.abv + "%" : "" }</p>
                                <p className="min-w-20 text-right">{tasting.pesoPrice ? tasting.pesoPrice + "UYU" : ""}</p>
                                <ScoreBox score={tasting.score} visible={visible} />
                                <p className="w-fit">{tasting.tastingNote ? tasting.tastingNote : ""}</p>
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
