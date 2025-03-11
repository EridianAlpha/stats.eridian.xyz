import { Box, Text, VStack } from "@chakra-ui/react"
import EmptyRow from "./EmptyRow"
import { Dispatch, SetStateAction } from "react"

interface StatsRowProps {
    title: string
    emoji: string
    data: { date: string; value: string }[]
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
            {data.map((item, index) => (
                <VStack
                    key={item.date}
                    bg={item.value === "0" ? "pageBackground" : "green"}
                    borderRadius="full"
                    textAlign="center"
                    position="relative"
                    justifyContent="center"
                    zIndex={5}
                    mx="5px"
                    minW="40px"
                    cursor="pointer"
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
                            {item.value === "0" ? "" : item.value}
                        </Text>
                    )}
                </VStack>
            ))}
        </>
    )
}
