import * as React from "react"
import type { ContentItem } from "@/lib/content"

const PodcastIcon = () => (
    <svg
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            d="M8.801 6.449a3.199 3.199 0 1 1 6.398 0v4.95a3.199 3.199 0 0 1-6.398 0zM12 18.181a6.78 6.78 0 0 1-6.779-6.779M12 18.182a6.78 6.78 0 0 0 6.779-6.78M12 18.182v2.568"/>
    </svg>
)

export function LatestPodcasts({ tinted = false, items = [] }: { tinted?: boolean; items?: ContentItem[] }) {
    return (
        <section className={`mx-auto max-w-5xl px-4 py-12 ${tinted ? "bg-muted/40" : ""}`}>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Latest Podcasts
                </h2>
                <a
                    href="/blog?type=podcast"
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Listen to all
                </a>
            </div>

            <div className="flex flex-col gap-3">
                {items.map((podcast) => (
                    <PodcastListItem key={podcast.slug} podcast={podcast}/>
                ))}
            </div>
        </section>
    )
}

function PodcastListItem({ podcast }: { podcast: ContentItem }) {
    return (
        <article
            className="group relative flex items-start rounded-xl p-2.5 transition-transform duration-200
                       hover:-translate-y-1.5 hover:bg-accent focus-within:shadow-md"
            role="article"
        >
            <a
                className="absolute inset-0 z-10"
                href={`/blog/${podcast.slug}`}
                aria-label={podcast.title}
            />

            <div className="absolute top-2 left-3 z-20 flex gap-2 text-[10px] font-medium">
                <span className="flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-violet-800">
                    <PodcastIcon/>
                    Podcast
                </span>
            </div>

            <div className="flex-none w-24 h-16 mr-3 rounded-[10px] overflow-hidden">
                <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-full object-cover rounded-[8px] transition-transform duration-300
                               group-hover:scale-105 shadow-sm
                               group-hover:shadow-lg"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold leading-snug group-hover:text-foreground truncate">
                    {podcast.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {podcast.excerpt}
                </p>

                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <time dateTime={podcast.date}>{podcast.displayDate}</time>
                    {podcast.duration && (
                        <>
                            <span>·</span>
                            <span>{podcast.duration}</span>
                        </>
                    )}
                </div>

                <hr className="border-t border-border mt-3"/>
            </div>
        </article>
    )
}
