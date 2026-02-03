import React from "react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable"
import {Sidebar} from "@/components/sections/Sidebar"

export function ResizableLayout({children}: { children: React.ReactNode }) {
    return (
        <ResizablePanelGroup direction="horizontal" className="min-h-screen">
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <Sidebar/>
            </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={80}>
                <main className="h-full overflow-y-auto">
                    {children}
                </main>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
