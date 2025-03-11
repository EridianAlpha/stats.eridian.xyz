import { Box, Text, VStack } from "@chakra-ui/react"
import EmptyRow from "./EmptyRow"

interface StatsRowProps {
    title: string
    emoji: string
    data: { date: string; value: string }[]
    labelWidth: string
    firstRow?: boolean
}

export default function StatsRow({ title, emoji, data, labelWidth, firstRow = false }: StatsRowProps) {
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
