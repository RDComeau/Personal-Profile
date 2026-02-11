import type { Medium } from "./types"

export type PlatformType = "ghost" | "medium" | "substack" | "hashnode"

type BaseConnection = {
    id: string
    label: string
    platform: PlatformType
    orgSlug: string
    enabled: boolean
    defaultMedium?: Medium
    defaultCategories?: string[]
    maxItems?: number
}

export type GhostConnection = BaseConnection & {
    platform: "ghost"
    urlEnvVar: string
    apiKeyEnvVar: string
}

export type MediumConnection = BaseConnection & {
    platform: "medium"
    username: string
}

export type SubstackConnection = BaseConnection & {
    platform: "substack"
    subdomain: string
    customDomain?: string
}

export type HashnodeConnection = BaseConnection & {
    platform: "hashnode"
    publicationHost: string
}

export type SourceConnection =
    | GhostConnection
    | MediumConnection
    | SubstackConnection
    | HashnodeConnection
