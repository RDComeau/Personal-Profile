import type { Role, RoleType, SkillCategory, PersonalInterest, CompanyDef } from "./types"

export const companyColors: Record<string, CompanyDef> = {
    "Plante Moran": { name: "Plante Moran", colorClass: "bg-emerald-100 text-emerald-800" },
    "Wealth Build": { name: "Wealth Build", colorClass: "bg-amber-100 text-amber-800" },
    "Vizient": { name: "Vizient", colorClass: "bg-sky-100 text-sky-800" },
    "WebMall": { name: "WebMall", colorClass: "bg-violet-100 text-violet-800" },
    "US Navy": { name: "US Navy", colorClass: "bg-blue-100 text-blue-800" },
    "St. Paul's Tentmakers": { name: "St. Paul's Tentmakers", colorClass: "bg-purple-100 text-purple-800" },
    "Drone Side": { name: "Drone Side", colorClass: "bg-orange-100 text-orange-800" },
    "Self": { name: "Self", colorClass: "bg-zinc-100 text-zinc-800" },
    "St. Justin's Orthodox Church": { name: "St. Justin's Orthodox Church", colorClass: "bg-rose-100 text-rose-800" },
    "Veterans SRG": { name: "Veterans SRG", colorClass: "bg-teal-100 text-teal-800" },
}

export const typeLabels: Record<RoleType, { label: string; className: string }> = {
    "full-time": { label: "Full-time", className: "bg-sky-100 text-sky-800" },
    "contract": { label: "Contract", className: "bg-amber-100 text-amber-800" },
    "military": { label: "Military", className: "bg-blue-100 text-blue-800" },
    "venture": { label: "Venture", className: "bg-green-100 text-green-800" },
    "education": { label: "Education", className: "bg-indigo-100 text-indigo-800" },
    "community": { label: "Community", className: "bg-rose-100 text-rose-800" },
}

export const roles: Role[] = [
    // ── Employment ──────────────────────────────────────────
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
        startDate: "Jan 2022",
        endDate: "Feb 2023",
        type: "full-time",
        highlights: [
            "Developed full-stack solutions using TDD and pair programming for Vizient's healthcare platforms",
            "Built web and desktop applications with C#, ASP.NET, Entity Framework, and AngularJS in a client-server architecture",
            "Wrote complex SQL queries, stored procedures, and database migrations in T-SQL against Microsoft SQL Server",
            "Integrated third-party tools including Wrike, Tableau, and Power BI, creating better reporting transparency across the organization",
        ],
        technologies: ["C#", "ASP.NET", "AngularJS", "SQL Server", "Entity Framework", "LINQ"],
    },
    {
        title: "Associate Software Engineer",
        company: "Vizient",
        location: "Cape Girardeau, MO",
        startDate: "Sep 2020",
        endDate: "Jan 2022",
        type: "full-time",
        highlights: [
            "Developed full-stack solutions for Vizient's healthcare platforms, growing into increasing ownership of features and deployments",
            "Built proficiency in OOP design patterns, SDLC processes, and relational database development",
            "Promoted to Software Engineer based on performance and expanding responsibilities",
        ],
        technologies: ["C#", "ASP.NET", "AngularJS", "SQL Server"],
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

    // ── Military ────────────────────────────────────────────
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

    // ── Ventures ────────────────────────────────────────────
    {
        title: "Co-Founder",
        company: "St. Paul's Tentmakers",
        location: "Cape Girardeau, MO",
        startDate: "2024",
        endDate: "Present",
        type: "venture",
        highlights: [
            "Building a faith-driven technology consultancy that serves churches and nonprofits with modern software solutions",
            "Developing custom applications for event coordination, community management, and organizational operations",
        ],
        technologies: ["Astro", "Node.js", "SQLite", "React"],
    },
    {
        title: "Founder",
        company: "Drone Side",
        location: "Cape Girardeau, MO",
        startDate: "2024",
        endDate: "Present",
        type: "venture",
        highlights: [
            "Launching a drone services business offering aerial photography, videography, and site surveying",
            "Building the operational and technical infrastructure to serve local businesses and real estate",
        ],
    },
    {
        title: "Personal Portfolio & Blog",
        company: "Self",
        location: "Remote",
        startDate: "2025",
        endDate: "Present",
        type: "venture",
        highlights: [
            "Designed and built this site as a content hub for articles, podcasts, book notes, and project showcases",
            "Astro v5 static site with React islands, Tailwind v4, and a data layer ready for Ghost CMS integration",
        ],
        technologies: ["Astro", "React", "TypeScript", "Tailwind CSS"],
    },

    // ── Education ───────────────────────────────────────────
    {
        title: "Master's Degree (In Progress)",
        company: "Self",
        location: "Remote",
        startDate: "2025",
        endDate: "Present",
        type: "education",
        highlights: [
            "Pursuing a graduate degree to deepen expertise in AI/ML and advanced software engineering",
            "Funded through Veterans Affairs educational benefits",
        ],
    },
    {
        title: "Bachelor's Degree in Software Development",
        company: "Self",
        location: "Remote",
        startDate: "2019",
        endDate: "2021",
        type: "education",
        highlights: [
            "Completed undergraduate studies while transitioning from military service to software engineering",
            "Funded through the GI Bill and Veterans Affairs programs",
        ],
    },
    {
        title: "Coding Bootcamp",
        company: "Self",
        location: "Remote",
        startDate: "2020",
        endDate: "2020",
        type: "education",
        highlights: [
            "Intensive full-stack development program covering .NET, React, SQL, and Agile practices",
            "First step into professional software development, funded by the VA",
        ],
        technologies: ["C#", ".NET", "React", "SQL Server"],
    },

    // ── Community ───────────────────────────────────────────
    {
        title: "Treasurer & Council Member",
        company: "St. Justin's Orthodox Church",
        location: "Cape Girardeau, MO",
        startDate: "2023",
        endDate: "Present",
        type: "community",
        highlights: [
            "Manage church finances, budgeting, and financial reporting as elected treasurer",
            "Serve on the parish council, helping shape organizational decisions and community direction",
        ],
    },
    {
        title: "Veterans Staff Resource Group Member",
        company: "Veterans SRG",
        location: "Plante Moran",
        startDate: "2023",
        endDate: "Present",
        type: "community",
        highlights: [
            "Active member of the firm's Veterans SRG, supporting veteran inclusion and networking across the organization",
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
