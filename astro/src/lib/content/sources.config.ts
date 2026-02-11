import type { SourceConnection } from "./sources"

export const sourceConnections: SourceConnection[] = [
    {
        id: "ghost-personal",
        label: "Personal Profile Ghost",
        platform: "ghost",
        orgSlug: "personal",
        enabled: true,
        urlEnvVar: "GHOST_URL",
        apiKeyEnvVar: "GHOST_CONTENT_API_KEY",
    },
    // Future examples:
    // { id: "ghost-fort-d", platform: "ghost", orgSlug: "fort-d-aeronautic", enabled: false, label: "Fort D Aeronautic Ghost", urlEnvVar: "GHOST_FORT_D_URL", apiKeyEnvVar: "GHOST_FORT_D_API_KEY" },
    // { id: "medium-tentmakers", platform: "medium", orgSlug: "st-pauls-tentmakers", enabled: false, label: "Tentmakers Medium", username: "@tentmakers", defaultMedium: "article", maxItems: 10 },
    // { id: "substack-personal", platform: "substack", orgSlug: "personal", enabled: false, label: "Personal Substack", subdomain: "richardcomeau", defaultMedium: "article", maxItems: 10 },
    // { id: "hashnode-personal", platform: "hashnode", orgSlug: "personal", enabled: false, label: "Personal Hashnode", publicationHost: "blog.richardcomeau.com", defaultMedium: "article" },
]
