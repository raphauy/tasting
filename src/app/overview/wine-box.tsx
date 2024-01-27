"use client"

import { WineDAO } from "@/services/wine-services"
import WineControls from "./wine-controls"
import TastingList from "./tasting-list"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
    wine: WineDAO
    initVisible: boolean
}

export default function WineBox({ wine, initVisible }: Props) {
    const [visible, setVisible] = useState(initVisible)

    useEffect(() => {
        setVisible(initVisible)
    }, [initVisible])
    
    return (
        <div key={wine.id} className="border px-3 pt-2 rounded-lg mb-10">
            <div className="flex justify-between items-center mb-3">
                <div className="flex gap-2">
                    <p className="place-self-end font-bold text-xl">{wine.name}, </p>
                    <p className="place-self-end">{wine.region}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <Button variant="ghost" onClick={() => setVisible(!visible)}>
                        {visible ? <Eye /> : <EyeOff />}
                    </Button>
                    <WineControls wine={wine} />
                </div>
            </div>
            <TastingList tastings={wine.tastings} visible={visible} />
        </div>

    )
}
