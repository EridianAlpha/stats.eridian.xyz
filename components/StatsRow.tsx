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
                const lightness = maxValue > 0 ? 20 + (item.value / maxValue) * 30 : 0
                const calculatedBgColor = `hsl(120, 71%, ${lightness}%)`

                return (
                    <VStack
                        key={item.date}
                        bg={item.value === 0 ? "pageBackground" : calculatedBgColor}
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
                        {/* Border Hider Box - Same BG as VStack, covers top/bottom border */}
                        {(hoverIndex === index || selectedIndex === index) && (
                            <Box
                                position="absolute"
                                left="50%"
                                top="50%"
                                transform="translate(-50%, -50%)"
                                bg={item.value === 0 ? "pageBackground" : calculatedBgColor}
                                h="calc(100% + 4px)"
                                w="10px"
                                zIndex={6}
                            />
                        )}

                        {/* Show Text Only When Not Selected */}
                        {selectedIndex !== null && selectedIndex != index ? (
                            <></>
                        ) : (
                            <Text fontFamily="monospace" fontWeight="bold" zIndex={6}>
                                {item.value === 0 ? "" : formatNumber(item.value)}
                            </Text>
                        )}
                    </VStack>
                )
            })}
        </>
    )
}
