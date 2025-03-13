import { VStack, Text } from "@chakra-ui/react"

export default function HeadingCell({ children }: { children: React.ReactNode }) {
    return (
        <VStack
            fontWeight="bold"
            textAlign="left"
            whiteSpace="nowrap"
            color={"blue"}
            fontSize={"xl"}
            position="sticky"
            left={0}
            bg={"contentBackground"}
            zIndex={10}
            px={5}
            justifyContent="end"
            alignItems="start"
            cursor="default"
            mb={"-4px"}
        >
            <Text lineHeight="27px" bg={"pageBackground"} h={"27px"} px={2} borderRadius={"full"}>
                {children}
            </Text>
        </VStack>
    )
}
