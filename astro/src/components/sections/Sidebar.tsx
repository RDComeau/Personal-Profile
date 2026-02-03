import * as React from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Briefcase, FileText, Home, Mail, Mic, Palette, Sparkles, Tag, Users,} from "lucide-react"

const navigationItems = [
    {href: "/", label: "Home", icon: Home, count: null},
    {href: "/blog", label: "Articles", icon: FileText, count: 12},
    {href: "/podcasts", label: "Podcasts", icon: Mic, count: 10},
    {href: "/projects", label: "Projects", icon: Briefcase, count: 3},
]

const themeItems = [
    {href: "/style-guide", label: "Style Guide", icon: Palette},
    {href: "/features", label: "Features", icon: Sparkles},
]

const pageItems = [
    {href: "/tags", label: "Tags", icon: Tag, count: 10},
    {href: "/authors", label: "Authors", icon: Users, count: 4},
    {href: "/contact", label: "Contact", icon: Mail},
]

const popularTags = [
    {name: "DevOps", slug: "devops", image: "/images/tags/devops.jpg"},
    {name: "Cloud", slug: "cloud", image: "/images/tags/cloud.jpg"},
    {name: "Homesteading", slug: "homesteading", image: "/images/tags/homestead.jpg"},
    {name: "Rust", slug: "rust", image: "/images/tags/rust.jpg"},
]

const socialLinks = [
    {href: "https://twitter.com/yourhandle", label: "Twitter", icon: "twitter"},
    {href: "https://github.com/yourhandle", label: "GitHub", icon: "github"},
    {href: "https://linkedin.com/in/yourhandle", label: "LinkedIn", icon: "linkedin"},
]

export function Sidebar() {
    const [email, setEmail] = React.useState("")
    const [subscribed, setSubscribed] = React.useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle newsletter signup
        setSubscribed(true)
    }

    return (
        <aside className="flex flex-col gap-8 h-full overflow-y-auto p-6">
            {/* Main Navigation */}
            <nav className="space-y-1">
                {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            className="flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <Icon
                                    className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"/>
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {item.count !== null && (
                                <span className="text-xs text-muted-foreground">{item.count}</span>
                            )}
                        </a>
                    )
                })}
            </nav>

            {/* Theme Section */}
            <div className="space-y-1">
                <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Theme
                </h4>
                {themeItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors group"
                        >
                            <Icon
                                className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"/>
                            <span className="font-medium">{item.label}</span>
                        </a>
                    )
                })}
            </div>

            {/* Pages Section */}
            <div className="space-y-1">
                <h4 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Pages
                </h4>
                {pageItems.map((item) => {
                    const Icon = item.icon
                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            className="flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-secondary transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <Icon
                                    className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors"/>
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {item.count && (
                                <span className="text-xs text-muted-foreground">{item.count}</span>
                            )}
                        </a>
                    )
                })}
            </div>

            {/* Newsletter Signup */}
            <div className="bg-secondary rounded-lg p-4 space-y-3">
                <h5 className="text-sm font-semibold">
                    Weekly tips & updates, straight to your inbox.
                </h5>

                {!subscribed ? (
                    <form onSubmit={handleSubscribe} className="space-y-2">
                        <Input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="text-sm"
                        />
                        <Button type="submit" size="sm" className="w-full">
                            Subscribe
                        </Button>
                    </form>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Please check your inbox and click the link to complete signup.
                    </p>
                )}

                <p className="text-xs text-muted-foreground">
                    ✨ Just the good stuff.
                </p>
            </div>

            {/* Note/Quote Section */}
            <div className="border-l-2 border-primary pl-4 py-2">
                <p className="text-sm text-muted-foreground italic">
                    Building reliable systems and sustainable futures.
                </p>
            </div>

            {/* Popular Tags */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold">Popular Tags</h4>
                <div className="grid grid-cols-2 gap-2">
                    {popularTags.map((tag) => (
                        <a
                            key={tag.slug}
                            href={`/tag/${tag.slug}`}
                            className="relative rounded-md overflow-hidden aspect-video group hover:ring-2 hover:ring-primary transition-all"
                        >
                            <img
                                src={tag.image}
                                alt={tag.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                            <span className="absolute bottom-2 left-2 text-xs font-medium text-white">
                {tag.name}
              </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t">
                {socialLinks.map((social) => (
                    <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-md border flex items-center justify-center hover:bg-secondary transition-colors"
                        aria-label={social.label}
                    >
                        {/* Add actual icons here - using lucide-react or custom SVGs */}
                        <span className="text-xs">{social.icon[0].toUpperCase()}</span>
                    </a>
                ))}
            </div>
        </aside>
    )
}
