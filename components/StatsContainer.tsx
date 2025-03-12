"use client"

import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react"
import { Grid, Box, VStack } from "@chakra-ui/react"

import DateLabel from "./DateLabel"
import EmptyRow from "./EmptyRow"
import StatsRow from "./StatsRow"
import SectionEnd from "./SectionEnd"
import { generateSampleData } from "../utils/statsUtils"

const HeadingCell = ({ children }: { children: React.ReactNode }) => {
    return (
        <VStack
            fontWeight="bold"
            textAlign="left"
            whiteSpace="nowrap"
            color={"blue"}
            fontSize={"xl"}
            position="sticky"
            left={0}
            bg={"yellow"}
            zIndex={10}
            px={5}
            justifyContent="end"
            alignItems="start"
        >
            {children}
        </VStack>
    )
}

export default function StatsContainer({
    selectedIndex,
    setSelectedIndex,
}: {
    selectedIndex: number | null
    setSelectedIndex: Dispatch<SetStateAction<number | null>>
}) {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)
    const [websiteConfigs] = useState([
        { title: "💻 eridian.xyz", emoji: "👀", data: generateSampleData({ maxValue: 50 }) },
        { title: "📖 docs.eridian.xyz", emoji: "👀", data: generateSampleData({ maxValue: 10 }) },
        { title: "📋 staking.directory", emoji: "👀", data: generateSampleData({ maxValue: 200 }) },
        { title: "⛺️ settlers.eridian.xyz", emoji: "👀", data: generateSampleData({ maxValue: 50 }) },
        { title: "🏖️ pool.eridian.xyz", emoji: "👀", data: generateSampleData({ maxValue: 20 }) },
        { title: "💰 ssvrewards.com", emoji: "👀", data: generateSampleData({ maxValue: 300 }) },
    ])
    const [socialConfigs] = useState([
        { title: "X Posts", emoji: "📣", data: generateSampleData({ maxValue: 50 }) },
        { title: "X Reposts", emoji: "🔁", data: generateSampleData({ maxValue: 10 }) },
        { title: "X Likes", emoji: "❤️", data: generateSampleData({ maxValue: 200 }) },
        { title: "X Comments", emoji: "💬", data: generateSampleData({ maxValue: 300 }) },
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
    // Use the first website's data for the structure since all should have the same dates
    const structureData = websiteConfigs[0].data

    return (
        <Box ref={containerRef} bg={"contentBackground"} borderRadius={"20px"} position="relative" overflowX="scroll" maxWidth="100%">
            <Grid templateColumns={`repeat(${structureData.length + 2}, 1fr)`} pt={3} mr={5} gap={"0px"} position="relative" w={containerWidth}>
                {/* First row: Odd index dates */}
                <Box position="sticky" left={0} zIndex={6} bg={"contentBackground"} />
                <Box position="sticky" left={labelWidth} zIndex={3} bg={"contentBackground"} />
                {structureData.map((item, index) =>
                    index % 2 === 0 ? (
                        <DateLabel
                            key={item.date}
                            item={item}
                            index={index}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                            containerHeight={containerHeight}
                            hoverIndex={hoverIndex}
                            setHoverIndex={setHoverIndex}
                        />
                    ) : (
                        <Box key={`empty-${item.date}`} />
                    ),
                )}

                {/* Second row: Even index dates */}
                <HeadingCell>Websites</HeadingCell>
                <Box position="sticky" left={labelWidth} zIndex={2} bg={"blue"} />
                {structureData.map((item, index) =>
                    index % 2 !== 0 ? (
                        <DateLabel
                            key={item.date}
                            item={item}
                            index={index}
                            selectedIndex={selectedIndex}
                            setSelectedIndex={setSelectedIndex}
                            containerHeight={containerHeight}
                            hoverIndex={hoverIndex}
                            setHoverIndex={setHoverIndex}
                        />
                    ) : (
                        <Box key={`empty-${item.date}`} />
                    ),
                )}

                {/* First Stats Rows */}
                {websiteConfigs.map((config, index) => (
                    <StatsRow
                        key={config.title}
                        title={config.title}
                        emoji={config.emoji}
                        data={config.data}
                        labelWidth={labelWidth}
                        firstRow={index === 0}
                        setSelectedIndex={setSelectedIndex}
                        setHoverIndex={setHoverIndex}
                        selectedIndex={selectedIndex}
                        hoverIndex={hoverIndex}
                    />
                ))}

                {/* First Stats Rows */}
                <EmptyRow count={structureData.length + 2} height="10px" labelWidth={labelWidth} />
                <HeadingCell>Socials</HeadingCell>
                <EmptyRow count={structureData.length + 2} headingRow={true} height="50px" labelWidth={labelWidth} />

                {socialConfigs.map((config) => (
                    <StatsRow
                        key={config.title}
                        title={config.title}
                        emoji={config.emoji}
                        data={config.data}
                        labelWidth={labelWidth}
                        setSelectedIndex={setSelectedIndex}
                        setHoverIndex={setHoverIndex}
                        selectedIndex={selectedIndex}
                        hoverIndex={hoverIndex}
                    />
                ))}

                <SectionEnd count={structureData.length + 2} labelWidth={labelWidth} selectedIndex={selectedIndex} hoverIndex={hoverIndex} />
                <EmptyRow count={structureData.length + 2} labelWidth={labelWidth} height="15px" />
            </Grid>
        </Box>
    )
}
