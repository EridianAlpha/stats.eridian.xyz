"use client"

import { useState, Dispatch, SetStateAction } from "react"
import { Grid, Box, Text, VStack, HStack } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"

const data = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return {
        date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        formattedDate: `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`,
        value: "999k", // Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 1000),
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
                // py={"2px"}
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
                            <FontAwesomeIcon icon={faCalendarDay} size={"lg"} />
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
                    h="100vh"
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
                h={"100vh"}
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

export default function StatsContainer({
    selectedDate,
    setSelectedDate,
}: {
    selectedDate: string
    setSelectedDate: Dispatch<SetStateAction<string>>
}) {
    const labelWidth = "150px"
    return (
        <Box bg={"contentBackground"} borderRadius={"20px"} position="relative" overflowX="scroll" maxWidth="100%">
            <Grid templateColumns={`repeat(${data.length + 2}, 1fr)`} pt={3} gap={"0px"} position="relative">
                {/* Empty first column for alignment */}
                <Box position="sticky" left={0} zIndex={6} bg={"contentBackground"} />
                <Box position="sticky" left={labelWidth} zIndex={3} bg={"contentBackground"} />

                {/* First row: Odd index dates */}
                {data.map((item, index) =>
                    index % 2 === 0 ? (
                        <DateLabel key={item.date} item={item} index={index} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    ) : (
                        <Box key={`empty-${item.date}`} />
                    ),
                )}
                {/* Empty first column for alignment */}
                <Box position="sticky" left={0} zIndex={6} bg={"contentBackground"} />
                <Box position="sticky" left={labelWidth} zIndex={2} bg={"contentBackground"} />

                {/* Second row: Even index dates */}
                {data.map((item, index) =>
                    index % 2 !== 0 ? (
                        <DateLabel key={item.date} item={item} index={index} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    ) : (
                        <Box key={`empty-${item.date}`} />
                    ),
                )}
                {/* Section Header Row */}
                <Box
                    fontWeight="bold"
                    textAlign="left"
                    whiteSpace="nowrap"
                    color={"blue"}
                    fontSize={"xl"}
                    position="sticky"
                    left={0}
                    bg={"contentBackground"}
                    zIndex={5}
                    // py={2}
                    px={5}
                >
                    Websites
                </Box>
                <Box position="sticky" left={labelWidth} zIndex={5} bg={"contentBackground"} borderTopRightRadius={"20px"} />

                {/* Empty header boxes */}
                {data.map((item, index) => (
                    <Box key={`header-empty-${index}`} />
                ))}
                {/* First column for name label */}
                <Box
                    fontWeight="bold"
                    whiteSpace="nowrap"
                    position="sticky"
                    left={0}
                    bg={"contentBackground"}
                    zIndex={6}
                    // py={1}
                    px={5}
                    minW={labelWidth}
                >
                    eridian.xyz
                </Box>
                <Box
                    fontWeight="bold"
                    whiteSpace="nowrap"
                    textAlign="center"
                    // w={"100%"}
                    minW={"40px"}
                    position="sticky"
                    left={labelWidth}
                    bg={"contentBackground"}
                    zIndex={6}
                    // py={1}
                >
                    👀
                </Box>

                {/* Third row: Data boxes */}
                {data.map((item) => (
                    <VStack
                        key={item.date}
                        bg={item.value === "0" ? "gray" : "green"}
                        borderRadius={"full"}
                        textAlign="center"
                        position="relative"
                        justifyContent={"center"}
                        zIndex={5}
                        mx={"5px"}
                        minW={"40px"}
                    >
                        <Text fontFamily={"monospace"} fontWeight={"bold"}>
                            {item.value === "0" ? "" : item.value}
                        </Text>
                    </VStack>
                ))}
            </Grid>
            <Box w={"100%"} h={"15px"} bg={"contentBackground"} zIndex={6} position="relative" bottom={0} />
        </Box>
    )
}
