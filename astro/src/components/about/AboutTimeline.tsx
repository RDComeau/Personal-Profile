import * as React from "react"
import type { Role } from "@/lib/about"

const typeLabels: Record<Role["type"], { label: string; className: string }> = {
    "full-time": { label: "Full-time", className: "bg-sky-100 text-sky-800" },
    contract: { label: "Contract", className: "bg-amber-100 text-amber-800" },
    military: { label: "US Navy", className: "bg-blue-100 text-blue-800" },
}

export function AboutTimeline({ roles }: { roles: Role[] }) {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-4xl px-4">
                <h2 className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Experience
                </h2>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px"/>

                    <div className="space-y-10">
                        {roles.map((role, i) => {
                            const badge = typeLabels[role.type]
                            const isRight = i % 2 === 0

                            return (
                                <div key={`${role.company}-${role.title}`} className="relative">
                                    {/* Timeline dot */}
                                    <div className="absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-foreground md:left-1/2"/>

                                    {/* Card */}
                                    <div
                                        className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                                            isRight ? "md:mr-auto" : "md:ml-auto"
                                        }`}
                                    >
                                        <div className="rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-md">
                                            {/* Header */}
                                            <div className="flex flex-wrap items-start justify-between gap-2">
                                                <div>
                                                    <h3 className="text-base font-semibold">{role.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {role.company} &middot; {role.location}
                                                    </p>
                                                </div>
                                                <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${badge.className}`}>
                                                    {badge.label}
                                                </span>
                                            </div>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {role.startDate} &ndash; {role.endDate}
                                            </p>

                                            {/* Highlights */}
                                            <ul className="mt-3 space-y-1.5">
                                                {role.highlights.map((h, j) => (
                                                    <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40"/>
                                                        <span>{h}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Technologies */}
                                            {role.technologies && role.technologies.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-1.5">
                                                    {role.technologies.map((tech) => (
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
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
