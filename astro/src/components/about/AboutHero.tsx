import * as React from "react"
import { Button } from "@/components/ui/button"

const socialLinks = [
    { href: "https://github.com/your-handle", label: "GitHub", initial: "G" },
    { href: "https://www.linkedin.com/in/your-handle", label: "LinkedIn", initial: "L" },
    { href: "https://x.com/your-handle", label: "Twitter / X", initial: "X" },
    { href: "https://bsky.app/profile/your-handle", label: "Bluesky", initial: "B" },
]

export function AboutHero() {
    return (
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24">
            <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 md:flex-row md:items-center">
                {/* Left: profile image */}
                <div className="md:w-5/12">
                    <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-3xl bg-muted shadow-lg">
                        <img
                            src="/images/about/profile.jpg"
                            alt="Portrait of Richard"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* Right: intro */}
                <div className="md:w-7/12 space-y-6">
                    <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            About me
                        </p>
                        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                            Building resilient systems{" "}
                            <span className="italic">& intentional lives.</span>
                        </h1>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            I'm Richard&mdash;a software engineer and DevOps consultant who believes
                            the best technology is built with the same care you'd put into anything you
                            want to last. I work across the full stack, from React frontends to .NET
                            backends to Azure infrastructure, but what I really care about is making
                            complex systems understandable and deployments boring.
                        </p>
                        <p className="text-base text-muted-foreground leading-relaxed">
                            Before I wrote my first line of production code, I was launching fighter jets
                            off aircraft carriers. The Navy taught me that attention to detail isn't
                            optional&mdash;it's how you keep people safe. That principle still drives how
                            I approach every deployment, every pipeline, every system I touch.
                        </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="lg" asChild>
                            <a href="/blog">See my work</a>
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a href="/resume.pdf" target="_blank" rel="noreferrer">
                                Download r&eacute;sum&eacute;
                            </a>
                        </Button>
                    </div>

                    {/* Social links */}
                    <div className="pt-4 border-t">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Find me online
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.href}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border
                                               bg-background text-sm font-medium hover:bg-accent
                                               hover:text-accent-foreground transition-colors"
                                >
                                    {social.initial}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
