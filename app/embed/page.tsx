"use client"

import { useState } from "react"
import StatsContainer from "../../components/StatsContainer"

export default function EmbedPage() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    return <StatsContainer selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} embedded={true} />
}
