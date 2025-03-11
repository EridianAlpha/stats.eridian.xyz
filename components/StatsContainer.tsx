import { Grid, Box, Text } from "@chakra-ui/react"

const data = Array.from({ length: 20 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return {
        date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        formattedDate: `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear().toString().slice(-2)}`,
        value: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 1000),
    }
}).reverse()

const DateLabel = ({ item, index }: { item: (typeof data)[number]; index: number }) => (
    <Box
        key={`date-${item.date}`}
        gridColumn={index + 2}
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        m={4}
        fontFamily={"monospace"}
    >
        <Box position="absolute" bg="pageBackground" px={2} py={"2px"} borderRadius={"full"} zIndex={2} /* border={"2px solid white"} */>
            <Text fontSize="sm" fontWeight="bold" whiteSpace="nowrap">
                {item.formattedDate}
            </Text>
        </Box>
        {/* Vertical line behind */}
        <Box
            position="absolute"
            top="100%"
            left="50%"
            transform="translateX(-50%)"
            h="100vh"
            border="3px solid"
            borderColor="pageBackground"
            zIndex={1}
        />
    </Box>
)

export default function StatsContainer() {
    return (
        <Grid
            templateColumns={`repeat(21, 1fr)`}
            bg={"contentBackground"}
            py={3}
            pl={5}
            pr={8}
            borderRadius={"20px"}
            gap={"4px"}
            position="relative"
            overflow="hidden"
        >
            {/* Empty first column for alignment */}
            <Box />

            {/* First row: Odd index dates */}
            {data.map((item, index) =>
                index % 2 === 0 ? <DateLabel key={item.date} item={item} index={index} /> : <Box key={`empty-${item.date}`} />,
            )}

            {/* Empty first column for alignment */}
            <Box />

            {/* Second row: Even index dates */}
            {data.map((item, index) =>
                index % 2 !== 0 ? <DateLabel key={item.date} item={item} index={index} /> : <Box key={`empty-${item.date}`} />,
            )}

            {/* Section Header Row */}
            <Box fontWeight="bold" textAlign="left" whiteSpace="nowrap" pr={"30px"} color={"blue"}>
                Websites
            </Box>

            {/* Empty header boxes */}
            {data.map((item, index) => (
                <Box key={`header-empty-${index}`} />
            ))}

            {/* First column for name label */}
            <Box fontWeight="bold" textAlign="center" pr={"30px"} whiteSpace="nowrap">
                eridian.xyz 👀
            </Box>

            {/* Third row: Data boxes */}
            {data.map((item) => (
                <Box key={item.date} bg={item.value === 0 ? "gray" : "green"} borderRadius={"8px"} textAlign="center" position="relative" zIndex={2}>
                    <Text fontFamily={"monospace"} fontWeight={"bold"}>
                        {item.value === 0 ? "" : item.value}
                    </Text>
                </Box>
            ))}
        </Grid>
    )
}
