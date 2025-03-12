const { google } = require("googleapis")
const path = require("path")
const fs = require("fs")
require("dotenv").config({ path: path.join(__dirname, "../.env") })

const data = require("../public/data/data.json")

const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_ANALYTICS_SERVICE_ACCOUNT_KEY_BASE64, "base64").toString("utf-8"),
)

// Authenticate using the service account
const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
})

function formatDate(dateString) {
    return dateString.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
}

async function fetchSiteViews(GA4_PROPERTY_ID, websiteTitle) {
    try {
        const analyticsData = google.analyticsdata({ version: "v1beta", auth })

        const response = await analyticsData.properties.runReport({
            property: `properties/${GA4_PROPERTY_ID}`,
            requestBody: {
                dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
                metrics: [{ name: "screenPageViews" }],
                dimensions: [{ name: "date" }],
            },
        })

        // Transform API response into an array of objects with formatted dates
        const pageViews =
            response.data.rows?.map((row) => ({
                date: formatDate(row.dimensionValues[0].value),
                value: parseInt(row.metricValues[0].value, 10),
            })) || []

        console.log(`🔹 Page Views Data for ${websiteTitle}:`)
        console.log(pageViews)
        return pageViews
    } catch (error) {
        console.error(`❌ Failed to fetch analytics data for ${websiteTitle}:`, error)
        return []
    }
}

async function fetchAllSiteViews() {
    let dataModified = false

    for (const website of data.websites) {
        if (website.GA4_PROPERTY_ID) {
            console.log(`\nFetching data for ${website.title.text}...`)
            const pageViews = await fetchSiteViews(website.GA4_PROPERTY_ID, website.title.text)

            if (pageViews.length > 0) {
                // Create a map of existing data for easy lookup
                const existingDataMap = new Map(website.data.map((item) => [item.date, item]))

                // Update existing data with new values
                pageViews.forEach((newData) => {
                    existingDataMap.set(newData.date, newData)
                })

                // Convert map back to array and sort by date (newest first)
                website.data = Array.from(existingDataMap.values()).sort((a, b) => {
                    const dateA = a.date.replace(/-/g, "")
                    const dateB = b.date.replace(/-/g, "")
                    return dateB - dateA
                })

                dataModified = true
            }
        }
    }

    if (dataModified) {
        // Write the updated data back to the file
        const dataPath = path.join(__dirname, "../public/data/data.json")
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4), "utf8")
        console.log("\n✅ Successfully updated data.json with new analytics data")
    }
}

fetchAllSiteViews()
