"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "../components/color-mode/ColorModeProvider"

import { useState, useEffect } from "react"
import { Spinner, VStack, Text } from "@chakra-ui/react"

import { customConfig } from "../styles/theme"

export function Provider(props: ColorModeProviderProps) {
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
    }, [])

    return (
        <ChakraProvider value={customConfig}>
            {hydrated ? (
                <ColorModeProvider {...props} />
            ) : (
                <VStack minH="100vh" justifyContent={"center"} alignItems={"center"} fontWeight={"bold"}>
                    <Spinner />
                    <Text>Loading stats.eridian.xyz</Text>
                </VStack>
            )}
        </ChakraProvider>
    )
}
