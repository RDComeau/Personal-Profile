import * as React from "react"
import { Button } from "@/components/ui/button"

type BlogPaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function BlogPagination({ currentPage, totalPages, onPageChange }: BlogPaginationProps) {
    if (totalPages <= 1) return null

    const pages: (number | "ellipsis")[] = []
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            pages.push(i)
        } else if (pages[pages.length - 1] !== "ellipsis") {
            pages.push("ellipsis")
        }
    }

    return (
        <nav className="flex items-center justify-center gap-1 pt-8" aria-label="Pagination">
            <Button
                variant="ghost"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>

            {pages.map((p, i) =>
                p === "ellipsis" ? (
                    <span key={`e-${i}`} className="px-2 text-sm text-muted-foreground">
                        ...
                    </span>
                ) : (
                    <Button
                        key={p}
                        variant={p === currentPage ? "default" : "ghost"}
                        size="icon"
                        className="h-8 w-8 text-sm"
                        onClick={() => onPageChange(p)}
                        aria-current={p === currentPage ? "page" : undefined}
                    >
                        {p}
                    </Button>
                )
            )}

            <Button
                variant="ghost"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </nav>
    )
}
