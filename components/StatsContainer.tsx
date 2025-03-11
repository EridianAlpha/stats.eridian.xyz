"use client"

import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react"
import { Grid, Box, Text, VStack } from "@chakra-ui/react"

import DateLabel from "./DateLabel"
import EmptyRow from "./EmptyRow"
import StatsRow from "./StatsRow"
import { generateSampleData } from "../utils/statsUtils"

export default function StatsContainer({
    selectedIndex,
    setSelectedIndex,
}: {
    selectedIndex: number | null
    setSelectedIndex: Dispatch<SetStateAction<number | null>>
}) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)
    const [data, setData] = useState(() => generateSampleData())
    const [websiteConfigs] = useState([
        { title: "💻 eridian.xyz", emoji: "👀" },
        { title: "📖 docs.eridian.xyz", emoji: "👀" },
        { title: "📋 staking.directory", emoji: "👀" },
        { title: "⛺️ settlers.eridian.xyz", emoji: "👀" },
        { title: "🏖️ pool.eridian.xyz", emoji: "👀" },
        { title: "💰 ssvrewards.com", emoji: "👀" },
    ])

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.clientHeight)
                setContainerWidth(containerRef.current.scrollWidth)
            }
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)

        return () => window.removeEventListener("resize", updateDimensions)
    }, [])

    const labelWidth = "200px"
    return (
        <Box ref={containerRef} bg={"contentBackground"} borderRadius={"20px"} position="relative" overflowX="scroll" maxWidth="100%">
            <Grid templateColumns={`repeat(${data.length + 2}, 1fr)`} pt={3} mr={5} gap={"0px"} position="relative" w={containerWidth}>
                {/* Empty first column for alignment */}
                <Box position="sticky" left={0} zIndex={6} bg={"contentBackground"} />
                <Box position="sticky" left={labelWidth} zIndex={3} bg={"contentBackground"} />

                {/* First row: Odd index dates */}
                {data.map((item, index) =>
                    index % 2 === 0 ? (
                        <DateLabel
                            key={item.date}
                            item={item}
                            index={index}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                            containerHeight={containerHeight}
                        />
                    ) : (
                        <Box key={`empty-${item.date}`} />
                    ),
                )}
                {/* Empty first column for alignment */}
                <VStack
                    fontWeight="bold"
                    textAlign="left"
                    whiteSpace="nowrap"
                    color={"blue"}
                    fontSize={"xl"}
                    position="sticky"
                    left={0}
                    bg={"contentBackground"}
                    zIndex={10}
                    px={5}
                    justifyContent="end"
                    alignItems="start"
                >
                    Websites
                </VStack>
                <Box position="sticky" left={labelWidth} zIndex={2} bg={"contentBackground"} />

                {/* Second row: Even index dates */}
                {data.map((item, index) =>
                    index % 2 !== 0 ? (
                        <DateLabel
                            key={item.date}
                            item={item}
                            index={index}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                            containerHeight={containerHeight}
                        />
                    ) : (
                        <Box key={`empty-${item.date}`} />
                    ),
                )}

                {websiteConfigs.map((config, index) => (
                    <StatsRow
                        key={config.title}
                        title={config.title}
                        emoji={config.emoji}
                        data={data}
                        labelWidth={labelWidth}
                        firstRow={index === 0}
                    />
                ))}
                <EmptyRow count={data.length + 2} labelWidth={labelWidth} sectionEnd={true} />
                <EmptyRow count={data.length + 2} labelWidth={labelWidth} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                <Text>Selected Index: {selectedIndex}</Text>
            </Grid>
        </Box>
    )
}
