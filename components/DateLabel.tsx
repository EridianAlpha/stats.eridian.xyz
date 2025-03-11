import { useState, Dispatch, SetStateAction } from "react"
import { Box, Text, HStack } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons"

interface DateLabelProps {
    item: {
        date: string
        formattedDate: string
        value: string
    }
    index: number
    selectedIndex: number | null
    setSelectedIndex: Dispatch<SetStateAction<number | null>>
    containerHeight: number
}

export default function DateLabel({ item, index, selectedIndex, setSelectedIndex, containerHeight }: DateLabelProps) {
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
                borderRadius={"full"}
                border={isHovered || selectedIndex == index ? "2px solid" : "none"}
                borderColor={isHovered || selectedIndex == index ? "textColor" : "transparent"}
                cursor={"pointer"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
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
                    {item.formattedDate}
                </Text>
            </Box>

            {(isHovered || selectedIndex == index) && (
                <HStack
                    gap={0}
                    position="absolute"
                    top="10px"
                    left="50%"
                    transform="translateX(-50%)"
                    h={`${containerHeight - (index % 2 === 0 ? 90 : 120)}px`}
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
                h={`${containerHeight - (index % 2 === 0 ? 90 : 120)}px`}
                zIndex={5}
                cursor={"pointer"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
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
