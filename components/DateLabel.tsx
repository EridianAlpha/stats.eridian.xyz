import { Dispatch, SetStateAction } from "react"
import { Box, Text, HStack } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"

interface DateLabelProps {
    date: string
    index: number
    selectedIndex: number | null
    setSelectedIndex: Dispatch<SetStateAction<number | null>>
    containerHeight: number
    hoverIndex: number | null
    setHoverIndex: Dispatch<SetStateAction<number | null>>
}

export default function DateLabel({
    date,
    index,
    selectedIndex,
    setSelectedIndex,
    containerHeight,
    hoverIndex,
    setHoverIndex,
}: DateLabelProps) {
    return (
        <Box
            key={`date-${date}`}
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={"16px"}
            fontFamily={"monospace"}
        >
            <Box
                position="absolute"
                bg="pageBackground"
                px={2}
                py={"2px"}
                borderRadius={"full"}
                border={hoverIndex == index || selectedIndex == index ? "2px solid" : "none"}
                borderColor={hoverIndex == index || selectedIndex == index ? "textColor" : "transparent"}
                cursor={"pointer"}
                onMouseEnter={() => {
                    setHoverIndex(index)
                }}
                onMouseLeave={() => {
                    setHoverIndex(null)
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    if (selectedIndex == index) {
                        setSelectedIndex(null)
                    } else {
                        setSelectedIndex(index)
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
                    {`${new Date(date).getDate()} ${new Date(date).toLocaleString("en-US", { month: "short" })}`}
                </Text>
            </Box>
            {(hoverIndex == index || selectedIndex == index) && (
                <HStack
                    gap={0}
                    position="absolute"
                    top="10px"
                    left="50%"
                    transform="translateX(-50%)"
                    h={`${containerHeight - (index % 2 === 0 ? 62 : 100)}px`}
                    w="14px"
                    zIndex={3}
                    justifyContent="space-between"
                >
                    <Box bg="textColor" minW={"2px"} h={"100%"} />
                    <Box bg="textColor" w={"2px"} h={"100%"} />
                </HStack>
            )}
            <Box
                bg="pageBackground"
                position="absolute"
                top="10px"
                left="50%"
                transform="translateX(-50%)"
                w={"10px"}
                h={`${containerHeight - (index % 2 === 0 ? 62 : 100)}px`}
                zIndex={5}
                cursor={"pointer"}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={(e) => {
                    e.stopPropagation()
                    if (selectedIndex == index) {
                        setSelectedIndex(null)
                    } else {
                        setSelectedIndex(index)
                    }
                }}
            />
        </Box>
    )
}
