import { Box } from "@chakra-ui/react"

interface EmptyRowProps {
    count: number
    labelWidth: string
    firstRow?: boolean
    height?: string
    headingRow?: boolean
}

export default function EmptyRow({ count, labelWidth, headingRow = false, firstRow = false, height }: EmptyRowProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => {
                if (headingRow && index === 0) {
                    return
                } else if (index === 0) {
                    return (
                        <Box
                            key={`header-empty-${index}`}
                            h={height}
                            position="sticky"
                            left={0}
                            bg={"contentBackground"}
                            zIndex={6}
                            borderTopLeftRadius={index === 0 && firstRow ? "10px" : "0px"}
                        />
                    )
                } else if (index === 1) {
                    return (
                        <Box
                            key={`header-empty-${index}`}
                            h={height}
                            position="sticky"
                            left={labelWidth}
                            bg={"contentBackground"}
                            zIndex={6}
                            borderTopRightRadius={index === 1 && firstRow ? "10px" : "0px"}
                        />
                    )
                } else {
                    return <Box key={`header-empty-${index}`} h="12px" position="relative" bg="none" />
                }
            })}
        </>
    )
}
