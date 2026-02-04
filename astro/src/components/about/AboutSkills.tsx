import * as React from "react"
import type { SkillCategory } from "@/lib/about"

export function AboutSkills({ categories }: { categories: SkillCategory[] }) {
    return (
        <section className="py-16 bg-muted/40">
            <div className="mx-auto max-w-4xl px-4">
                <h2 className="mb-10 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Skills & Tools
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((cat) => (
                        <div key={cat.name}>
                            <h3 className="mb-3 text-sm font-semibold">{cat.name}</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {cat.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground
                                                   transition-colors hover:border-foreground hover:text-foreground"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
