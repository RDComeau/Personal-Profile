import {Button} from "../ui/button.tsx"
import {useTypingEffect} from "@/hooks/useTypingEffect"

const titles = [
    "Builder.",
    "Platform Engineer.",
    "DevOps Expert.",
    "Cloud Architect.",
    "Infrastructure Developer.",
    "Homestead Enthusiast.",
]

const HomeHero = () => {
    const {displayText, isIdle} = useTypingEffect(titles, 100, 75, 2000)

    return <section className="relative h-[calc(100vh-3.5rem)] overflow-hidden">
        {/*<VideoOrImageBackground/> /!* Devon-style *!/*/}
        <div className="absolute inset-0 bg-black/40"/>
        {/* overlay */}

        <div className="relative z-10 flex h-full items-center justify-center">
            <div className="text-center max-w-2xl space-y-4">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                    Senior Cloud & DevOps Engineer
                </p>

                <h1 className="text-4xl md:text-6xl font-semibold">
                    Richard Comeau
                </h1>
                <p className="text-2xl md:text-4xl font-semibold italic whitespace-nowrap">
                    {displayText}
                    <span className={isIdle ? "animate-pulse" : ""}>|</span>
                </p>

                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Helping teams ship reliable cloud infrastructure, while building a sustainable homestead life.
                </p>

                <div className="flex items-center justify-center gap-3 pt-4">
                    <Button size="lg" asChild>
                        <a href="/contact">Work with me</a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <a href="/about">Learn more</a>
                    </Button>
                </div>

                {/*<SocialLinksStrip/> /!* Adrian-style social bar *!/*/}
            </div>
        </div>
    </section>

}

export default HomeHero;
