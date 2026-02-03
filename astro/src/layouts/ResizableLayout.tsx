import React from "react"
import {PanelLeft, X} from "lucide-react"
import {Sidebar} from "@/components/sections/Sidebar"

export function ResizableLayout({children}: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    return (
        <div className="relative min-h-screen">
            {/* Toggle button — positioned within this container, not the viewport */}
            <button
                onClick={() => setSidebarOpen(true)}
                className={`sticky top-1/2 z-30 float-left -translate-y-1/2 flex h-8 w-5 items-center justify-center
                           rounded-r-md border border-l-0 border-border bg-background text-muted-foreground
                           hover:bg-accent hover:text-foreground transition-opacity
                           ${sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                aria-label="Open sidebar"
            >
                <PanelLeft className="h-3.5 w-3.5"/>
            </button>

            {/* Backdrop — covers only this container */}
            {sidebarOpen && (
                <div
                    className="absolute inset-0 z-40 bg-black/40"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar drawer */}
            <aside
                className={`absolute left-0 top-0 z-50 h-full w-72 bg-background border-r border-border
                           shadow-lg transition-transform duration-300 ease-in-out
                           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="sticky top-0 flex items-center justify-end p-2 bg-background">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground
                                   hover:bg-accent hover:text-foreground transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="h-4 w-4"/>
                    </button>
                </div>
                <Sidebar/>
            </aside>

            {/* Main content — full width */}
            <main>
                {children}
            </main>
        </div>
    )
}
