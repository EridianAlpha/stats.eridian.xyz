import { Box, VStack } from "@chakra-ui/react"

import Header from "../components/Header"
import Footer from "../components/Footer"

import ContentContainer from "../components/ContentContainer"

export default async function Page() {
    return (
        <VStack minH="100vh">
            <Header />
            <ContentContainer />
            <Box flexGrow={1} />
            <Footer />
        </VStack>
    )
}
