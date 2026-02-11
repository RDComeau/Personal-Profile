export function formatDate(isoString: string): string {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    })
}

export function extractFirstImage(html: string): string | null {
    const match = html.match(/<img[^>]+src="([^"]+)"/)
    return match?.[1] ?? null
}

export function deriveSlugFromUrl(url: string): string {
    try {
        const path = new URL(url).pathname
        return path.split("/").filter(Boolean).pop() ?? ""
    } catch {
        return ""
    }
}
