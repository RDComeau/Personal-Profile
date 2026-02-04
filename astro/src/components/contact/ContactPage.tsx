import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const openTo = [
    {
        area: "Engineering & Consulting",
        description: "Full-stack development, DevOps strategy, cloud architecture, CI/CD pipeline design, infrastructure as code.",
    },
    {
        area: "Content & Media",
        description: "Writing, podcasting, video — I create content about technology, systems thinking, and the intersection of engineering and life.",
    },
    {
        area: "Projects & Ventures",
        description: "I build things across contexts: church software, FinTech platforms, homestead automation, open source tools. New ideas welcome.",
    },
    {
        area: "Speaking & Teaching",
        description: "Workshops, talks, and mentoring on DevOps practices, career transitions, and building with intention.",
    },
]

const topicOptions = [
    "General",
    "Consulting / Contract work",
    "Collaboration on a project",
    "Content (podcast, writing, video)",
    "Speaking / Teaching",
    "Just saying hello",
]

const socialLinks = [
    { href: "https://github.com/your-handle", label: "GitHub", initial: "G" },
    { href: "https://www.linkedin.com/in/your-handle", label: "LinkedIn", initial: "L" },
    { href: "https://x.com/your-handle", label: "Twitter / X", initial: "X" },
    { href: "https://bsky.app/profile/your-handle", label: "Bluesky", initial: "B" },
]

export function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        topic: "",
        message: "",
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Connect to form backend (Formspree, Netlify Forms, custom endpoint)
        setSubmitted(true)
    }

    const updateField = (field: string, value: string) => {
        setFormState((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-16">
            {/* Header */}
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold">Let's talk.</h1>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                    I work across software engineering, DevOps consulting, content creation,
                    and community building&mdash;and I'm always looking for where these things
                    overlap. If you see a connection or have something in mind, I'd genuinely
                    like to hear about it.
                </p>
            </div>

            {/* What I'm open to */}
            <div className="mt-12">
                <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    What I'm open to
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {openTo.map((item) => (
                        <div
                            key={item.area}
                            className="rounded-xl border border-border p-5"
                        >
                            <h3 className="text-sm font-semibold">{item.area}</h3>
                            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form + sidebar */}
            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
                {/* Contact form */}
                <div>
                    <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        Send a message
                    </h2>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                                        Name
                                    </label>
                                    <Input
                                        id="contact-name"
                                        type="text"
                                        placeholder="Your name"
                                        value={formState.name}
                                        onChange={(e) => updateField("name", e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                                        Email
                                    </label>
                                    <Input
                                        id="contact-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formState.email}
                                        onChange={(e) => updateField("email", e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="contact-topic" className="mb-1.5 block text-sm font-medium">
                                    What's this about?
                                    <span className="ml-1 text-xs text-muted-foreground font-normal">(optional)</span>
                                </label>
                                <select
                                    id="contact-topic"
                                    value={formState.topic}
                                    onChange={(e) => updateField("topic", e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm
                                               shadow-xs transition-colors placeholder:text-muted-foreground
                                               focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                >
                                    <option value="">Select a topic...</option>
                                    {topicOptions.map((opt) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    rows={6}
                                    placeholder="What's on your mind?"
                                    value={formState.message}
                                    onChange={(e) => updateField("message", e.target.value)}
                                    required
                                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm
                                               shadow-xs transition-colors placeholder:text-muted-foreground
                                               focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                                               resize-y min-h-[120px]"
                                />
                            </div>

                            <Button type="submit" size="lg">
                                Send message
                            </Button>
                        </form>
                    ) : (
                        <div className="rounded-xl border border-border p-8 text-center">
                            <h3 className="text-lg font-semibold">Message sent.</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Thanks for reaching out. I'll get back to you soon.
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar: direct channels */}
                <aside className="space-y-8">
                    {/* Email */}
                    <div>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Email directly
                        </h3>
                        <a
                            href="mailto:your-email@example.com"
                            className="text-sm font-medium hover:text-foreground text-muted-foreground transition-colors break-all"
                        >
                            your-email@example.com
                        </a>
                    </div>

                    {/* Location */}
                    <div>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Based in
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Cape Girardeau, Missouri
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Available for remote work and collaboration.
                        </p>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Find me online
                        </h3>
                        <div className="flex flex-wrap gap-2">
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

                    {/* Availability note */}
                    <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-sm font-medium">Currently open to:</p>
                        <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                            <li>Consulting engagements</li>
                            <li>Podcast guest appearances</li>
                            <li>Writing collaborations</li>
                            <li>Side project partnerships</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}
