import * as React from "react"
import { Button } from "@/components/ui/button"

export function AboutCta() {
    return (
        <section className="py-16 bg-muted/40">
            <div className="mx-auto max-w-2xl px-4 text-center">
                <h2 className="text-2xl font-semibold">Let's build something.</h2>
                <p className="mt-3 text-base text-muted-foreground">
                    Whether you're looking for a collaborator, want to talk shop about DevOps
                    and cloud architecture, or just want to argue about which Paradox game
                    is best&mdash;I'd love to hear from you.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Button size="lg" asChild>
                        <a href="mailto:your-email@example.com">Get in touch</a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <a href="/blog">Read the blog</a>
                    </Button>
                </div>
            </div>
        </section>
    )
}
