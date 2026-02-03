import * as React from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
export function NewsletterCta({tinted = false}: { tinted?: boolean }) {
    const [email, setEmail] = React.useState("")
    const [submitted, setSubmitted] = React.useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section className={`py-16 ${tinted ? "bg-muted/40" : ""}`}>
            <div className="mx-auto max-w-2xl px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-semibold">
                    Stay in the loop
                </h2>
                <p className="mt-3 text-base text-muted-foreground">
                    Weekly insights on cloud infrastructure, platform engineering, and building things that matter.
                    No spam, unsubscribe anytime.
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="max-w-xs"
                        />
                        <Button type="submit" size="lg">
                            Subscribe
                        </Button>
                    </form>
                ) : (
                    <p className="mt-6 text-base font-medium text-foreground">
                        Thanks! Check your inbox to confirm.
                    </p>
                )}
            </div>
        </section>
    )
}
