import * as React from "react"

type Organization = {
    name: string
    color: string
}

type Project = {
    slug: string
    title: string
    excerpt: string
    date: string
    displayDate: string
    image: string
    organization: Organization
    technologies: string[]
    status: "complete" | "in-progress" | "archived"
}

const orgColors: Record<string, string> = {
    "Drone Company": "bg-blue-100 text-blue-800",
    "Dev Shop": "bg-green-100 text-green-800",
    "St. Paul's Tentmakers": "bg-purple-100 text-purple-800",
    "Personal": "bg-orange-100 text-orange-800",
    "Idea Bucket": "bg-pink-100 text-pink-800",
}

const statusLabels: Record<Project["status"], { label: string; dot: string }> = {
    "complete": { label: "Complete", dot: "bg-emerald-500" },
    "in-progress": { label: "In Progress", dot: "bg-amber-500" },
    "archived": { label: "Archived", dot: "bg-muted-foreground" },
}

const projects: Project[] = [
    {
        slug: "fleet-analytics-dashboard",
        title: "Fleet Analytics Dashboard",
        excerpt:
            "Real-time telemetry and fleet management dashboard for monitoring drone operations across multiple sites.",
        date: "2025-11-15",
        displayDate: "November 15, 2025",
        image: "/images/projects/fleet-analytics-dashboard.png",
        organization: { name: "Drone Company", color: "blue" },
        technologies: ["React", "TypeScript", "D3.js"],
        status: "in-progress",
    },
    {
        slug: "church-event-system",
        title: "Church Event System",
        excerpt:
            "Event coordination platform for managing services, volunteer schedules, and community outreach programs.",
        date: "2025-10-28",
        displayDate: "October 28, 2025",
        image: "/images/projects/church-event-system.png",
        organization: { name: "St. Paul's Tentmakers", color: "purple" },
        technologies: ["Astro", "Node.js", "SQLite"],
        status: "complete",
    },
    {
        slug: "ecommerce-api",
        title: "E-commerce API",
        excerpt:
            "Headless commerce API powering multiple storefronts with inventory management and payment processing.",
        date: "2025-10-10",
        displayDate: "October 10, 2025",
        image: "/images/projects/ecommerce-api.png",
        organization: { name: "Dev Shop", color: "green" },
        technologies: ["Go", "PostgreSQL", "Redis"],
        status: "complete",
    },
]

export function LatestProjects() {
    return (
        <section className="mx-auto max-w-5xl px-4 py-12">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Latest Projects
                </h2>
                <a
                    href="/projects"
                    className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    View all
                </a>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    )
}

function ProjectCard({ project }: { project: Project }) {
    const badgeClass = orgColors[project.organization.name] ?? "bg-muted text-muted-foreground"
    const status = statusLabels[project.status]

    return (
        <article
            className="group relative flex flex-col rounded-xl overflow-hidden transition-transform duration-200
                       hover:-translate-y-1.5 hover:bg-accent focus-within:shadow-md"
            role="article"
        >
            <a
                className="absolute inset-0 z-10"
                href={`/projects/${project.slug}`}
                aria-label={project.title}
            />

            {/* Organization badge */}
            <div className="absolute top-2 left-2 z-20 flex gap-2 text-[10px] font-medium">
                <span className={`rounded-full px-2 py-0.5 ${badgeClass}`}>
                    {project.organization.name}
                </span>
            </div>

            {/* Cover image */}
            <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300
                               group-hover:scale-105 shadow-sm group-hover:shadow-lg"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-semibold leading-snug group-hover:text-foreground">
                    {project.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {project.excerpt}
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot}`} />
                    <span>{status.label}</span>
                    <span>·</span>
                    <time dateTime={project.date}>{project.displayDate}</time>
                </div>

                {/* Technology tags */}
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
            </div>
        </article>
    )
}
