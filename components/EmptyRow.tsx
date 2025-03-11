import { Dispatch, SetStateAction } from "react"
import { Box, Text } from "@chakra-ui/react"

interface EmptyRowProps {
    count: number
    labelWidth: string
    firstRow?: boolean
    sectionEnd?: boolean
    height?: string
    selectedIndex?: number | null
    setSelectedIndex?: Dispatch<SetStateAction<number | null>>
    hoverIndex?: number | null
    setHoverIndex?: Dispatch<SetStateAction<number | null>>
}

export default function EmptyRow({
    count,
    labelWidth,
    firstRow = false,
    sectionEnd = false,
    height,
    selectedIndex = null,
    setSelectedIndex = () => {},
    hoverIndex = null,
    setHoverIndex = () => {},
}: EmptyRowProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => {
                if (index === 0 || index === 1) {
                    return (
                        <Box
                            key={`header-empty-${index}`}
                            h={height}
                            position="sticky"
                            left={index === 0 ? 0 : labelWidth}
                            bg="contentBackground"
                            zIndex={6}
                            borderTopRightRadius={index === 1 && firstRow ? "10px" : "0px"}
                        />
                    )
                } else {
                    if (sectionEnd) {
                        return (
                            <Box key={`header-empty-${index}`} h="12px" position="relative" onClick={() => setSelectedIndex(index)}>
                                <Box
                                    position="absolute"
                                    top="0"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                    w="14px"
                                    h="18px"
                                    borderRadius="full"
                                    bg="blueDark"
                                    border={
                                        (selectedIndex !== null && selectedIndex + 2 === index) || (hoverIndex !== null && hoverIndex + 2 === index)
                                            ? "2px solid"
                                            : "none"
                                    }
                                />
                            </Box>
                        )
                    } else {
                        return <Box key={`header-empty-${index}`} h="12px" position="relative" bg="none" />
                    }
                }
            })}
        </>
    )
}
