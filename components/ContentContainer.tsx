"use client"

import { useState } from "react"

import { VStack, Box } from "@chakra-ui/react"

import Header from "../components/Header"
import StatsContainer from "./StatsContainer"
import ChartContainer from "./ChartContainer"
import Footer from "../components/Footer"

export default function ContentContainer() {
    const [selectedDate, setSelectedDate] = useState("")

    return (
        <VStack minH="100vh" onClick={() => setSelectedDate("")}>
            <Header />
            <VStack alignItems={"center"} gap={5} w={"100%"} maxW="1400px" justifyContent={"center"} py={10} borderRadius={"20px"}>
                {/* <ChartContainer /> */}
                <StatsContainer selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </VStack>
            <Box flexGrow={1} />
            <Footer />
        </VStack>
    )
}
