import { Grid, Box, Text } from "@chakra-ui/react"

// Generate example data for the past 30 days
const data = Array.from({ length: 20 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return {
        date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        formattedDate: `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })} ${date.getFullYear().toString().slice(-2)}`,
        value: Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 1000), // 50% chance of being 0
    }
}).reverse()

export default function StatsContainer() {
    return (
        <Grid templateColumns={`repeat(21, 1)`} bg={"pageBackground"} py={3} px={3} borderRadius={"10px"} gap={"4px"}>
            {/* Empty first column for alignment */}
            <Box />
            {/* First row: Odd index dates */}
            {data.map((item, index) =>
                index % 2 === 0 ? (
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
                        <Box position="absolute" bg="blue" px={2} py={"2px"} borderRadius={"full"}>
                            <Text fontSize="xs" fontWeight="bold" whiteSpace="nowrap">
                                {item.formattedDate}
                            </Text>
                        </Box>
                    </Box>
                ) : (
                    <Box key={`date-${item.date}`} />
                ),
            )}
            {/* Empty first column for alignment */}
            <Box />
            {/* Second row: Even index dates */}
            {data.map((item, index) =>
                index % 2 !== 0 ? (
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
                        <Box position="absolute" bg="blue" px={2} py={"2px"} borderRadius={"full"}>
                            <Text fontSize="xs" fontWeight="bold" whiteSpace="nowrap">
                                {item.formattedDate}
                            </Text>
                        </Box>
                    </Box>
                ) : (
                    <Box key={`date-${item.date}`} />
                ),
            )}
            {/* First column for name label */}
            <Box fontWeight="bold" textAlign="center" gridRow={3} pr={"30px"}>
                eridian.xyz 👀
            </Box>
            {/* Third row: Data boxes */}
            {data.map((item) => (
                <Box key={item.date} p={1} bg={item.value == 0 ? "gray" : "green"} borderRadius={"full"} h={"25px"} w={"50px"} textAlign="center">
                    <Text fontFamily={"monospace"} fontWeight={"bold"}>
                        {item.value == 0 ? "" : item.value}
                    </Text>
                </Box>
            ))}
        </Grid>
    )
}
