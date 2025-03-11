import { VStack } from "@chakra-ui/react"

import StatsContainer from "./StatsContainer"

export default function ContentContainer() {
    return (
        <VStack alignItems={"center"} gap={5} w={"100%"} maxW="1400px" justifyContent={"center"} alignItems={"center"} py={10} borderRadius={"20px"}>
            <StatsContainer />
        </VStack>
    )
}
