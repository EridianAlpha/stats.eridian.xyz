export const formatNumber = (num: number): string => {
    if (num < 1000) return num.toString()
    if (num < 10000) return (num / 1000).toFixed(1) + "k"
    if (num < 1000000) return Math.floor(num / 1000) + "k"
    return (num / 1000000).toFixed(1) + "m"
}

export const generateSampleData = () => {
    return Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const randomValue = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 2000000)
        return {
            date: date.toISOString().split("T")[0],
            formattedDate: `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`,
            value: randomValue === 0 ? "0" : formatNumber(randomValue),
        }
    })
}
