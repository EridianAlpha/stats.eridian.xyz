"use client"

import { useState, Dispatch, SetStateAction, useRef, useEffect } from "react"
import { Grid, Box, Text, VStack, HStack } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"

const formatNumber = (num: number): string => {
    if (num < 1000) return num.toString()
    if (num < 10000) return (num / 1000).toFixed(1) + "k"
    if (num < 1000000) return Math.floor(num / 1000) + "k"
    return (num / 1000000).toFixed(1) + "m"
}

const generateSampleData = () => {
    return Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const randomValue = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 2000000)
        return {
            date: date.toISOString().split("T")[0],
            formattedDate: `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`,
            value: randomValue === 0 ? "0" : formatNumber(randomValue),
        }
    })
}

const websiteConfigs = [
    { title: "💻 eridian.xyz", emoji: "👀" },
    { title: "📖 docs.eridian.xyz", emoji: "👀" },
    { title: "📋 staking.directory", emoji: "👀" },
    { title: "⛺️ settlers.eridian.xyz", emoji: "👀" },
    { title: "🏖️ pool.eridian.xyz", emoji: "👀" },
    { title: "💰 ssvrewards.com", emoji: "👀" },
]

const data = generateSampleData()

function DateLabel({
    item,
    index,
    selectedDate,
    setSelectedDate,
    containerHeight,
}: {
    item: (typeof data)[number]
    index: number
    selectedDate: string
    setSelectedDate: Dispatch<SetStateAction<string>>
    containerHeight: number
}) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Box
            key={`date-${item.date}`}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={"16px"}
            fontFamily={"monospace"}
        >
            <Box
                position="absolute"
                bg="blueDark"
                px={2}
                borderRadius={"full"}
                border={isHovered || selectedDate == item.date ? "2px solid" : "none"}
                borderColor={isHovered || selectedDate == item.date ? "textColor" : "transparent"}
                cursor={"pointer"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                    e.stopPropagation()
                    if (selectedDate == item.date) {
                        setSelectedDate("")
                    } else {
                        setSelectedDate(item.date)
                    }
                }}
                transform={index === 0 ? "translateX(-10px)" : "none"}
                _hover={{
                    transform: index === 0 ? "translateX(-10px)" : "none",
                }}
                zIndex={4}
            >
                <Text fontSize="sm" fontWeight="bold" whiteSpace="nowrap" display="flex" justifyContent="flex-end">
                    {index === 0 && (
                        <Text as="span" mr={2}>
                            <FontAwesomeIcon icon={faCalendarDay} />
                        </Text>
                    )}
                    {item.formattedDate}
                </Text>
            </Box>

            {(isHovered || selectedDate == item.date) && (
                <HStack
                    gap={0}
                    position="absolute"
                    top="10px"
                    left="50%"
                    transform="translateX(-50%)"
                    h={`${containerHeight - (index % 2 === 0 ? 70 : 100)}px`}
                    w="14px"
                    zIndex={3}
                    justifyContent="space-between"
                >
                    <Box bg="textColor" minW={"2px"} h={"100%"} />
                    <Box bg="textColor" w={"2px"} h={"100%"} />
                </HStack>
            )}

            <Box
                bg="blueDark"
                position="absolute"
                top="10px"
                left="50%"
                transform="translateX(-50%)"
                w={"10px"}
                h={`${containerHeight - (index % 2 === 0 ? 70 : 100)}px`}
                zIndex={5}
                cursor={"pointer"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                    e.stopPropagation()
                    if (selectedDate == item.date) {
                        setSelectedDate("")
                    } else {
                        setSelectedDate(item.date)
                    }
                }}
            />
        </Box>
    )
}

function StatsRow({
    title,
    emoji,
    data,
    labelWidth,
    firstRow = false,
}: {
    title: string
    emoji: string
    data: { date: string; value: string }[]
    labelWidth?: string
    firstRow?: boolean
}) {
    return (
        <>
            {/* Empty header boxes */}
            {Array.from({ length: data.length + 2 }).map((_, index) => {
                if (index === 0 || index === 1) {
                    return (
                        <Box
                            key={`header-empty-${index}`}
                            h="12px"
                            position="sticky"
                            left={index === 0 ? 0 : labelWidth}
                            bg="contentBackground"
                            zIndex={6}
                            borderTopRightRadius={index === 1 && firstRow ? "10px" : "0px"}
                        />
                    )
                } else {
                    return <Box key={`header-empty-${index}`} h="12px" position="relative" bg="none" />
                }
            })}
            {/* First column for name label */}
            <Box fontWeight="bold" whiteSpace="nowrap" position="sticky" left={0} bg="contentBackground" zIndex={6} px={5} minW={labelWidth}>
                {title}
            </Box>
            <Box
                fontWeight="bold"
                whiteSpace="nowrap"
                textAlign="center"
                minW="40px"
                position="sticky"
                left={labelWidth}
                bg="contentBackground"
                zIndex={6}
            >
                {emoji}
            </Box>

            {/* Data Boxes */}
            {data.map((item) => (
                <VStack
                    key={item.date}
                    bg={item.value === "0" ? "gray" : "green"}
                    borderRadius="full"
                    textAlign="center"
                    position="relative"
                    justifyContent="center"
                    zIndex={5}
                    mx="5px"
                    minW="40px"
                >
                    <Text fontFamily="monospace" fontWeight="bold">
                        {item.value === "0" ? "" : item.value}
                    </Text>
                </VStack>
            ))}
        </>
    )
}

export default function StatsContainer({
    selectedDate,
    setSelectedDate,
}: {
    selectedDate: string
    setSelectedDate: Dispatch<SetStateAction<string>>
}) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [containerHeight, setContainerHeight] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)

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
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
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
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
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
                        data={generateSampleData()}
                        labelWidth={labelWidth}
                        firstRow={index === 0}
                    />
                ))}
            </Grid>
            <Box w={`${containerWidth}px`} h={"15px"} bg={"contentBackground"} zIndex={6} position="relative" bottom={0} />
        </Box>
    )
}
