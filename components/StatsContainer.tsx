"use client"

import { useState, Dispatch, SetStateAction, useRef, useEffect, Fragment } from "react"
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
            bg={"contentBackground"}
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
    const [data] = useState({
        websites: [
            { title: "💻 eridian.xyz", link: "https://eridian.xyz", emoji: "👀", type: "views", data: generateSampleData({ maxValue: 50 }) },
            {
                title: "📖 docs.eridian.xyz",
                link: "https://docs.eridian.xyz",
                emoji: "👀",
                type: "views",
                data: generateSampleData({ maxValue: 10 }),
            },
            {
                title: "📋 staking.directory",
                link: "https://staking.directory",
                emoji: "👀",
                type: "views",
                data: generateSampleData({ maxValue: 200 }),
            },
            {
                title: "⛺️ settlers.eridian.xyz",
                link: "https://settlers.eridian.xyz",
                emoji: "👀",
                type: "views",
                data: generateSampleData({ maxValue: 50 }),
            },
            {
                title: "🏖️ pool.eridian.xyz",
                link: "https://pool.eridian.xyz",
                emoji: "👀",
                type: "views",
                data: generateSampleData({ maxValue: 20 }),
            },
            { title: "💰 ssvrewards.com", link: "https://ssvrewards.com", emoji: "👀", type: "views", data: generateSampleData({ maxValue: 300 }) },
        ],
        github: [
            {
                title: "💻 eridian.xyz",
                link: "https://github.com/EridianAlpha/eridian.xyz",
                emoji: "💻",
                type: "commits",
                data: generateSampleData({ maxValue: 50 }),
            },
            {
                title: "📖 docs.eridian.xyz",
                link: "https://github.com/EridianAlpha/docs",
                emoji: "💻",
                type: "commits",
                data: generateSampleData({ maxValue: 10 }),
            },
        ],
        socials: [
            { title: "X Posts", link: "https://x.com/EridianAlpha", emoji: "📣", type: "posts", data: generateSampleData({ maxValue: 50 }) },
            { title: "X Reposts", link: "https://x.com/EridianAlpha", emoji: "🔁", type: "reposts", data: generateSampleData({ maxValue: 10 }) },
            { title: "X Comments", link: "https://x.com/EridianAlpha", emoji: "💬", type: "comments", data: generateSampleData({ maxValue: 300 }) },
        ],
    })

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

    const labelWidth = "210px"
    const structureData = Object.values(data)[0][0].data

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
                <Box position="sticky" left={labelWidth} zIndex={2} bg={"contentBackground"} />
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
                {Object.values(data)[0].map((config, index) => (
                    <StatsRow
                        key={config.title}
                        title={config.title}
                        link={config.link}
                        emoji={config.emoji}
                        type={config.type}
                        data={config.data}
                        labelWidth={labelWidth}
                        firstRow={index === 0}
                        setSelectedIndex={setSelectedIndex}
                        setHoverIndex={setHoverIndex}
                        selectedIndex={selectedIndex}
                        hoverIndex={hoverIndex}
                    />
                ))}

                {/* Other Stats Rows */}
                {Object.entries(data)
                    .slice(1)
                    .map(([sectionName, section]) => (
                        <Fragment key={sectionName}>
                            <HeadingCell>{sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}</HeadingCell>
                            <EmptyRow count={structureData.length + 2} headingRow={true} height="60px" labelWidth={labelWidth} />
                            {section.map((config) => (
                                <StatsRow
                                    key={config.title}
                                    title={config.title}
                                    link={config.link}
                                    emoji={config.emoji}
                                    type={config.type}
                                    data={config.data}
                                    labelWidth={labelWidth}
                                    setSelectedIndex={setSelectedIndex}
                                    setHoverIndex={setHoverIndex}
                                    selectedIndex={selectedIndex}
                                    hoverIndex={hoverIndex}
                                />
                            ))}
                        </Fragment>
                    ))}

                <SectionEnd count={structureData.length + 2} labelWidth={labelWidth} selectedIndex={selectedIndex} hoverIndex={hoverIndex} />
                <EmptyRow count={structureData.length + 2} labelWidth={labelWidth} height="15px" />
            </Grid>
        </Box>
    )
}
