const path = require("path")
const fs = require("fs")
require("dotenv").config({ path: path.join(__dirname, "../.env") })

const data = require("../public/data/data.json")

function formatDate(date) {
    return date.toISOString().split("T")[0] // Converts to YYYY-MM-DD format
}

async function fetchCommitCountPerDay(owner, repo, since, until) {
    const { Octokit } = await import("@octokit/rest")
    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN,
    })

    try {
        let page = 1
        let commits
        const commitCounts = {}

        do {
            const response = await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
                owner,
                repo,
                since,
                until,
                per_page: 100, // Max per request
                page,
            })

            commits = response.data

            // Group commits by date (YYYY-MM-DD format)
            commits.forEach((commit) => {
                const commitDate = commit.commit.author.date.split("T")[0] // Extract YYYY-MM-DD
                commitCounts[commitDate] = (commitCounts[commitDate] || 0) + 1
            })

            page++
        } while (commits.length === 100) // Keep going if we hit 100 results (pagination)

        return commitCounts
    } catch (error) {
        console.error(`❌ Failed to fetch commits for ${owner}/${repo}:`, error.message)
        return {}
    }
}

async function fetchAllRepoCommits() {
    let dataModified = false
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - 30) // Get date 30 days ago
    const since = startDate.toISOString()
    const until = endDate.toISOString() // Limit up to today

    for (const repo of data.repos) {
        if (repo.owner && repo.name) {
            console.log(`\nFetching daily commit data for ${repo.owner}/${repo.name}...`)
            const commitCounts = await fetchCommitCountPerDay(repo.owner, repo.name, since, until)

            if (Object.keys(commitCounts).length > 0) {
                if (!repo.data) {
                    repo.data = []
                }

                // Update repo data with daily commit counts
                for (const [date, count] of Object.entries(commitCounts)) {
                    const newEntry = { date, value: count }

                    // Create a map of existing data for easy lookup
                    const existingDataMap = new Map(repo.data.map((item) => [item.date, item]))

                    // Update or add new entry
                    existingDataMap.set(newEntry.date, newEntry)

                    // Convert map back to array and sort by date (newest first)
                    repo.data = Array.from(existingDataMap.values()).sort((a, b) => b.date.localeCompare(a.date))
                }

                console.log(repo.data)
                dataModified = true
            }
        }
    }

    if (dataModified) {
        const dataPath = path.join(__dirname, "../public/data/data.json")
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4), "utf8")
        console.log("\n✅ Successfully updated data.json with new daily commit data")
    }
}

fetchAllRepoCommits()
