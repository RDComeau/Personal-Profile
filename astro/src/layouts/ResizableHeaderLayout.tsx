// src/components/layouts/ResizableHeaderLayout.tsx
import * as React from "react"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable"
import {Button} from "@/components/ui/button"
import {Mail, Menu, Search, X} from "lucide-react"

const navItems = [
    {href: "/", label: "Home"},
    {href: "/about", label: "About"},
    {href: "/projects", label: "Projects"},
    {href: "/blog", label: "Blog"},
]

export default function ResizableHeaderLayout({
                                                  children,
                                              }: {
    children: React.ReactNode
}) {
    const [open, setOpen] = React.useState(false)

    return (
        <ResizablePanelGroup
            direction="vertical"
            className="min-h-screen rounded-lg border bg-background"
        >
            {/* Header panel */}
            <ResizablePanel defaultSize={18} minSize={12} maxSize={30}>
                <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
                        {/* Left: logo / name */}
                        <a
                            href="/"
                            className="flex items-center gap-2 font-semibold tracking-tight"
                        >
              <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm">
                RC
              </span>
                            <span className="hidden text-sm md:inline">
                Richard Comeau
              </span>
                        </a>

                        {/* Center: nav (desktop) */}
                        <nav className="hidden md:flex items-center gap-6 text-sm">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {item.label.toUpperCase()}
                                </a>
                            ))}
                        </nav>

                        {/* Right: actions */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="hidden md:inline-flex"
                                asChild
                            >
                                <a href="/#contact" aria-label="Email">
                                    <Mail className="h-4 w-4"/>
                                </a>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden md:inline-flex"
                                asChild
                            >
                                <a href="/search" aria-label="Search">
                                    <Search className="h-4 w-4"/>
                                </a>
                            </Button>
                            <Button
                                className="hidden md:inline-flex"
                                size="sm"
                                asChild
                            >
                                <a href="/work-with-me">
                                    Work with me
                                </a>
                            </Button>

                            {/* Mobile burger */}
                            <Button
                                variant="outline"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setOpen((v) => !v)}
                                aria-label="Toggle navigation"
                            >
                                {open ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile nav dropdown */}
                    {open && (
                        <div className="border-t md:hidden">
                            <nav className="space-y-1 px-4 py-3 text-sm">
                                {navItems.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className="block rounded-md px-2 py-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <div className="mt-3 flex items-center gap-2">
                                    <Button size="sm" className="flex-1" asChild>
                                        <a href="/work-with-me">Work with me</a>
                                    </Button>
                                    <Button variant="outline" size="icon" asChild>
                                        <a href="/#contact" aria-label="Email">
                                            <Mail className="h-4 w-4"/>
                                        </a>
                                    </Button>
                                </div>
                            </nav>
                        </div>
                    )}
                </header>
            </ResizablePanel>

            {/* Handle between header and content */}
            <ResizableHandle className="bg-border"/>

            {/* Content panel */}
            <ResizablePanel defaultSize={82} minSize={60}>
                <main className="min-h-[calc(100vh-4rem)] overflow-visible">
                    {children}
                </main>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
