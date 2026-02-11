import type { GhostPost } from "./ghost-client"
import type { ContentItem, Medium } from "./types"
import { getOrgBySlug } from "./taxonomy"

const VALID_MEDIUMS: Medium[] = ["article", "podcast", "reading", "project"]
const VALID_STATUSES: ContentItem["status"][] = ["complete", "in-progress", "archived"]

function formatDate(isoString: string): string {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    })
}

function parseTags(tags: GhostPost["tags"]) {
    let medium: Medium = "article"
    let organization: string | undefined
    const categories: string[] = []
    const contentTags: string[] = []
    let project: string | undefined
    let status: ContentItem["status"] | undefined

    for (const tag of tags ?? []) {
        const name = tag.name

        if (name.startsWith("#medium-")) {
            const value = name.slice("#medium-".length) as Medium
            if (VALID_MEDIUMS.includes(value)) {
                medium = value
            }
        } else if (name.startsWith("#org-")) {
            const slug = name.slice("#org-".length)
            const org = getOrgBySlug(slug)
            organization = org?.name ?? slug
        } else if (name.startsWith("#cat-")) {
            categories.push(name.slice("#cat-".length))
        } else if (name.startsWith("#project-")) {
            project = name.slice("#project-".length)
        } else if (name.startsWith("#status-")) {
            const value = name.slice("#status-".length) as NonNullable<ContentItem["status"]>
            if (VALID_STATUSES.includes(value)) {
                status = value
            }
        } else if (tag.visibility === "public") {
            contentTags.push(tag.name)
        }
    }

    return { medium, organization, categories, tags: contentTags, project, status }
}

export function normalizeGhostPost(post: GhostPost): ContentItem {
    const parsed = parseTags(post.tags)

    return {
        slug: post.slug,
        title: post.title,
        excerpt: post.custom_excerpt ?? post.excerpt,
        date: post.published_at,
        displayDate: formatDate(post.published_at),
        image: post.feature_image ?? "",
        medium: parsed.medium,

        // Article-specific
        readingTime: post.reading_time > 0 ? `${post.reading_time} min` : undefined,
        featured: post.featured || undefined,

        // Reading-specific — use primary author name
        author: parsed.medium === "reading"
            ? (post.authors?.[0]?.name ?? undefined)
            : undefined,

        // Project-specific
        organization: parsed.organization,
        technologies: parsed.medium === "project" ? parsed.tags : undefined,
        status: parsed.status,

        // Podcast-specific — use meta_description for duration
        duration: parsed.medium === "podcast"
            ? (post.meta_description ?? undefined)
            : undefined,

        // Taxonomy
        categories: parsed.categories.length > 0 ? parsed.categories : undefined,
        tags: parsed.tags.length > 0 ? parsed.tags : undefined,

        // Ghost CMS fields
        htmlContent: post.html ?? undefined,
        canonicalUrl: post.canonical_url ?? undefined,
        project: parsed.project,
    }
}

export function normalizeGhostPosts(posts: GhostPost[]): ContentItem[] {
    return posts.map(normalizeGhostPost)
}
