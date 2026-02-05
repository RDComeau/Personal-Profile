import * as React from "react"
import { useState, useMemo } from "react"
import type { Role, RoleType } from "@/lib/about"
import { companyColors, typeLabels } from "@/lib/about"
import { cn } from "@/lib/utils"

const typeFilters: { key: RoleType | undefined; label: string }[] = [
    { key: undefined, label: "All" },
    { key: "full-time", label: "Full-time" },
    { key: "contract", label: "Contract" },
    { key: "military", label: "Military" },
    { key: "venture", label: "Ventures" },
    { key: "education", label: "Education" },
    { key: "community", label: "Community" },
]

export function AboutTimeline({ roles }: { roles: Role[] }) {
    const [activeType, setActiveType] = useState<RoleType | undefined>(undefined)
    const [activeCompany, setActiveCompany] = useState<string | undefined>(undefined)

    // Derive unique companies from roles (preserving order of first appearance)
    const companies = useMemo(() => {
        const seen = new Set<string>()
        const result: string[] = []
        for (const role of roles) {
            if (!seen.has(role.company)) {
                seen.add(role.company)
                result.push(role.company)
            }
        }
        return result
    }, [roles])

    const filtered = useMemo(() => {
        return roles.filter((role) => {
            if (activeType && role.type !== activeType) return false
            if (activeCompany && role.company !== activeCompany) return false
            return true
        })
    }, [roles, activeType, activeCompany])

    const handleTypeClick = (type: RoleType | undefined) => {
        setActiveType(type)
        setActiveCompany(undefined)
    }

    const handleCompanyClick = (company: string) => {
        setActiveCompany((prev) => (prev === company ? undefined : company))
    }

    return (
        <section className="py-16">
            <div className="mx-auto max-w-4xl px-4">
                <h2 className="mb-10 text-center text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                    Experience
                </h2>

                {/* Type filter tabs */}
                <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5">
                    {typeFilters.map((tab) => (
                        <button
                            key={tab.label}
                            onClick={() => handleTypeClick(tab.key)}
                            className={cn(
                                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                                activeType === tab.key
                                    ? "bg-foreground text-background"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Company filter chips */}
                <div className="mb-10 flex flex-wrap items-center justify-center gap-1.5">
                    {companies.map((company) => {
                        const color = companyColors[company]
                        const isActive = activeCompany === company
                        return (
                            <button
                                key={company}
                                onClick={() => handleCompanyClick(company)}
                                className={cn(
                                    "rounded-full px-2.5 py-1 text-xs font-medium transition-all",
                                    isActive
                                        ? "bg-foreground text-background ring-2 ring-foreground ring-offset-2 ring-offset-background"
                                        : color
                                            ? color.colorClass + " hover:opacity-80"
                                            : "bg-muted text-muted-foreground hover:opacity-80"
                                )}
                            >
                                {company}
                            </button>
                        )
                    })}
                    {activeCompany && (
                        <button
                            onClick={() => setActiveCompany(undefined)}
                            className="ml-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Results count */}
                <p className="mb-6 text-center text-xs text-muted-foreground">
                    {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
                </p>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px"/>

                    <div className="space-y-8">
                        {filtered.map((role, i) => {
                            const badge = typeLabels[role.type]
                            const company = companyColors[role.company]
                            const isRight = i % 2 === 0

                            return (
                                <div
                                    key={`${role.company}-${role.title}-${role.startDate}`}
                                    className="relative animate-in fade-in slide-in-from-bottom-3 duration-300"
                                    style={{ animationDelay: `${Math.min(i * 50, 300)}ms`, animationFillMode: "both" }}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-foreground md:left-1/2"/>

                                    {/* Card */}
                                    <div
                                        className={cn(
                                            "ml-10 md:ml-0 md:w-[calc(50%-2rem)]",
                                            isRight ? "md:mr-auto" : "md:ml-auto"
                                        )}
                                    >
                                        <div className="rounded-xl border border-border bg-background p-5 transition-shadow hover:shadow-md">
                                            {/* Title */}
                                            <h3 className="text-base font-semibold">{role.title}</h3>

                                            {/* Date + badges row */}
                                            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                                                <span className="text-xs text-muted-foreground">
                                                    {role.startDate} &ndash; {role.endDate}
                                                </span>
                                                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", badge.className)}>
                                                    {badge.label}
                                                </span>
                                                {company && (
                                                    <button
                                                        onClick={() => handleCompanyClick(role.company)}
                                                        className={cn(
                                                            "rounded-full px-2 py-0.5 text-[10px] font-medium transition-opacity hover:opacity-80",
                                                            company.colorClass
                                                        )}
                                                    >
                                                        {role.company}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Location */}
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {role.location}
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

                {filtered.length === 0 && (
                    <p className="py-12 text-center text-muted-foreground">
                        No entries match the current filters.
                    </p>
                )}
            </div>
        </section>
    )
}
