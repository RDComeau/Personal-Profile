export type RoleType = "org" | "full-time" | "contract" | "military" | "project" | "education" | "community"

export type Role = {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string | "Present"
    type: RoleType
    highlights: string[]
    technologies?: string[]
}

export type SkillCategory = {
    name: string
    skills: string[]
}

export type PersonalInterest = {
    title: string
    description: string
    icon: string
}

export type CompanyDef = {
    name: string
    colorClass: string
}
