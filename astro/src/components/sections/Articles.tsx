import * as React from "react"
type Article = {
    slug: string
    title: string
    excerpt: string
    date: string
    displayDate: string
    readingTime: string
    image: string
    featured?: boolean
    memberOnly?: boolean
    paid?: boolean
}

const articles: Article[] = [
    {
        slug: "learning-by-breaking-things",
        title: "Learning by Breaking Things on Purpose",
        excerpt:
            "Sometimes the fastest way to understand how something works is to take it apart, push it too far, or let it fall apart in your hands.",
        date: "2025-11-20",
        displayDate: "November 20, 2025",
        readingTime: "3 min",
        image: "/images/blog/learning-by-breaking.png",
        memberOnly: true,
    },
    // add more…
]

export function LatestArticles() {
    return (
        <section className="bg-muted/40 py-12"><div className="mx-auto max-w-5xl px-4">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Latest Articles
                </h2>
                <a
                    href="/blog"
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    See all
                </a>
            </div>

            {/* slim list layout (replaces the `.latest-posts-section .loops` + `.loop` CSS) */}
            <div className="flex flex-col gap-3">
                {articles.map((post) => (
                    <ArticleListItem key={post.slug} post={post}/>
                ))}
            </div>
        </div></section>
    )
}

function ArticleListItem({post}: { post: Article }) {
    return (
        <article
            className="group relative flex items-start rounded-xl p-2.5 transition-transform duration-200
                       hover:-translate-y-1.5 hover:bg-accent focus-within:shadow-md"
            role="article"
        >
            {/* clickable overlay (same behavior as .loop-link) */}
            <a
                className="absolute inset-0 z-10"
                href={`/blog/${post.slug}`}
                aria-label={post.title}
            />

            {/* Badges (sit above overlay) */}
            {(post.featured || post.memberOnly || post.paid) && (
                <div className="absolute top-2 left-3 z-20 flex gap-2 text-[10px] font-medium">
                    {post.featured && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800">
                            Featured
                        </span>
                    )}
                    {post.memberOnly && (
                        <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-800">
                            Members
                        </span>
                    )}
                    {post.paid && (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-800">
                            Premium
                        </span>
                    )}
                </div>
            )}

            {/* Thumbnail (fixed size 96x64 -> w-24 h-16) */}
            <div className="flex-none w-24 h-16 mr-3 rounded-[10px] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-[8px] transition-transform duration-300
                               group-hover:scale-105 shadow-sm
                               group-hover:shadow-lg"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold leading-snug group-hover:text-foreground truncate">
                    {post.title}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                </p>

                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <time dateTime={post.date}>{post.displayDate}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                </div>

                <hr className="border-t border-border mt-3"/>
            </div>
        </article>
    )
}
