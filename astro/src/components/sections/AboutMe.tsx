import * as React from "react"
import {Button} from "@/components/ui/button"

const socialLinks = [
    {href: "https://github.com/your-handle", label: "GitHub", icon: "icon-square-github"},
    {href: "https://www.linkedin.com/in/your-handle", label: "LinkedIn", icon: "icon-linkedin"},
    {href: "https://x.com/your-handle", label: "Twitter / X", icon: "icon-x-twitter"},
    {href: "https://bsky.app/profile/your-handle", label: "Bluesky", icon: "icon-bluesky"},
    {href: "https://your-podcast-link", label: "Podcast", icon: "icon-podcast"},
]

export default function AboutMe() {
    return (
        <section
            id="about"
            className="relative py-16 md:py-24"
        >
            <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 md:flex-row md:items-center">
                {/* Left: profile image */}
                <div className="md:w-1/2">
                    <div
                        className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-3xl bg-muted shadow-lg">
                        <img
                            src="/images/about/profile.jpg"
                            alt="Portrait of Richard"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                {/* Right: text + socials */}
                <div className="md:w-1/2 space-y-6">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            About me
                        </p>
                        <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                            Building resilient systems{" "}
                            <span className="italic">& intentional lives.</span>
                        </h2>
                        <p className="text-base md:text-lg text-muted-foreground">
                            I’m Richard, a Senior DevOps / Platform Engineer who loves turning messy
                            infrastructure into calm, observable systems. When I’m not shipping code, I’m
                            usually planning our homestead, reading theology, or experimenting with
                            bread recipes and 3D printers.
                        </p>
                        <p className="text-base text-muted-foreground">
                            I enjoy working at the intersection of **engineering**, teaching, and
                            storytelling—whether that’s designing deployment pipelines, documenting
                            architectures, or sharing what I’ve learned so others can build with more
                            confidence and less chaos.
                        </p>
                    </div>

                    {/* Primary CTA */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="lg">
                            View my work
                        </Button>
                        <Button variant="outline" size="lg" asChild>
                            <a href="/resume.pdf" target="_blank" rel="noreferrer">
                                Download résumé
                            </a>
                        </Button>
                    </div>

                    {/* Social icons row */}
                    <div className="pt-4 border-t mt-4">
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
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    {/* Replace with your actual icon font or SVGs */}
                                    <span className="sr-only">{social.label}</span>
                                    <i className={social.icon}/>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
