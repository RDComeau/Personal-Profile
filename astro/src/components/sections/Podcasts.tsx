import * as React from "react"
type Podcast = {
    slug: string
    title: string
    excerpt: string
    date: string
    displayDate: string
    image: string
}

const podcasts: Podcast[] = [
    {
        slug: "why-clean-code-still-matters-most",
        title: "Why Clean Code Still Matters Most",
        excerpt:
            "Clean code isn't outdated—it's what keeps teams moving forward.",
        date: "2025-11-10",
        displayDate: "November 10, 2025",
        image: "/images/podcasts/why-clean-code-still-matters-most.png",
    },
    {
        slug: "building-smarter-tools-for-daily-workflows",
        title: "Building Smarter Tools for Daily Workflows",
        excerpt:
            "Small tools can drastically improve how we work every day.",
        date: "2025-11-05",
        displayDate: "November 05, 2025",
        image: "/images/podcasts/building-smarter-tools-for-daily-workflows.png",
    },
    {
        slug: "what-makes-a-framework-truly-powerful",
        title: "What Makes a Framework Truly Powerful",
        excerpt:
            "A powerful framework changes how you think, not just what you build.",
        date: "2025-10-30",
        displayDate: "October 30, 2025",
        image: "/images/podcasts/what-makes-a-framework-truly-powerful.png",
    },
]

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
        <path d="M8.801 6.449a3.199 3.199 0 1 1 6.398 0v4.95a3.199 3.199 0 0 1-6.398 0zM12 18.181a6.78 6.78 0 0 1-6.779-6.779M12 18.182a6.78 6.78 0 0 0 6.779-6.78M12 18.182v2.568" />
    </svg>
)

export function LatestPodcasts() {
    return (
        <section className="mx-auto max-w-5xl px-4 py-12">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Latest Podcasts
                </h2>
                <a
                    href="/podcasts"
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Listen to all
                </a>
            </div>

            <div className="flex flex-col gap-3">
                {podcasts.map((podcast) => (
                    <PodcastListItem key={podcast.slug} podcast={podcast} />
                ))}
            </div>
        </section>
    )
}

function PodcastListItem({ podcast }: { podcast: Podcast }) {
    return (
        <article
            className="group relative flex items-start rounded-xl p-2.5 transition-transform duration-200
                       hover:-translate-y-1.5 hover:bg-accent focus-within:shadow-md"
            role="article"
        >
            <a
                className="absolute inset-0 z-10"
                href={`/podcasts/${podcast.slug}`}
                aria-label={podcast.title}
            />

            {/* Podcast badge */}
            <div className="absolute top-2 left-3 z-20 flex gap-2 text-[10px] font-medium">
                <span className="flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-violet-800">
                    <PodcastIcon />
                    Podcast
                </span>
            </div>

            {/* Thumbnail */}
            <div className="flex-none w-24 h-16 mr-3 rounded-[10px] overflow-hidden">
                <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-full object-cover rounded-[8px] transition-transform duration-300
                               group-hover:scale-105 shadow-sm
                               group-hover:shadow-lg"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold leading-snug group-hover:text-foreground truncate">
                    {podcast.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {podcast.excerpt}
                </p>

                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <time dateTime={podcast.date}>{podcast.displayDate}</time>
                </div>

                <hr className="border-t border-border mt-3" />
            </div>
        </article>
    )
}
