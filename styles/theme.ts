import { createSystem, defaultConfig } from "@chakra-ui/react"

export const customConfig = createSystem(defaultConfig, {
    theme: {
        tokens: {
            colors: {
                blue: { value: "#36A2EB" },
                blueDark: { value: "#1669a1" },
                red: { value: "#EC420C" },
                gold: { value: "#e7c60d" },
            },
        },
        semanticTokens: {
            colors: {
                textColor: {
                    value: { _light: "black", _dark: "#EDEEF0" },
                },
                pageBackground: {
                    value: { _light: "#FFFFFF", _dark: "#131827" },
                },
                contentBackground: {
                    value: { _light: "#EDF2F7", _dark: "#1e2743" },
                },
                contentBackgroundHover: {
                    value: { _light: "#E2E8F0", _dark: "#2D3748" },
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
