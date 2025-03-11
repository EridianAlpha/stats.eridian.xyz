"use client"

import { useState } from "react"
import StatsContainer from "../../components/StatsContainer"

export default function EmbedPage() {
    const [selectedDate, setSelectedDate] = useState("")

    return <StatsContainer selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
}
