import * as React from "react"
import type { ContentItem } from "@/lib/content/types"
import { useBlogFilters } from "./useBlogFilters"
import { BlogFilterBar } from "./BlogFilterBar"
import { BlogGrid } from "./BlogGrid"
import { BlogPagination } from "./BlogPagination"
import { BlogSidebar } from "./BlogSidebar"

type BlogLayoutProps = {
    allContent: ContentItem[]
    itemsPerPage?: number
}

export function BlogLayout({ allContent, itemsPerPage = 20 }: BlogLayoutProps) {
    const {
        filters,
        filteredItems,
        totalItems,
        totalPages,
        currentPage,
        setType,
        setOrg,
        setCategory,
        setTag,
        setPage,
        clearAll,
        removeFilter,
    } = useBlogFilters(allContent, itemsPerPage)

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Blog</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Articles, podcasts, book notes, and projects.
                </p>
            </div>

            <BlogFilterBar
                filters={filters}
                totalItems={totalItems}
                onTypeChange={setType}
                onRemoveFilter={removeFilter}
                onClearAll={clearAll}
            />

            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
                <div>
                    <BlogGrid items={filteredItems}/>
                    <BlogPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>

                <div className="hidden lg:block">
                    <div className="sticky top-24">
                        <BlogSidebar
                            allContent={allContent}
                            activeOrg={filters.org}
                            activeCategory={filters.category}
                            activeTag={filters.tag}
                            onOrgChange={setOrg}
                            onCategoryChange={setCategory}
                            onTagChange={setTag}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
