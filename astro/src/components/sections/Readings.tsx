import * as React from "react"
type Reading = {
    slug: string
    title: string
    author: string
    excerpt: string
    date: string
    displayDate: string
    image: string
}

const readings: Reading[] = [
    {
        slug: "bloom-where-the-sparks-fall",
        title: "Bloom Where the Sparks Fall",
        author: "Nira Callaway",
        excerpt:
            "A vivid, high-energy novel about fleeting brilliance, emotional aftershocks, and the courage to rebuild in the glow of what's been shattered.",
        date: "2025-11-11",
        displayDate: "November 11, 2025",
        image: "/images/readings/bloom-where-the-sparks-fall.png",
    },
    {
        slug: "the-starglass-constellation",
        title: "The Starglass Constellation",
        author: "Elira Thornveil",
        excerpt:
            "A luminous tale of living constellations, fragile magic, and the courage it takes to rewrite the sky's forgotten stories.",
        date: "2025-11-04",
        displayDate: "November 04, 2025",
        image: "/images/readings/the-starglass-constellation.png",
    },
    {
        slug: "salt-in-the-shape-of-wings",
        title: "Salt in the Shape of Wings",
        author: "Mirella Arden",
        excerpt:
            "A lyrical ocean-bound meditation on belonging, memory, and the quiet courage of returning to oneself—told with drifting, tidal grace.",
        date: "2025-10-07",
        displayDate: "October 07, 2025",
        image: "/images/readings/salt-in-the-shape-of-wings.png",
    },
]

const BookIcon = () => (
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
        <path d="M2.75 7.21a2 2 0 0 1 2-2H8.5a3.5 3.5 0 0 1 3.5 3.5v10.885l-1.015-.721a4 4 0 0 0-2.318-.74H4.75a2 2 0 0 1-2-2zm18.5 0a2 2 0 0 0-2-2H15.5a3.5 3.5 0 0 0-3.5 3.5v10.885l1.015-.721a4 4 0 0 1 2.317-.74h3.918a2 2 0 0 0 2-2z" />
    </svg>
)

export function LatestReadings() {
    return (
        <section className="bg-muted/40 py-16"><div className="mx-auto max-w-5xl px-4">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Latest Readings
                </h2>
                <a
                    href="/readings"
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    Explore all
                </a>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {readings.map((reading) => (
                    <ReadingCard key={reading.slug} reading={reading} />
                ))}
            </div>
        </div></section>
    )
}

function ReadingCard({ reading }: { reading: Reading }) {
    return (
        <article
            className="group relative flex flex-col rounded-xl overflow-hidden transition-transform duration-200
                       hover:-translate-y-1.5 hover:bg-accent focus-within:shadow-md"
            role="article"
        >
            <a
                className="absolute inset-0 z-10"
                href={`/readings/${reading.slug}`}
                aria-label={reading.title}
            />

            {/* Reading badge */}
            <div className="absolute top-2 left-2 z-20 flex gap-2 text-[10px] font-medium">
                <span className="flex items-center gap-1 rounded-full bg-teal-100 px-2 py-0.5 text-teal-800">
                    <BookIcon />
                    Reading
                </span>
            </div>

            {/* Cover image */}
            <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                    src={reading.image}
                    alt={reading.title}
                    className="h-full w-full object-cover transition-transform duration-300
                               group-hover:scale-105 shadow-sm group-hover:shadow-lg"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <span className="text-xs font-medium text-muted-foreground">
                    {reading.author}
                </span>

                <h3 className="mt-1 text-base font-semibold leading-snug group-hover:text-foreground">
                    {reading.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {reading.excerpt}
                </p>

                <div className="mt-auto pt-3 text-xs text-muted-foreground">
                    <time dateTime={reading.date}>{reading.displayDate}</time>
                </div>
            </div>
        </article>
    )
}
