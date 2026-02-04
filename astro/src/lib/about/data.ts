import type { Role, SkillCategory, PersonalInterest } from "./types"

export const roles: Role[] = [
    {
        title: "Senior Consultant",
        company: "Plante Moran",
        location: "Remote",
        startDate: "Feb 2023",
        endDate: "Present",
        type: "full-time",
        highlights: [
            "Own the CI/CD pipeline strategy across Azure DevOps and GitHub Actions, reducing deployment cycle times and improving release reliability for enterprise applications",
            "Architect and provision Azure cloud resources using Pulumi and Bicep, including virtual networks, API Management, and Key Vault integrations",
            "Developed structured deployment checklists and standardized forms that improved process transparency and reduced deployment errors across the team",
            "Cleaned up and optimized 350+ repositories, removing legacy scripts and streamlining the transition to SaaS-based backup services",
            "Contributed to API development on .NET projects, refining controller endpoints and Swagger documentation for Azure API Management",
        ],
        technologies: ["C#", ".NET", "TypeScript", "Azure", "GitHub Actions", "Pulumi", "SQL Server", "React"],
    },
    {
        title: "Software Engineer & DevOps Lead",
        company: "Wealth Build",
        location: "Remote",
        startDate: "Oct 2021",
        endDate: "Present",
        type: "contract",
        highlights: [
            "Led coordination, development, and deployment of enterprise-ready FinTech software from the ground up",
            "Implemented Azure CI/CD pipelines for building, scanning, and deploying software with vulnerability checks baked into every release",
            "Architected cloud infrastructure using Pulumi and Azure Bicep to meet the demands of a growing user base",
            "Designed the backend with an N-Tier architecture in .NET, coordinating auth, API controllers, SQL migrations, repositories, and service logic",
            "Mentored junior engineers in Agile principles, test-driven development, and design patterns",
        ],
        technologies: ["C#", ".NET", "React", "Azure", "Pulumi", "SQL Server", "Contentful"],
    },
    {
        title: "Software Engineer",
        company: "Vizient",
        location: "Cape Girardeau, MO",
        startDate: "Sep 2020",
        endDate: "Feb 2023",
        type: "full-time",
        highlights: [
            "Developed full-stack solutions using TDD and pair programming for Vizient's healthcare platforms",
            "Built web and desktop applications with C#, ASP.NET, Entity Framework, and AngularJS in a client-server architecture",
            "Wrote complex SQL queries, stored procedures, and database migrations in T-SQL against Microsoft SQL Server",
            "Integrated third-party tools including Wrike, Tableau, and Power BI, creating better reporting transparency across the organization",
            "Progressed from Associate Software Engineer to Software Engineer based on performance and growing ownership",
        ],
        technologies: ["C#", "ASP.NET", "AngularJS", "SQL Server", "Entity Framework", "LINQ"],
    },
    {
        title: "Full Stack Developer",
        company: "WebMall",
        location: "Remote",
        startDate: "May 2020",
        endDate: "Aug 2020",
        type: "full-time",
        highlights: [
            "Built the data layer, .NET API controllers, and React dashboard for an innovative live-stream eCommerce platform",
            "Created reusable React components for an accessible inventory management UI",
            "Designed SQL stored procedures for the .NET backend to handle CRUD operations across multiple tables",
        ],
        technologies: ["C#", ".NET", "React", "SQL Server"],
    },
    {
        title: "Database Administrator & Program Manager",
        company: "US Navy",
        location: "Lemoore, CA",
        startDate: "May 2017",
        endDate: "Mar 2020",
        type: "military",
        highlights: [
            "Managed database records, user roles, and access controls for maintenance department systems",
            "Created and implemented query searches to track maintenance actions, inventory, and personnel hours",
            "Initiated and tracked 240+ maintenance actions across 500 support equipment assets, achieving a 98% ready-for-issue rate",
        ],
        technologies: ["SQL Server"],
    },
    {
        title: "Office Administrator",
        company: "US Navy",
        location: "Bremerton, WA",
        startDate: "Feb 2016",
        endDate: "May 2017",
        type: "military",
        highlights: [
            "Managed administrative records for 138 sailors and Marine division officers",
            "Screened 674 correspondences and logged 2,080 training lectures",
            "Assisted in 152 habitability inspections, identifying and correcting 430 material discrepancies",
        ],
    },
    {
        title: "Aircraft Maintenance Technician",
        company: "US Navy",
        location: "Oak Harbor, WA",
        startDate: "Sep 2013",
        endDate: "Feb 2016",
        type: "military",
        highlights: [
            "Responsible for safe launch, recovery, and daily inspection of EA-18G Growler aircraft",
            "Launched and recovered 114 aircraft, performed 104 daily inspections, and completed 103 engine oil services",
            "Maintained 100% safety record for pilots and ground crew during all operations",
        ],
    },
]

export const skillCategories: SkillCategory[] = [
    {
        name: "Languages",
        skills: ["TypeScript", "C#", "Python", "Go", "Rust", "SQL", "JavaScript"],
    },
    {
        name: "Frontend",
        skills: ["React", "Astro", "Tailwind CSS", "Next.js"],
    },
    {
        name: "Backend",
        skills: [".NET", "ASP.NET", "Node.js", "Entity Framework"],
    },
    {
        name: "Cloud & DevOps",
        skills: ["Azure", "Docker", "GitHub Actions", "Pulumi", "Terraform", "CI/CD Pipelines"],
    },
    {
        name: "Data",
        skills: ["SQL Server", "PostgreSQL", "Redis", "SQLite"],
    },
    {
        name: "Practices",
        skills: ["Agile/Scrum", "Test-Driven Development", "Infrastructure as Code", "Pair Programming"],
    },
]

export const personalInterests: PersonalInterest[] = [
    {
        title: "Faith & Community",
        description: "Treasurer and council member at St. Justin's Orthodox Church. My faith shapes how I think about service, stewardship, and building things that last.",
        icon: "church",
    },
    {
        title: "Strategy Games",
        description: "Devoted Paradox player\u2014Stellaris, CK3, Europa Universalis, Victoria 3\u2014and Total War veteran. I also collect Fantasy Flight board games. These scratch the same itch as systems architecture: complex, interconnected problems with no single right answer.",
        icon: "gamepad",
    },
    {
        title: "Making Things",
        description: "3D printing and baking. There's something grounding about working with your hands after a day of working with abstractions. The feedback loop is immediate and the results are tangible\u2014sometimes delicious.",
        icon: "printer",
    },
    {
        title: "Continuous Learning",
        description: "Currently pursuing a master's degree. Heavy Obsidian user for knowledge management. I read broadly\u2014theology, economics (Georgism, specifically), systems thinking\u2014because the best engineering decisions come from understanding context beyond the code.",
        icon: "book",
    },
]
