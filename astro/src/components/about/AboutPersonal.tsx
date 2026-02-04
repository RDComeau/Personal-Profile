import * as React from "react"
import type { PersonalInterest } from "@/lib/about"

const iconMap: Record<string, React.ReactNode> = {
    church: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 3v3m0 0v4m0-4h3m-3 0H9m3 4v10m-6 0h12M4 20h16M8 10l-4 5v5m16-5-4-5m0 0v10"/>
        </svg>
    ),
    gamepad: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.4 48.4 0 0 0-4.163.3c-1.18.128-2.17.9-2.55 2.017l-1.17 3.408A1.477 1.477 0 0 0 4.06 14.1l.44.48a2 2 0 0 0 2.95 0l.334-.366a2 2 0 0 1 2.95 0l.334.366a2 2 0 0 0 2.95 0l.334-.366a2 2 0 0 1 2.95 0l.334.366a2 2 0 0 0 2.95 0l.44-.48a1.477 1.477 0 0 0 .39-1.66l-1.17-3.408c-.38-1.117-1.37-1.89-2.55-2.017a48.4 48.4 0 0 0-4.163-.3.64.64 0 0 1-.657-.643ZM9.75 9h.008v.008H9.75zm4.5 0h.008v.008h-.008z"/>
        </svg>
    ),
    printer: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659"/>
        </svg>
    ),
    book: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/>
        </svg>
    ),
}

export function AboutPersonal({ interests }: { interests: PersonalInterest[] }) {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-4xl px-4">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Beyond the Code
                </h2>
                <p className="mb-10 text-sm text-muted-foreground max-w-2xl">
                    I live in Cape Girardeau, Missouri with my wife and our growing family.
                    When I close the laptop, here's where you'll find me.
                </p>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {interests.map((interest) => (
                        <div
                            key={interest.title}
                            className="rounded-xl border border-border p-5 transition-shadow hover:shadow-md"
                        >
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                {iconMap[interest.icon] ?? (
                                    <span className="text-lg">{interest.icon}</span>
                                )}
                            </div>
                            <h3 className="text-sm font-semibold">{interest.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                {interest.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
