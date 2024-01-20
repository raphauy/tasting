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
        <div key={wine.id} className="border p-3 rounded-lg mb-2">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center mb-4">
                    <p className="font-bold text-xl">{wine.name}</p>
                    <Button variant="ghost" onClick={() => setVisible(!visible)}>
                        {visible ? <Eye /> : <EyeOff />}
                    </Button>
                </div>
                <WineControls wine={wine} />
            </div>
            <TastingList tastings={wine.tastings} visible={visible} />
        </div>

    )
}
