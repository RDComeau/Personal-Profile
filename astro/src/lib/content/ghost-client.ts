export type GhostTag = {
    id: string
    name: string
    slug: string
    visibility: "public" | "internal"
}

export type GhostAuthor = {
    id: string
    name: string
    slug: string
    profile_image: string | null
}

export type GhostPost = {
    id: string
    uuid: string
    title: string
    slug: string
    html: string | null
    excerpt: string
    custom_excerpt: string | null
    feature_image: string | null
    feature_image_alt: string | null
    featured: boolean
    visibility: string
    published_at: string
    created_at: string
    updated_at: string
    reading_time: number
    canonical_url: string | null
    tags?: GhostTag[]
    authors?: GhostAuthor[]
    meta_title: string | null
    meta_description: string | null
    og_title: string | null
    og_description: string | null
    og_image: string | null
}

type GhostApiResponse = {
    posts: GhostPost[]
    meta: {
        pagination: {
            page: number
            limit: number
            pages: number
            total: number
            next: number | null
            prev: number | null
        }
    }
}

function getEnv() {
    const url = import.meta.env.GHOST_URL
    const key = import.meta.env.GHOST_CONTENT_API_KEY

    if (!url || !key) {
        throw new Error(
            "Missing Ghost CMS environment variables. " +
            "Set GHOST_URL and GHOST_CONTENT_API_KEY in astro/.env " +
            "(see astro/.env.example)"
        )
    }

    return { url: url.replace(/\/$/, ""), key }
}

export async function fetchAllGhostPosts(): Promise<GhostPost[]> {
    const { url, key } = getEnv()
    const endpoint = `${url}/ghost/api/content/posts/?key=${key}&include=tags,authors&limit=all`

    const response = await fetch(endpoint)

    if (!response.ok) {
        throw new Error(
            `Ghost API error: ${response.status} ${response.statusText} — ${endpoint}`
        )
    }

    const data: GhostApiResponse = await response.json()
    return data.posts
}
