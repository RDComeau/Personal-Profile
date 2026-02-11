import type { SourceConnection } from "./sources"
import type { ContentItem } from "./types"
import { sourceConnections } from "./sources.config"
import { fetchGhostPosts } from "./fetchers/ghost"
import { normalizeGhostPosts } from "./normalizers/ghost"

export async function fetchAllContent(): Promise<ContentItem[]> {
    const enabled = sourceConnections.filter((c) => c.enabled)
    const results = await Promise.all(enabled.map(fetchFromConnection))
    const allItems = results.flat()
    return ensureUniqueSlugs(allItems)
}

async function fetchFromConnection(connection: SourceConnection): Promise<ContentItem[]> {
    const start = Date.now()

    try {
        let items: ContentItem[]

        switch (connection.platform) {
            case "ghost": {
                const posts = await fetchGhostPosts(connection)
                items = normalizeGhostPosts(posts, connection)
                break
            }
            case "medium":
            case "substack":
            case "hashnode":
                console.warn(
                    `[aggregator] Platform "${connection.platform}" not yet implemented. Skipping ${connection.id}.`
                )
                return []
        }

        const elapsed = Date.now() - start
        console.log(`[aggregator] ${connection.id}: fetched ${items.length} items in ${elapsed}ms`)
        return items
    } catch (error) {
        console.error(`[aggregator] ${connection.id} failed:`, error)
        return []
    }
}

function ensureUniqueSlugs(items: ContentItem[]): ContentItem[] {
    const seen = new Set<string>()
    return items.map((item) => {
        if (seen.has(item.slug)) {
            return { ...item, slug: `${item.sourcePlatform}-${item.slug}` }
        }
        seen.add(item.slug)
        return item
    })
}
