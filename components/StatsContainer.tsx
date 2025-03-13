"use client"

import { useState, Dispatch, SetStateAction, useRef, useEffect, Fragment } from "react"
import { Grid, Box, VStack, Spinner, Switch, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

import DateLabel from "./DateLabel"
import EmptyRow from "./EmptyRow"
import StatsRow from "./StatsRow"
import SectionEnd from "./SectionEnd"

import data from "../public/data/data.json"
import { generateSampleData } from "../utils/statsUtils"

type DataItem = {
    date: string
    value: number
}

type ConfigItem = {
    title: {
        text: string
        emoji: string
    }
    link: string
    emoji: string
    type: string
    data: DataItem[]
}

type DataStructure = {
    [key: string]: ConfigItem[]
}

type DateRangeItem = {
    date: string
}

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
            <Text lineHeight="1">{children}</Text>
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
    const containerRef = useRef<HTMLDivElement>(null)

    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [containerHeight, setContainerHeight] = useState(0)
    const [containerWidth, setContainerWidth] = useState(1400)
    const [processedData, setProcessedData] = useState<DataStructure>(data)
    const [pageLoaded, setPageLoaded] = useState(false)

    const labelWidth = "215px"

    const [demoData, setDemoData] = useState(true)

    const [dateRange] = useState<DateRangeItem[]>(() => {
        return Array.from({ length: 30 }, (_, i) => {
            const date = new Date()
            date.setDate(date.getDate() - i)
            return {
                date: date.toISOString().split("T")[0], // YYYY-MM-DD format
            }
        })
    })

    useEffect(() => {
        const processedDataWithDates = Object.entries(data).reduce((acc, [section, items]) => {
            acc[section] = items.map((item) => {
                if (demoData) {
                    // Generate demo data
                    return {
                        ...item,
                        data: generateSampleData({ maxValue: 200 }),
                    }
                } else {
                    // Fill in missing dates with 0 or set demo data
                    // Create a map of existing data for quick lookup
                    const existingDataMap = new Map(item.data.map((d) => [d.date, d.value]))

                    // Ensure all dates from dateRange are included
                    const filledData = dateRange.map(({ date }) => ({
                        date,
                        value: existingDataMap.get(date) ?? 0, // Use existing value or default to 0
                    }))

                    return {
                        ...item,
                        data: filledData,
                    }
                }
            })

            return acc
        }, {} as DataStructure)

        setProcessedData(processedDataWithDates)
    }, [dateRange, demoData])

    // Update container height
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.clientHeight)
                setPageLoaded(true)
            }
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)

        return () => window.removeEventListener("resize", updateDimensions)
    }, [processedData])

    return (
        <Box
            ref={containerRef}
            bg={"contentBackground"}
            borderRadius={"20px"}
            position="relative"
            overflowX="scroll"
            maxW="100%"
            w={"100%"}
            minH={"500px"}
        >
            {!pageLoaded ? (
                <VStack justifyContent="center" alignItems="center" h={"500px"}>
                    <Spinner />
                </VStack>
            ) : (
                <Grid
                    templateColumns={`repeat(${dateRange.length + 2}, 1fr)`}
                    pt={3}
                    mr={5}
                    gap={"0px"}
                    position="relative"
                    w={containerWidth}
                >
                    {/* First row: Odd index dates */}
                    <Box position="sticky" left={0} zIndex={6} bg={"contentBackground"} pl={5}>
                        <Switch.Root
                            colorPalette={"orange"}
                            cursor={"pointer"}
                            checked={demoData}
                            onCheckedChange={() => setDemoData(!demoData)}
                            bg={"pageBackground"}
                            py={1}
                            pl={1}
                            pr={2}
                            borderRadius={"full"}
                        >
                            <Switch.HiddenInput />
                            <Switch.Control border={"2px solid"} h={"24px"} w={"44px"}>
                                <Switch.Thumb bg={demoData ? "pageBackground" : "textColor"}>
                                    <Switch.ThumbIndicator>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </Switch.ThumbIndicator>
                                </Switch.Thumb>
                            </Switch.Control>
                            <Switch.Label>
                                <Text fontWeight={"bold"} fontSize={"md"}>
                                    Demo Data
                                </Text>
                            </Switch.Label>
                        </Switch.Root>
                    </Box>
                    <Box position="sticky" left={labelWidth} zIndex={3} bg={"contentBackground"} />
                    {dateRange.map((item, index) =>
                        index % 2 === 0 ? (
                            <DateLabel
                                key={item.date}
                                date={item.date}
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
                    <HeadingCell>
                        {Object.keys(processedData)[0].charAt(0).toUpperCase() + Object.keys(processedData)[0].slice(1)}
                    </HeadingCell>
                    <Box position="sticky" left={labelWidth} zIndex={2} bg={"contentBackground"} />
                    {dateRange.map((item, index) =>
                        index % 2 !== 0 ? (
                            <DateLabel
                                key={`date-label-${item.date}`}
                                date={item.date}
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
                    {Object.values(processedData)[0].map((config, index) => (
                        <StatsRow
                            key={`${config.title.text}-${config.type}`}
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
                    {Object.entries(processedData)
                        .slice(1)
                        .map(([sectionName, section]) => (
                            <Fragment key={sectionName}>
                                <HeadingCell>{sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}</HeadingCell>
                                <EmptyRow
                                    count={dateRange.length + 2}
                                    headingRow={true}
                                    height="60px"
                                    labelWidth={labelWidth}
                                />
                                {section.map((config) => (
                                    <StatsRow
                                        key={`${config.title.text}-${config.type}`}
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

                    <SectionEnd
                        count={dateRange.length + 2}
                        labelWidth={labelWidth}
                        selectedIndex={selectedIndex}
                        hoverIndex={hoverIndex}
                    />
                    <EmptyRow count={dateRange.length + 2} labelWidth={labelWidth} height="15px" />
                </Grid>
            )}
        </Box>
    )
}
