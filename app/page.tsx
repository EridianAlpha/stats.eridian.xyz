import { Box, Checkbox, ClientOnly, HStack, Heading, Progress, RadioGroup, Skeleton, VStack } from "@chakra-ui/react"
import Image from "next/image"
import { ColorModeToggle } from "../components/color-mode/ColorModeToggle"

import Footer from "../components/Footer"

export default async function Page() {
    return (
        <VStack minH="100vh" bg={"pageBackground"}>
            <Box pos="absolute" top="4" right="4">
                <ColorModeToggle />
            </Box>
            <Box flexGrow={1} />
            <Footer />
        </VStack>
    )
}
