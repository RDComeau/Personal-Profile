export type OrganizationDef = {
    name: string
    slug: string
    colorClass: string
}

export type CategoryDef = {
    name: string
    slug: string
}

export type TagDef = {
    name: string
    slug: string
}

export const organizations: OrganizationDef[] = [
    { name: "Drone Company", slug: "drone-company", colorClass: "bg-blue-100 text-blue-800" },
    { name: "Dev Shop", slug: "dev-shop", colorClass: "bg-green-100 text-green-800" },
    { name: "St. Paul's Tentmakers", slug: "st-pauls-tentmakers", colorClass: "bg-purple-100 text-purple-800" },
    { name: "Personal", slug: "personal", colorClass: "bg-orange-100 text-orange-800" },
    { name: "Idea Bucket", slug: "idea-bucket", colorClass: "bg-pink-100 text-pink-800" },
]

export const categories: CategoryDef[] = [
    { name: "DevOps", slug: "devops" },
    { name: "Cloud", slug: "cloud" },
    { name: "Frontend", slug: "frontend" },
    { name: "Backend", slug: "backend" },
    { name: "Homesteading", slug: "homesteading" },
    { name: "Faith", slug: "faith" },
    { name: "Leadership", slug: "leadership" },
]

export const tags: TagDef[] = [
    { name: "Kubernetes", slug: "kubernetes" },
    { name: "Docker", slug: "docker" },
    { name: "Terraform", slug: "terraform" },
    { name: "AWS", slug: "aws" },
    { name: "React", slug: "react" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Go", slug: "go" },
    { name: "Rust", slug: "rust" },
    { name: "Node.js", slug: "nodejs" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Redis", slug: "redis" },
    { name: "CI/CD", slug: "ci-cd" },
    { name: "Gardening", slug: "gardening" },
    { name: "Community", slug: "community" },
]

export function getOrgBySlug(slug: string): OrganizationDef | undefined {
    return organizations.find((o) => o.slug === slug)
}

export function getOrgByName(name: string): OrganizationDef | undefined {
    return organizations.find((o) => o.name === name)
}

export function getOrgColorClass(orgName: string): string {
    return getOrgByName(orgName)?.colorClass ?? "bg-muted text-muted-foreground"
}
