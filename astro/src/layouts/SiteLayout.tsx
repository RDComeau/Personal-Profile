import * as React from "react"

const navItems = [
    {href: "/", label: "Home"},
    {href: "/about", label: "About"},
    {href: "/projects", label: "Projects"},
    {href: "/blog", label: "Blog"},
]

export default function SiteLayout({children}: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-14 max-w-5xl items-center justify-center px-4">
                    <nav className="flex items-center gap-8 text-sm font-medium">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main>{children}</main>
        </div>
    )
}
