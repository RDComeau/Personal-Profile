import { useState, useCallback, useMemo } from "react"
import type { ContentItem, Medium, BlogFilters } from "@/lib/content/types"
import { filterContent, paginateContent } from "@/lib/content/adapter"

function parseSearchParams(): BlogFilters {
    if (typeof window === "undefined") return {}
    const params = new URLSearchParams(window.location.search)
    return {
        type: (params.get("type") as Medium) || undefined,
        org: params.get("org") || undefined,
        category: params.get("category") || undefined,
        tag: params.get("tag") || undefined,
        page: params.get("page") ? Number(params.get("page")) : undefined,
    }
}

function syncToUrl(filters: BlogFilters) {
    if (typeof window === "undefined") return
    const params = new URLSearchParams()
    if (filters.type) params.set("type", filters.type)
    if (filters.org) params.set("org", filters.org)
    if (filters.category) params.set("category", filters.category)
    if (filters.tag) params.set("tag", filters.tag)
    if (filters.page && filters.page > 1) params.set("page", String(filters.page))
    const qs = params.toString()
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    window.history.replaceState(null, "", url)
}

export function useBlogFilters(allContent: ContentItem[], itemsPerPage = 20) {
    const [filters, setFiltersState] = useState<BlogFilters>(parseSearchParams)

    const setFilters = useCallback((next: BlogFilters | ((prev: BlogFilters) => BlogFilters)) => {
        setFiltersState((prev) => {
            const resolved = typeof next === "function" ? next(prev) : next
            syncToUrl(resolved)
            return resolved
        })
    }, [])

    const setType = useCallback((type: Medium | undefined) => {
        setFilters((prev) => ({ ...prev, type, page: 1 }))
    }, [setFilters])

    const setOrg = useCallback((org: string | undefined) => {
        setFilters((prev) => ({ ...prev, org, page: 1 }))
    }, [setFilters])

    const setCategory = useCallback((category: string | undefined) => {
        setFilters((prev) => ({ ...prev, category, page: 1 }))
    }, [setFilters])

    const setTag = useCallback((tag: string | undefined) => {
        setFilters((prev) => ({ ...prev, tag, page: 1 }))
    }, [setFilters])

    const setPage = useCallback((page: number) => {
        setFilters((prev) => ({ ...prev, page }))
    }, [setFilters])

    const clearAll = useCallback(() => {
        setFilters({ page: 1 })
    }, [setFilters])

    const removeFilter = useCallback((key: keyof BlogFilters) => {
        setFilters((prev) => {
            const next = { ...prev }
            delete next[key]
            next.page = 1
            return next
        })
    }, [setFilters])

    const filtered = useMemo(() => filterContent(allContent, filters), [allContent, filters])
    const { items: paginatedItems, totalPages } = useMemo(
        () => paginateContent(filtered, filters.page ?? 1, itemsPerPage),
        [filtered, filters.page, itemsPerPage]
    )

    return {
        filters,
        filteredItems: paginatedItems,
        totalItems: filtered.length,
        totalPages,
        currentPage: filters.page ?? 1,
        setType,
        setOrg,
        setCategory,
        setTag,
        setPage,
        clearAll,
        removeFilter,
    }
}
