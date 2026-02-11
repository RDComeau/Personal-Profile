import type { GhostConnection } from "../sources"
import type { GhostPost } from "../ghost-client"

export type { GhostPost }

export async function fetchGhostPosts(connection: GhostConnection): Promise<GhostPost[]> {
    const url = import.meta.env[connection.urlEnvVar]
    const key = import.meta.env[connection.apiKeyEnvVar]

    if (!url || !key) {
        console.warn(
            `[${connection.id}] Missing env vars: ${connection.urlEnvVar} / ${connection.apiKeyEnvVar}. Skipping.`
        )
        return []
    }

    const endpoint = `${url.replace(/\/$/, "")}/ghost/api/content/posts/?key=${key}&include=tags,authors&limit=all`

    const response = await fetch(endpoint)

    if (!response.ok) {
        console.error(
            `[${connection.id}] Ghost API error: ${response.status} ${response.statusText}`
        )
        return []
    }

    const data = await response.json()
    return data.posts
}
