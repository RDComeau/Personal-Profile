import * as React from "react"
import { useState } from "react"
import type { ContentItem } from "@/lib/content/types"
import { organizations, categories, tags } from "@/lib/content/taxonomy"
import { getOrgCounts, getCategoryCounts, getTagCounts } from "@/lib/content/adapter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type BlogSidebarProps = {
    allContent: ContentItem[]
    activeOrg?: string
    activeCategory?: string
    activeTag?: string
    onOrgChange: (org: string | undefined) => void
    onCategoryChange: (category: string | undefined) => void
    onTagChange: (tag: string | undefined) => void
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

    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        setSubscribed(true)
    }

    return (
        <aside className="space-y-8">
            {/* Organizations */}
            <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Organizations
                </h3>
                <ul className="space-y-1">
                    {organizations.map((org) => {
                        const count = orgCounts[org.name] ?? 0
                        if (count === 0) return null
                        const isActive = activeOrg === org.slug
                        return (
                            <li key={org.slug}>
                                <button
                                    onClick={() => onOrgChange(isActive ? undefined : org.slug)}
                                    className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors
                                        ${isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className={`inline-block h-2 w-2 rounded-full ${org.colorClass.split(" ")[0]}`}/>
                                        {org.name}
                                    </span>
                                    <span className="text-xs">{count}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Categories */}
            <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Categories
                </h3>
                <ul className="space-y-1">
                    {categories.map((cat) => {
                        const count = catCounts[cat.slug] ?? 0
                        if (count === 0) return null
                        const isActive = activeCategory === cat.slug
                        return (
                            <li key={cat.slug}>
                                <button
                                    onClick={() => onCategoryChange(isActive ? undefined : cat.slug)}
                                    className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors
                                        ${isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                                >
                                    {cat.name}
                                    <span className="text-xs">{count}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Tags */}
            <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => {
                        const count = tagCounts[tag.slug] ?? 0
                        if (count === 0) return null
                        const isActive = activeTag === tag.slug
                        return (
                            <button
                                key={tag.slug}
                                onClick={() => onTagChange(isActive ? undefined : tag.slug)}
                                className={`rounded-full border px-2.5 py-1 text-xs transition-colors
                                    ${isActive
                                        ? "border-foreground bg-foreground text-background"
                                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"}`}
                            >
                                {tag.name}
                                <span className="ml-1 text-[10px] opacity-60">{count}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

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
