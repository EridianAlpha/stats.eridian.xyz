"use client"

import { useState, Dispatch, SetStateAction } from "react"
import { Grid, Box, Text, VStack, HStack } from "@chakra-ui/react"

const data = Array.from({ length: 20 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return {
        date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        formattedDate: `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear().toString().slice(-2)}`,
        value: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 1000),
    }
})

function DateLabel({
    item,
    index,
    selectedDate,
    setSelectedDate,
}: {
    item: (typeof data)[number]
    index: number
    selectedDate: string
    setSelectedDate: Dispatch<SetStateAction<string>>
}) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Box key={`date-${item.date}`} position="relative" display="flex" justifyContent="center" alignItems="center" m={4} fontFamily={"monospace"}>
            <Box
                position="absolute"
                bg="pageBackground"
                px={2}
                py={"2px"}
                borderRadius={"full"}
                zIndex={1}
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
            >
                <Text fontSize="sm" fontWeight="bold" whiteSpace="nowrap">
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
                    h="100vh"
                    w="16px"
                    zIndex={0}
                    justifyContent="space-between"
                >
                    <Box bg="white" minW={"2px"} h={"100%"} />
                    <Box bg="white" w={"2px"} h={"100%"} />
                </HStack>
            )}

            <Box
                bg="pageBackground"
                position="absolute"
                top="10px"
                left="50%"
                transform="translateX(-50%)"
                w={"12px"}
                h={"100vh"}
                zIndex={2}
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

export default function StatsContainer() {
    const [selectedDate, setSelectedDate] = useState("")

    return (
        <Grid
            templateColumns={`repeat(22, 1fr)`}
            bg={"contentBackground"}
            py={3}
            pl={5}
            pr={8}
            borderRadius={"20px"}
            gap={"4px"}
            position="relative"
            overflow="hidden"
            onClick={() => setSelectedDate("")}
        >
            {/* Empty first column for alignment */}
            <Box />
            <Box />

            {/* First row: Odd index dates */}
            {data.map((item, index) =>
                index % 2 === 0 ? (
                    <DateLabel key={item.date} item={item} index={index} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                ) : (
                    <Box key={`empty-${item.date}`} />
                ),
            )}
            {/* Empty first column for alignment */}
            <Box />
            <Box />

            {/* Second row: Even index dates */}
            {data.map((item, index) =>
                index % 2 !== 0 ? (
                    <DateLabel key={item.date} item={item} index={index} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                ) : (
                    <Box key={`empty-${item.date}`} />
                ),
            )}
            {/* Section Header Row */}
            <Box fontWeight="bold" textAlign="left" whiteSpace="nowrap" color={"blue"}>
                Websites
            </Box>
            <Box />

            {/* Empty header boxes */}
            {data.map((item, index) => (
                <Box key={`header-empty-${index}`} />
            ))}
            {/* First column for name label */}
            <Box fontWeight="bold" textAlign="center" whiteSpace="nowrap">
                eridian.xyz
            </Box>
            <Box fontWeight="bold" whiteSpace="nowrap" textAlign="center" w={"100%"}>
                👀
            </Box>

            {/* Third row: Data boxes */}
            {data.map((item) => (
                <VStack
                    key={item.date}
                    bg={item.value === 0 ? "gray" : "green"}
                    borderRadius={"8px"}
                    textAlign="center"
                    position="relative"
                    justifyContent={"center"}
                    zIndex={2}
                >
                    <Text fontFamily={"monospace"} fontWeight={"bold"}>
                        {item.value === 0 ? "" : item.value}
                    </Text>
                </VStack>
            ))}
        </Grid>
    )
}
