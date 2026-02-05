import type { ContentItem, Medium, BlogFilters } from "./types"
import { fetchAllGhostPosts } from "./ghost-client"
import { normalizeGhostPosts } from "./normalize"

let _contentCache: ContentItem[] | null = null

async function getContent(): Promise<ContentItem[]> {
    if (_contentCache) return _contentCache
    const posts = await fetchAllGhostPosts()
    _contentCache = normalizeGhostPosts(posts)
    return _contentCache
}

function sortByDate(items: ContentItem[]): ContentItem[] {
    return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getAllContent(): Promise<ContentItem[]> {
    const content = await getContent()
    return sortByDate(content)
}

export async function getLatestByMedium(medium: Medium, limit = 3): Promise<ContentItem[]> {
    const content = await getContent()
    return sortByDate(content.filter((item) => item.medium === medium)).slice(0, limit)
}

export async function getContentBySlug(slug: string): Promise<ContentItem | undefined> {
    const content = await getContent()
    return content.find((item) => item.slug === slug)
}

export async function getAllSlugs(): Promise<string[]> {
    const content = await getContent()
    return content.map((item) => item.slug)
}

export function filterContent(items: ContentItem[], filters: BlogFilters): ContentItem[] {
    let result = items

    if (filters.type) {
        result = result.filter((item) => item.medium === filters.type)
    }
    if (filters.org) {
        result = result.filter(
            (item) => item.organization?.toLowerCase().replace(/['\s]/g, "-").replace(/--/g, "-") === filters.org
        )
    }
    if (filters.category) {
        result = result.filter((item) => item.categories?.includes(filters.category!))
    }
    if (filters.tag) {
        result = result.filter((item) => item.tags?.includes(filters.tag!))
    }

    return result
}

export function paginateContent(
    items: ContentItem[],
    page: number,
    itemsPerPage: number
): { items: ContentItem[]; totalPages: number } {
    const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const start = (safePage - 1) * itemsPerPage
    return {
        items: items.slice(start, start + itemsPerPage),
        totalPages,
    }
}

export function getOrgCounts(items: ContentItem[]): Record<string, number> {
    const counts: Record<string, number> = {}
    for (const item of items) {
        if (item.organization) {
            counts[item.organization] = (counts[item.organization] || 0) + 1
        }
    }
    return counts
}

export function getCategoryCounts(items: ContentItem[]): Record<string, number> {
    const counts: Record<string, number> = {}
    for (const item of items) {
        for (const cat of item.categories ?? []) {
            counts[cat] = (counts[cat] || 0) + 1
        }
    }
    return counts
}

export function getTagCounts(items: ContentItem[]): Record<string, number> {
    const counts: Record<string, number> = {}
    for (const item of items) {
        for (const tag of item.tags ?? []) {
            counts[tag] = (counts[tag] || 0) + 1
        }
    }
    return counts
}
