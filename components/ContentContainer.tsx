"use client"

import { useState } from "react"
import { VStack, Box } from "@chakra-ui/react"

import Header from "../components/Header"
import StatsContainer from "./StatsContainer"
import Footer from "../components/Footer"

export default function ContentContainer() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    return (
        <VStack minH="100vh" onClick={() => setSelectedIndex(null)}>
            <Header />
            <VStack
                alignItems={"start"}
                justifyContent={"center"}
                gap={5}
                w={"100%"}
                maxW="1400px"
                py={2}
                borderRadius={"20px"}
            >
                <StatsContainer selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            </VStack>
            <Box flexGrow={1} />
            <Footer />
        </VStack>
    )
}
