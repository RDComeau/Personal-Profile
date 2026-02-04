import * as React from "react"
import type { ContentItem } from "@/lib/content/types"
import { getOrgColorClass } from "@/lib/content/taxonomy"

const mediumBadges: Record<string, { label: string; className: string }> = {
    article: { label: "Article", className: "bg-sky-100 text-sky-800" },
    podcast: { label: "Podcast", className: "bg-violet-100 text-violet-800" },
    reading: { label: "Reading", className: "bg-teal-100 text-teal-800" },
    project: { label: "Project", className: "bg-orange-100 text-orange-800" },
}

const statusDots: Record<string, string> = {
    complete: "bg-emerald-500",
    "in-progress": "bg-amber-500",
    archived: "bg-muted-foreground",
}

const statusLabels: Record<string, string> = {
    complete: "Complete",
    "in-progress": "In Progress",
    archived: "Archived",
}

export function BlogCard({ item }: { item: ContentItem }) {
    const badge = mediumBadges[item.medium]
    const orgClass = item.organization ? getOrgColorClass(item.organization) : null

    return (
        <article
            className="group relative flex flex-col rounded-xl overflow-hidden border border-border
                       transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
            <a
                className="absolute inset-0 z-10"
                href={`/blog/${item.slug}`}
                aria-label={item.title}
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1.5 text-[10px] font-medium">
                <span className={`rounded-full px-2 py-0.5 ${badge.className}`}>
                    {badge.label}
                </span>
                {orgClass && (
                    <span className={`rounded-full px-2 py-0.5 ${orgClass}`}>
                        {item.organization}
                    </span>
                )}
            </div>

            {/* Image */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300
                               group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                {item.author && (
                    <span className="text-xs font-medium text-muted-foreground">{item.author}</span>
                )}

                <h3 className="mt-1 text-base font-semibold leading-snug group-hover:text-foreground line-clamp-2">
                    {item.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {item.excerpt}
                </p>

                <div className="mt-auto pt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <time dateTime={item.date}>{item.displayDate}</time>
                    {item.readingTime && (
                        <>
                            <span>·</span>
                            <span>{item.readingTime}</span>
                        </>
                    )}
                    {item.duration && (
                        <>
                            <span>·</span>
                            <span>{item.duration}</span>
                        </>
                    )}
                    {item.status && (
                        <>
                            <span>·</span>
                            <span className={`inline-block h-1.5 w-1.5 rounded-full ${statusDots[item.status]}`}/>
                            <span>{statusLabels[item.status]}</span>
                        </>
                    )}
                </div>

                {item.technologies && item.technologies.length > 0 && (
                    <div className="relative z-20 mt-2 flex flex-wrap gap-1">
                        {item.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    )
}
