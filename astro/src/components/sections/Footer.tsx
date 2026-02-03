import * as React from "react"
import {Github, Linkedin, Rss, Twitter} from "lucide-react"

const navItems = [
    {href: "/", label: "Home"},
    {href: "/about", label: "About"},
    {href: "/projects", label: "Projects"},
    {href: "/blog", label: "Blog"},
]

const socialLinks = [
    {href: "https://github.com/your-handle", label: "GitHub", icon: Github},
    {href: "https://linkedin.com/in/your-handle", label: "LinkedIn", icon: Linkedin},
    {href: "https://x.com/your-handle", label: "Twitter / X", icon: Twitter},
    {href: "https://your-podcast-link", label: "RSS", icon: Rss},
]

export function Footer() {
    return (
        <footer className="border-t border-border bg-background">
            <div className="mx-auto max-w-5xl px-4 py-12">
                <div className="flex flex-col gap-8 md:flex-row md:justify-between">

                    {/* Left — brand + blurb */}
                    <div className="max-w-xs space-y-3">
                        <span className="text-lg font-bold tracking-tight text-foreground">
                            Richard Comeau
                        </span>
                        <p className="text-sm text-muted-foreground">
                            Platform engineer building reliable cloud systems and a sustainable homestead life.
                        </p>
                    </div>

                    {/* Center — nav */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Navigation
                        </h3>
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Right — social */}
                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Connect
                        </h3>
                        <div className="flex items-center gap-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon
                                return (
                                    <a
                                        key={social.href}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border
                                                   text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                                    >
                                        <Icon className="h-4 w-4"/>
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} Richard Comeau. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
