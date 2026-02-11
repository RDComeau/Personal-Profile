import * as React from "react"

export function AboutJourney() {
    return (
        <section className="py-16 bg-muted/40">
            <div className="mx-auto max-w-3xl px-4 space-y-6">
                <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-foreground">
                    My Journey
                </h2>

                <div className="space-y-5 text-base text-muted-foreground leading-relaxed">
                    <p>
                        My path into tech wasn't linear. When I was young and unsure about
                        direction, I decided that if I didn't know my path, the Navy would help me
                        find one. I spent nearly seven years in uniform&mdash;first as an aircraft
                        maintenance technician working on EA-18G Growlers, then as an office
                        administrator, and finally as a database administrator managing maintenance
                        systems and support equipment. The military gave me discipline, a bias
                        toward ownership, and an understanding that systems only work when someone
                        cares enough to maintain them.
                    </p>
                    <p>
                        When I left the service, COVID hit and many of my plans fell through. That's
                        when I turned toward software development. The VA sent me to a coding
                        bootcamp, and from there things moved fast: my first role building an
                        eCommerce platform, then a position at Vizient working on healthcare
                        applications, and eventually a consulting role at Plante Moran where I found
                        my footing in DevOps and cloud infrastructure. Along the way, I've also been
                        building FinTech software with Wealth Build as a contract engineer.
                    </p>
                    <p>
                        I'm deeply grateful for what the Veterans Affairs program made possible&mdash;the
                        bootcamp, my bachelor's degree, certifications, and soon a master's. But
                        the most important thing I gained wasn't a credential. It was the realization
                        that I'm someone who builds. Whether it's deployment pipelines, church
                        community infrastructure, or a loaf of sourdough, I want to make things
                        that work well and serve the people around me.
                    </p>
                </div>
            </div>
        </section>
    )
}
