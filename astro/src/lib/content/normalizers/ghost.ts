import type { GhostPost } from "../ghost-client"
import type { GhostConnection } from "../sources"
import type { ContentItem, Medium } from "../types"
import { getOrgBySlug } from "../taxonomy"
import { formatDate } from "./utils"

const VALID_MEDIUMS: Medium[] = ["article", "podcast", "reading", "project"]
const VALID_STATUSES: ContentItem["status"][] = ["complete", "in-progress", "archived"]

function parseTags(tags: GhostPost["tags"]) {
    let medium: Medium | undefined
    let orgSlug: string | undefined
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
            orgSlug = name.slice("#org-".length)
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

    return { medium, orgSlug, categories, tags: contentTags, project, status }
}

function normalizeGhostPost(post: GhostPost, connection: GhostConnection): ContentItem {
    const parsed = parseTags(post.tags)

    const effectiveOrgSlug = parsed.orgSlug ?? connection.orgSlug
    const org = getOrgBySlug(effectiveOrgSlug)
    const organization = org?.name ?? effectiveOrgSlug

    const medium = parsed.medium ?? connection.defaultMedium ?? "article"

    return {
        slug: post.slug,
        title: post.title,
        excerpt: post.custom_excerpt ?? post.excerpt,
        date: post.published_at,
        displayDate: formatDate(post.published_at),
        image: post.feature_image ?? "",
        medium,

        readingTime: post.reading_time > 0 ? `${post.reading_time} min` : undefined,
        featured: post.featured || undefined,

        author: medium === "reading"
            ? (post.authors?.[0]?.name ?? undefined)
            : undefined,

        organization,
        technologies: medium === "project" ? parsed.tags : undefined,
        status: parsed.status,

        duration: medium === "podcast"
            ? (post.meta_description ?? undefined)
            : undefined,

        categories: parsed.categories.length > 0
            ? parsed.categories
            : (connection.defaultCategories ?? undefined),
        tags: parsed.tags.length > 0 ? parsed.tags : undefined,

        htmlContent: post.html ?? undefined,
        canonicalUrl: post.canonical_url ?? undefined,
        project: parsed.project,

        sourceId: connection.id,
        sourcePlatform: connection.platform,
    }
}

export function normalizeGhostPosts(posts: GhostPost[], connection: GhostConnection): ContentItem[] {
    return posts.map((post) => normalizeGhostPost(post, connection))
}
