import { HStack, VStack, IconButton, Image, Button, Text, Box } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord, faGithub, faTelegram, faXTwitter, IconDefinition } from "@fortawesome/free-brands-svg-icons"
import { faBook, faGlobe } from "@fortawesome/free-solid-svg-icons"

import { ColorModeToggle } from "../components/color-mode/ColorModeToggle"

import Link from "next/link"

const socialLinks = [
    { href: "https://eridian.xyz", label: "Eridian.xyz", icon: faGlobe },
    { href: "https://docs.eridian.xyz", label: "Eridian Docs", icon: faBook },
    { href: "https://github.com/EridianAlpha", label: "Eridian GitHub", icon: faGithub },
    { href: "https://discordapp.com/users/844144351315755009", label: "Eridian Discord", icon: faDiscord },
    { href: "https://t.me/eridianalpha", label: "Eridian Telegram", icon: faTelegram },
    { href: "https://x.com/EridianAlpha", label: "Eridian X", icon: faXTwitter },
]

const IconLinkButton = ({ href, label, icon }: { href: string; label: string; icon: IconDefinition }) => {
    return (
        <Link href={href} target="_blank">
            <HStack
                color={"textColor"}
                bg={"contentBackground"}
                _hover={{
                    bg: "contentBackgroundHover",
                }}
                borderRadius="full"
                aria-label={label}
                boxSize={"40px"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <FontAwesomeIcon icon={icon} size={"lg"} />
            </HStack>
        </Link>
    )
}

export default function Header({}) {
    return (
        <HStack
            bg={"pageBackground"}
            w="100%"
            maxW="1400px"
            h={"fit-content"}
            pt={4}
            pb={2}
            justifyContent={"space-between"}
            alignItems={"start"}
            px={3}
        >
            <HStack gap={3}>
                <Link href={process.env.NEXT_PUBLIC_SITE_URL || "/"}>
                    <Text mt={"-5px"} fontSize={"3xl"}>
                        📊
                    </Text>
                </Link>
                <Text minW="80px" fontWeight="bold" fontSize="xl" cursor={"default"} whiteSpace={"nowrap"}>
                    {process.env.NEXT_PUBLIC_SITE_NAME}
                </Text>
            </HStack>
            <HStack gap={{ base: 2, md: 6 }} alignItems={"top"}>
                <HStack direction="row" wrap="wrap" gap={2} justifyContent="right" pr={{ base: 0, md: 2 }}>
                    {socialLinks.map((link, index) => (
                        <IconLinkButton key={index} {...link} />
                    ))}
                </HStack>
                <ColorModeToggle />
            </HStack>
        </HStack>
    )
}
