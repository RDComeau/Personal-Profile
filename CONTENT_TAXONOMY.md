# Content Taxonomy

This document defines the tagging conventions used in Ghost CMS and how they map to the Astro frontend's data model. It serves as the contract between Ghost (content source) and Astro (content consumer via SSG).

This taxonomy is designed to be reused across multiple Ghost CMS instances.

## Tag Prefix Convention

Ghost has one native taxonomy: **Tags**. We use prefix conventions on Ghost internal tags (tags starting with `#`, hidden from Ghost's public theme pages) to represent multiple taxonomy layers. All prefixed tags are fully available via the Ghost Content API in JSON responses.

| Prefix | Purpose | Example Ghost Tag | Parsed Value |
|--------|---------|-------------------|--------------|
| `#org-` | Organization / Business | `#org-fort-d-aeronomics` | `fort-d-aeronomics` |
| `#cat-` | Category | `#cat-devops` | `devops` |
| `#medium-` | Content medium / type | `#medium-article` | `article` |
| `#project-` | Project umbrella | `#project-fleet-analytics` | `fleet-analytics` |
| `#status-` | Project status | `#status-in-progress` | `in-progress` |
| _(none)_ | Technology / topic tag | `Kubernetes` | `kubernetes` |

### How It Works

When the Astro SSG build fetches posts from the Ghost Content API, the normalization layer:

1. Reads all tags from the JSON response
2. Separates them by prefix into their respective taxonomy fields
3. Strips the prefix to produce the clean value
4. Regular tags (no prefix, `visibility: "public"`) become technology/topic tags

### Example Ghost API Response

```json
{
  "title": "Fleet Analytics Dashboard — Telemetry Layer",
  "tags": [
    { "name": "#org-fort-d-aeronomics", "slug": "hash-org-fort-d-aeronomics", "visibility": "internal" },
    { "name": "#cat-frontend", "slug": "hash-cat-frontend", "visibility": "internal" },
    { "name": "#medium-project", "slug": "hash-medium-project", "visibility": "internal" },
    { "name": "#project-fleet-analytics", "slug": "hash-project-fleet-analytics", "visibility": "internal" },
    { "name": "#status-in-progress", "slug": "hash-status-in-progress", "visibility": "internal" },
    { "name": "React", "slug": "react", "visibility": "public" },
    { "name": "TypeScript", "slug": "typescript", "visibility": "public" }
  ]
}
```

### Normalized Output (Astro ContentItem)

```typescript
{
  title: "Fleet Analytics Dashboard — Telemetry Layer",
  medium: "project",
  organization: "Fort D Aeronomics",
  categories: ["frontend"],
  tags: ["react", "typescript"],
  project: "fleet-analytics",
  status: "in-progress"
}
```

---

## Organizations

Organizations represent the businesses, communities, or personal contexts that content originates from. Each organization gets a color class for badge rendering in the Astro UI.

| Ghost Tag | Display Name | Slug | Color Class | Status |
|-----------|-------------|------|-------------|--------|
| `#org-fort-d-aeronomics` | Fort D Aeronomics | `fort-d-aeronomics` | `bg-blue-100 text-blue-800` | Active |
| `#org-dev-shop` | Dev Shop | `dev-shop` | `bg-green-100 text-green-800` | Placeholder — update name |
| `#org-st-pauls-tentmakers` | St. Paul's Tentmakers | `st-pauls-tentmakers` | `bg-purple-100 text-purple-800` | Active |
| `#org-personal` | Personal | `personal` | `bg-orange-100 text-orange-800` | Active |
| `#org-idea-bucket` | Idea Bucket | `idea-bucket` | `bg-pink-100 text-pink-800` | Active |

### Adding a New Organization

1. Create the internal tag in Ghost Admin: Settings → Tags → New Tag → name it `#org-your-slug`
2. Add the org to this table with its display name, slug, and chosen color class
3. Update `astro/src/lib/content/taxonomy.ts` with the new `OrganizationDef` entry (display name, slug, colorClass)
4. If the org has its own Ghost CMS instance, add the API endpoint to the [Ghost API Endpoints](#ghost-api-endpoints) section below

---

## Categories

Categories represent broad topic areas that content falls into. A post can have multiple categories.

| Ghost Tag | Display Name | Slug |
|-----------|-------------|------|
| `#cat-devops` | DevOps | `devops` |
| `#cat-cloud` | Cloud | `cloud` |
| `#cat-frontend` | Frontend | `frontend` |
| `#cat-backend` | Backend | `backend` |
| `#cat-homesteading` | Homesteading | `homesteading` |
| `#cat-faith` | Faith | `faith` |
| `#cat-leadership` | Leadership | `leadership` |

### Adding a New Category

1. Create the internal tag in Ghost Admin: Settings → Tags → New Tag → name it `#cat-your-slug`
2. Add the category to this table
3. Update `astro/src/lib/content/taxonomy.ts` with the new `CategoryDef` entry

---

## Content Mediums

Mediums define the type of content. Each post gets exactly one medium tag.

| Ghost Tag | Display Name | Slug | Description |
|-----------|-------------|------|-------------|
| `#medium-article` | Article | `article` | Written blog posts, tutorials, opinion pieces |
| `#medium-podcast` | Podcast | `podcast` | Audio content — episodes, interviews, discussions |
| `#medium-reading` | Reading | `reading` | Book reviews, reading notes, recommended reads |
| `#medium-project` | Project | `project` | Project updates — see [Project Convention](#project-convention) below |

### Medium-Specific Fields

Some fields on the Astro `ContentItem` type are only relevant for certain mediums:

| Field | Mediums | Source in Ghost |
|-------|---------|-----------------|
| `readingTime` | article | Ghost's built-in `reading_time` field |
| `featured` | article | Ghost's built-in `featured` field |
| `author` | reading | Ghost post `meta_title` or custom excerpt convention |
| `duration` | podcast | Ghost post `meta_description` or custom excerpt convention |
| `organization` | project | `#org-*` tag on the post |
| `technologies` | project | Regular (public) tags on the post |
| `status` | project | `#status-*` tag on the post |
| `project` | project | `#project-*` tag on the post |

---

## Project Convention

Projects use **individual posts with an umbrella tag** rather than a single updated post. This provides a natural timeline of updates and generates more content for the blog.

### How It Works

1. Each project gets an umbrella tag: `#project-fleet-analytics`
2. Every update, milestone, or write-up for that project is a separate Ghost post
3. All posts for a project share the same `#project-*` tag
4. The latest post's metadata represents the project's current state
5. Astro can aggregate all posts for a project into a project timeline page

### Example: Fleet Analytics Dashboard

| Post Title | Date | Status Tag | Purpose |
|------------|------|------------|---------|
| "Fleet Analytics Dashboard — Project Kickoff" | 2025-09-01 | `#status-in-progress` | Initial announcement, goals, tech stack |
| "Fleet Analytics — Telemetry Layer" | 2025-10-15 | `#status-in-progress` | Progress update on telemetry integration |
| "Fleet Analytics — v1.0 Release" | 2025-12-01 | `#status-complete` | Launch post, retrospective |

All three posts share: `#project-fleet-analytics`, `#org-fort-d-aeronomics`, `#medium-project`

### Project Statuses

| Ghost Tag | Display Value | Description |
|-----------|--------------|-------------|
| `#status-in-progress` | In Progress | Actively being worked on |
| `#status-complete` | Complete | Shipped / finished |
| `#status-archived` | Archived | No longer maintained or on hold |

---

## Technology / Topic Tags

Regular (non-prefixed) Ghost tags represent specific technologies, tools, or topics. These appear as public tags in Ghost and render as tech badges in the Astro UI.

| Ghost Tag | Slug | Category Affinity |
|-----------|------|-------------------|
| Kubernetes | `kubernetes` | DevOps, Cloud |
| Docker | `docker` | DevOps |
| Terraform | `terraform` | Cloud, DevOps |
| AWS | `aws` | Cloud |
| React | `react` | Frontend |
| TypeScript | `typescript` | Frontend, Backend |
| Go | `go` | Backend |
| Rust | `rust` | Backend |
| Node.js | `nodejs` | Backend |
| PostgreSQL | `postgresql` | Backend |
| Redis | `redis` | Backend |
| CI/CD | `ci-cd` | DevOps |
| Gardening | `gardening` | Homesteading |
| Community | `community` | Faith, Homesteading |

Technology tags are open-ended — add new ones freely in Ghost Admin as needed. No code changes required in Astro since they pass through as-is.

---

## Tagging Checklist

When creating a new Ghost post, apply the following tags:

- [ ] **One `#medium-*` tag** — what type of content is this?
- [ ] **One or more `#cat-*` tags** — what broad categories does it fall under?
- [ ] **Zero or more `#org-*` tags** — which organization is this associated with? (primarily for projects)
- [ ] **Zero or more regular tags** — what technologies or topics does it cover?
- [ ] **If `#medium-project`:**
  - [ ] One `#project-*` umbrella tag
  - [ ] One `#status-*` tag

---

## Ghost API Endpoints

The Astro SSG build fetches content from Ghost Content API endpoints. As new Ghost instances are set up for different organizations, add their API details here.

| Organization | Ghost URL | Content API Key | Status |
|-------------|-----------|-----------------|--------|
| Personal Profile | `http://personal-profile-ghost:2368` | _(set up in Ghost Admin → Integrations)_ | Active — needs API key |
| Fort D Aeronomics | _(TBD)_ | _(TBD)_ | Not yet deployed |
| St. Paul's Tentmakers | _(TBD)_ | _(TBD)_ | Not yet deployed |
| Dev Shop | _(TBD)_ | _(TBD)_ | Not yet deployed |

### Setting Up a Ghost Content API Key

1. Log into Ghost Admin (`/ghost`)
2. Go to Settings → Integrations → Add custom integration
3. Name it "Astro SSG" (or similar)
4. Copy the **Content API Key**
5. Add it to the appropriate environment configuration
6. Update this table with the endpoint and key status

---

## Mapping to Astro Types

Reference for how the normalization layer translates Ghost API data to Astro's `ContentItem` type.

| Astro Field | Ghost Source |
|-------------|-------------|
| `slug` | `post.slug` |
| `title` | `post.title` |
| `excerpt` | `post.excerpt` or `post.custom_excerpt` |
| `date` | `post.published_at` |
| `displayDate` | Formatted from `post.published_at` |
| `image` | `post.feature_image` |
| `medium` | Parsed from `#medium-*` tag |
| `readingTime` | `post.reading_time` (Ghost built-in) |
| `featured` | `post.featured` (Ghost built-in) |
| `author` | `post.primary_author.name` or convention for readings |
| `organization` | Parsed from `#org-*` tag → lookup display name |
| `categories` | Parsed from `#cat-*` tags → strip prefix |
| `tags` | Public tags (no prefix) → slugs |
| `technologies` | Same as `tags` (for projects) |
| `status` | Parsed from `#status-*` tag |
| `project` | Parsed from `#project-*` tag |
| `duration` | Convention: `post.meta_description` for podcasts |
