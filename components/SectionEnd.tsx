import { Dispatch, SetStateAction } from "react"
import { Box } from "@chakra-ui/react"

interface EmptyRowProps {
    count: number
    labelWidth: string
    height?: string
    selectedIndex?: number | null
    setSelectedIndex?: Dispatch<SetStateAction<number | null>>
    hoverIndex?: number | null
}

export default function EmptyRow({ count, labelWidth, height, selectedIndex = null, setSelectedIndex = () => {}, hoverIndex = null }: EmptyRowProps) {
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
                            bg={"contentBackground"}
                            zIndex={6}
                        />
                    )
                } else {
                    return (
                        <Box key={`header-empty-${index}`} h="12px" position="relative" onClick={() => setSelectedIndex(index)}>
                            <Box
                                position="absolute"
                                top="0"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                w={
                                    (selectedIndex !== null && selectedIndex + 2 === index) || (hoverIndex !== null && hoverIndex + 2 === index)
                                        ? "14px"
                                        : "12px"
                                }
                                h="18px"
                                borderRadius="full"
                                bg="pageBackground"
                                border={
                                    (selectedIndex !== null && selectedIndex + 2 === index) || (hoverIndex !== null && hoverIndex + 2 === index)
                                        ? "2px solid"
                                        : "none"
                                }
                            />
                        </Box>
                    )
                }
            })}
        </>
    )
}
