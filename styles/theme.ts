import { createSystem, defaultConfig } from "@chakra-ui/react"

export const customConfig = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                blue: { value: "#36A2EB" },
                red: { value: "#EC420C" },
                gold: { value: "#e7c60d" },
            },
        },
        semanticTokens: {
            colors: {
                pageBackground: {
                    value: { _light: "#FFFFFF", _dark: "#131827" },
                },
            },
        },
    },
    globalCss: {
        "html, body": {
            backgroundColor: "{colors.pageBackground}",
        },
    },
})
