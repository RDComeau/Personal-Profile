export type Medium = "article" | "podcast" | "reading" | "project"

export type ContentItem = {
    slug: string
    title: string
    excerpt: string
    date: string
    displayDate: string
    image: string
    medium: Medium

    // Article-specific
    readingTime?: string
    featured?: boolean
    memberOnly?: boolean
    paid?: boolean

    // Reading-specific
    author?: string

    // Project-specific
    organization?: string
    technologies?: string[]
    status?: "complete" | "in-progress" | "archived"

    // Podcast-specific
    duration?: string

    // Taxonomy
    categories?: string[]
    tags?: string[]
}

export type BlogFilters = {
    type?: Medium
    org?: string
    category?: string
    tag?: string
    page?: number
}
