"use client"

import { ChakraProvider } from "@chakra-ui/react"
import { ColorModeProvider, type ColorModeProviderProps } from "../components/color-mode/ColorModeProvider"

import { customConfig } from "../styles/theme"

export function Provider(props: ColorModeProviderProps) {
    return (
        <ChakraProvider value={customConfig}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    )
}
