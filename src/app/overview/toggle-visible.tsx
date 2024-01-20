"use client"

import { Switch } from "@/components/ui/switch"
import { useState } from "react"

type Props = {
    visible: boolean
    notifyVisible: (visible: boolean) => void
}

export default function ToggleVisible({ visible, notifyVisible }: Props) {

    function setVisible(visible: boolean) {
        notifyVisible(visible)
    }
    return (
        <Switch checked={visible} onCheckedChange={setVisible} />
    )
}
