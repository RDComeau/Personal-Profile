export type Role = {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string | "Present"
    type: "full-time" | "contract" | "military"
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
