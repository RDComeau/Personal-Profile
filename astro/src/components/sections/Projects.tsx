import * as React from "react"
import type { ContentItem } from "@/lib/content"
import { getOrgColorClass } from "@/lib/content"

const statusLabels: Record<string, { label: string; dot: string }> = {
    "complete": { label: "Complete", dot: "bg-emerald-500" },
    "in-progress": { label: "In Progress", dot: "bg-amber-500" },
    "archived": { label: "Archived", dot: "bg-muted-foreground" },
}

export function LatestProjects({ tinted = false, items = [] }: { tinted?: boolean; items?: ContentItem[] }) {
    return (
        <section className={`mx-auto max-w-5xl px-4 py-16 ${tinted ? "bg-muted/40" : ""}`}>
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Latest Projects
                </h2>
                <a
                    href="/blog?type=project"
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    View all
                </a>
            </div>

            {items.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((project) => (
                        <ProjectCard key={project.slug} project={project}/>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
                    <p className="text-sm font-medium text-muted-foreground">Coming Soon!</p>
                    <p className="mt-1 text-xs text-muted-foreground/60">Projects are on the way.</p>
                </div>
            )}
        </section>
    )
}

function ProjectCard({ project }: { project: ContentItem }) {
    const badgeClass = project.organization
        ? getOrgColorClass(project.organization)
        : "bg-muted text-muted-foreground"
    const status = statusLabels[project.status ?? "complete"]

    return (
        <article
            className="group relative flex flex-col rounded-xl overflow-hidden transition-transform duration-200
                       hover:-translate-y-1.5 hover:bg-accent focus-within:shadow-md"
            role="article"
        >
            <a
                className="absolute inset-0 z-10"
                href={`/blog/${project.slug}`}
                aria-label={project.title}
            />

            <div className="absolute top-2 left-2 z-20 flex gap-2 text-[10px] font-medium">
                {project.organization && (
                    <span className={`rounded-full px-2 py-0.5 ${badgeClass}`}>
                        {project.organization}
                    </span>
                )}
            </div>

            <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300
                               group-hover:scale-105 shadow-sm group-hover:shadow-lg"
                />
            </div>

            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-semibold leading-snug group-hover:text-foreground">
                    {project.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {project.excerpt}
                </p>

                {status && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`}/>
                        <span>{status.label}</span>
                        <span>·</span>
                        <time dateTime={project.date}>{project.displayDate}</time>
                    </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                    <div className="relative z-20 mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
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
