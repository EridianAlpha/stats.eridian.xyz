import { Box, VStack } from "@chakra-ui/react"

import Header from "../components/Header"
import Footer from "../components/Footer"

export default async function Page() {
    return (
        <VStack minH="100vh" bg={"pageBackground"}>
            <Header />
            <Box flexGrow={1} />
            <Footer />
        </VStack>
    )
}
