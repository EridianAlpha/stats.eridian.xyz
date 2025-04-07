"use client"

import { useState, Dispatch, SetStateAction, useRef, useEffect, Fragment } from "react"
import { Grid, Box, VStack, Spinner, Switch, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { useSearchParams } from "next/navigation"

import DateLabel from "./DateLabel"
import EmptyRow from "./EmptyRow"
import StatsRow from "./StatsRow"
import HeadingCell from "./HeadingCell"

import { DataStructure, DateRangeItem } from "../interfaces/types"

import data from "../public/data/data.json"
import { generateSampleData } from "../utils/statsUtils"

export default function StatsContainer({
    selectedIndex,
    setSelectedIndex,
}: {
    selectedIndex: number | null
    setSelectedIndex: Dispatch<SetStateAction<number | null>>
}) {
    const gridRef = useRef<HTMLDivElement>(null)
    const searchParams = useSearchParams()

    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [containerHeight, setContainerHeight] = useState(0)
    const [processedData, setProcessedData] = useState<DataStructure>(data)
    const [demoData, setDemoData] = useState(() => {
        const demoParam = searchParams.get("demo")
        return demoParam === "true" ? true : false
    })

    // Static values
    const [containerWidth] = useState(1400)
    const [labelWidth] = useState("215px")

    // Generate date range
    const [dateRange] = useState<DateRangeItem[]>(() => {
        return Array.from({ length: 30 }, (_, i) => {
            const date = new Date()
            date.setDate(date.getDate() - i)
            return {
                date: date.toISOString().split("T")[0], // YYYY-MM-DD format
            }
        })
    })

    // Process data
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
            if (gridRef.current) {
                setContainerHeight(gridRef.current.clientHeight)
            }
        }

        updateDimensions()
        window.addEventListener("resize", updateDimensions)

        return () => window.removeEventListener("resize", updateDimensions)
    }, [processedData])

    return (
        <Box
            bg={"contentBackground"}
            borderRadius={"20px"}
            position="relative"
            overflowX="scroll"
            maxW="100%"
            w={"100%"}
            minH={"fit-content"}
        >
            <Grid
                ref={gridRef}
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
                        isLast={false}
                    />
                ))}

                {/* Other Stats Rows */}
                {Object.entries(processedData)
                    .slice(1)
                    .filter(([sectionName]) => {
                        const isDemoSection = sectionName.endsWith("-demo")
                        return demoData ? true : !isDemoSection
                    })
                    .map(([sectionName, section], sectionIndex, sectionsArray) => {
                        const isLastSection = sectionIndex === sectionsArray.length - 1
                        return (
                            <Fragment key={sectionName}>
                                <HeadingCell>
                                    {sectionName
                                        .replace(/-demo$/, "")
                                        .charAt(0)
                                        .toUpperCase() + sectionName.replace(/-demo$/, "").slice(1)}
                                </HeadingCell>
                                <EmptyRow
                                    count={dateRange.length + 2}
                                    headingRow={true}
                                    height="45px"
                                    labelWidth={labelWidth}
                                />
                                {section.map((config, index) => {
                                    const isLastItem = isLastSection && index === section.length - 1
                                    return (
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
                                            isLast={isLastItem}
                                        />
                                    )
                                })}
                            </Fragment>
                        )
                    })}
                <EmptyRow count={dateRange.length + 2} labelWidth={labelWidth} height="15px" />
            </Grid>
        </Box>
    )
}
