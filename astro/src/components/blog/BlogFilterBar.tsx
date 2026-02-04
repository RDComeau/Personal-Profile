import * as React from "react"
import type { Medium, BlogFilters } from "@/lib/content/types"
import { categories, tags, organizations } from "@/lib/content/taxonomy"
import { cn } from "@/lib/utils"

type MediumTab = { key: Medium | undefined; label: string }

const mediumTabs: MediumTab[] = [
    { key: undefined, label: "All" },
    { key: "article", label: "Articles" },
    { key: "podcast", label: "Podcasts" },
    { key: "reading", label: "Book Notes" },
    { key: "project", label: "Projects" },
]

type BlogFilterBarProps = {
    filters: BlogFilters
    totalItems: number
    onTypeChange: (type: Medium | undefined) => void
    onRemoveFilter: (key: keyof BlogFilters) => void
    onClearAll: () => void
}

function chipLabel(key: string, value: string): string {
    if (key === "org") {
        return organizations.find((o) => o.slug === value)?.name ?? value
    }
    if (key === "category") {
        return categories.find((c) => c.slug === value)?.name ?? value
    }
    if (key === "tag") {
        return tags.find((t) => t.slug === value)?.name ?? value
    }
    return value
}

export function BlogFilterBar({ filters, totalItems, onTypeChange, onRemoveFilter, onClearAll }: BlogFilterBarProps) {
    const activeChips = (["org", "category", "tag"] as const).filter((k) => filters[k])
    const hasActiveFilters = activeChips.length > 0

    return (
        <div className="space-y-3">
            {/* Medium tabs */}
            <div className="flex flex-wrap items-center gap-1">
                {mediumTabs.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => onTypeChange(tab.key)}
                        className={cn(
                            "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                            filters.type === tab.key
                                ? "bg-foreground text-background"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}

                <span className="ml-auto text-xs text-muted-foreground">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
            </div>

            {/* Active filter chips */}
            {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-1.5">
                    {activeChips.map((key) => (
                        <button
                            key={key}
                            onClick={() => onRemoveFilter(key)}
                            className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium
                                       text-foreground hover:bg-muted/70 transition-colors"
                        >
                            <span className="capitalize text-muted-foreground">{key}:</span>
                            {chipLabel(key, filters[key]!)}
                            <svg
                                className="ml-0.5 h-3 w-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18 6 6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    ))}
                    <button
                        onClick={onClearAll}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Clear all
                    </button>
                </div>
            )}
        </div>
    )
}
