import * as React from "react"
import type { ContentItem } from "@/lib/content/types"
import { BlogCard } from "./BlogCard"

export function BlogGrid({ items }: { items: ContentItem[] }) {
    if (items.length === 0) {
        return (
            <div className="py-16 text-center text-muted-foreground">
                <p className="text-lg font-medium">No content found</p>
                <p className="mt-1 text-sm">Try adjusting your filters.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {items.map((item) => (
                <BlogCard key={item.slug} item={item}/>
            ))}
        </div>
    )
}
