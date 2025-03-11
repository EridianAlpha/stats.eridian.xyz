import { Box, Text, VStack } from "@chakra-ui/react"
import EmptyRow from "./EmptyRow"
import { Dispatch, SetStateAction, useMemo } from "react"

import { formatNumber } from "../utils/statsUtils"

interface StatsRowProps {
    title: string
    emoji: string
    data: { date: string; value: number }[]
    labelWidth: string
    firstRow?: boolean
    setSelectedIndex: Dispatch<SetStateAction<number | null>>
    setHoverIndex: Dispatch<SetStateAction<number | null>>
    selectedIndex: number | null
    hoverIndex: number | null
}

export default function StatsRow({
    title,
    emoji,
    data,
    labelWidth,
    firstRow = false,
    setSelectedIndex,
    setHoverIndex,
    selectedIndex,
    hoverIndex,
}: StatsRowProps) {
    const maxValue = useMemo(() => {
        console.log(data)
        return Math.max(...data.map((item) => item.value || 0))
    }, [data])

    return (
        <>
            <EmptyRow count={data.length + 2} labelWidth={labelWidth} firstRow={firstRow} />
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
            {data.map((item, index) => {
                // const lightness = maxValue > 0 ? 45 - (item.value / maxValue) * 20 : 0
                const lightness = maxValue > 0 ? 20 + (item.value / maxValue) * 30 : 0

                return (
                    <VStack
                        key={item.date}
                        bg={item.value === 0 ? "pageBackground" : `hsl(120, 71%, ${lightness}%)`}
                        borderRadius="10px"
                        textAlign="center"
                        position="relative"
                        justifyContent="center"
                        zIndex={5}
                        mx="5px"
                        minW="40px"
                        cursor="pointer"
                        border={hoverIndex == index || selectedIndex == index ? "2px solid" : "none"}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (selectedIndex == index) {
                                setSelectedIndex(null)
                            } else {
                                setSelectedIndex(index)
                            }
                        }}
                        onMouseEnter={() => {
                            setHoverIndex(index)
                        }}
                        onMouseLeave={() => {
                            setHoverIndex(null)
                        }}
                    >
                        {selectedIndex !== null && selectedIndex != index ? (
                            <></>
                        ) : (
                            <Text fontFamily="monospace" fontWeight="bold">
                                {item.value === 0 ? "" : formatNumber(item.value)}
                            </Text>
                        )}
                    </VStack>
                )
            })}
        </>
    )
}
