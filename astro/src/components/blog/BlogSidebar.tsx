import * as React from "react"
import { useState } from "react"
import type { ContentItem } from "@/lib/content/types"
import { organizations, categories } from "@/lib/content/taxonomy"
import { getOrgCounts, getCategoryCounts, getTagCounts } from "@/lib/content/adapter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ORG_LIMIT = 5
const CAT_LIMIT = 5
const TAG_LIMIT = 10

type BlogSidebarProps = {
    allContent: ContentItem[]
    activeOrg?: string
    activeCategory?: string
    activeTag?: string
    onOrgChange: (org: string | undefined) => void
    onCategoryChange: (category: string | undefined) => void
    onTagChange: (tag: string | undefined) => void
}

function sortedByCount<T extends { key: string; count: number }>(items: T[]): T[] {
    return [...items].sort((a, b) => b.count - a.count)
}

export function BlogSidebar({
    allContent,
    activeOrg,
    activeCategory,
    activeTag,
    onOrgChange,
    onCategoryChange,
    onTagChange,
}: BlogSidebarProps) {
    const orgCounts = getOrgCounts(allContent)
    const catCounts = getCategoryCounts(allContent)
    const tagCounts = getTagCounts(allContent)

    const [showAllOrgs, setShowAllOrgs] = useState(false)
    const [showAllCats, setShowAllCats] = useState(false)
    const [showAllTags, setShowAllTags] = useState(false)
    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)

    // Build org list sorted by count, filtered to those with content
    const orgItems = sortedByCount(
        organizations
            .map((org) => ({ key: org.slug, name: org.name, colorClass: org.colorClass, count: orgCounts[org.name] ?? 0 }))
            .filter((o) => o.count > 0)
    )

    // Build category list sorted by count, filtered to those with content
    const catItems = sortedByCount(
        categories
            .map((cat) => ({ key: cat.slug, name: cat.name, count: catCounts[cat.slug] ?? 0 }))
            .filter((c) => c.count > 0)
    )

    // Build tag list dynamically from content (not hardcoded taxonomy), sorted by count
    const tagItems = sortedByCount(
        Object.entries(tagCounts).map(([name, count]) => ({ key: name, name, count }))
    )

    const visibleOrgs = showAllOrgs ? orgItems : orgItems.slice(0, ORG_LIMIT)
    const visibleCats = showAllCats ? catItems : catItems.slice(0, CAT_LIMIT)
    const visibleTags = showAllTags ? tagItems : tagItems.slice(0, TAG_LIMIT)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        setSubscribed(true)
    }

    return (
        <aside className="space-y-8">
            {/* Organizations */}
            {orgItems.length > 0 && (
                <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Organizations
                    </h3>
                    <ul className="space-y-1">
                        {visibleOrgs.map((org) => {
                            const isActive = activeOrg === org.key
                            return (
                                <li key={org.key}>
                                    <button
                                        onClick={() => onOrgChange(isActive ? undefined : org.key)}
                                        className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors
                                            ${isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <span className={`inline-block h-2 w-2 rounded-full ${org.colorClass.split(" ")[0]}`}/>
                                            {org.name}
                                        </span>
                                        <span className="text-xs">{org.count}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    {orgItems.length > ORG_LIMIT && (
                        <button
                            onClick={() => setShowAllOrgs(!showAllOrgs)}
                            className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showAllOrgs ? "Show less" : `Show ${orgItems.length - ORG_LIMIT} more`}
                        </button>
                    )}
                </div>
            )}

            {/* Categories */}
            {catItems.length > 0 && (
                <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Categories
                    </h3>
                    <ul className="space-y-1">
                        {visibleCats.map((cat) => {
                            const isActive = activeCategory === cat.key
                            return (
                                <li key={cat.key}>
                                    <button
                                        onClick={() => onCategoryChange(isActive ? undefined : cat.key)}
                                        className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors
                                            ${isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                                    >
                                        {cat.name}
                                        <span className="text-xs">{cat.count}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    {catItems.length > CAT_LIMIT && (
                        <button
                            onClick={() => setShowAllCats(!showAllCats)}
                            className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showAllCats ? "Show less" : `Show ${catItems.length - CAT_LIMIT} more`}
                        </button>
                    )}
                </div>
            )}

            {/* Tags */}
            {tagItems.length > 0 && (
                <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Tags
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                        {visibleTags.map((tag) => {
                            const isActive = activeTag === tag.key
                            return (
                                <button
                                    key={tag.key}
                                    onClick={() => onTagChange(isActive ? undefined : tag.key)}
                                    className={`rounded-full border px-2.5 py-1 text-xs transition-colors
                                        ${isActive
                                            ? "border-foreground bg-foreground text-background"
                                            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
                                >
                                    {tag.name}
                                    <span className="ml-1 text-[10px] opacity-60">{tag.count}</span>
                                </button>
                            )
                        })}
                    </div>
                    {tagItems.length > TAG_LIMIT && (
                        <button
                            onClick={() => setShowAllTags(!showAllTags)}
                            className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showAllTags ? "Show less" : `Show ${tagItems.length - TAG_LIMIT} more`}
                        </button>
                    )}
                </div>
            )}

            {/* Newsletter */}
            <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <h3 className="text-sm font-semibold">Stay in the loop</h3>
                <p className="text-xs text-muted-foreground">
                    Weekly tips & updates, straight to your inbox.
                </p>
                {!subscribed ? (
                    <form onSubmit={handleSubscribe} className="space-y-2">
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="text-sm"
                        />
                        <Button type="submit" size="sm" className="w-full">
                            Subscribe
                        </Button>
                    </form>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Check your inbox to confirm.
                    </p>
                )}
            </div>
        </aside>
    )
}
