import { HeroIcons } from "./hero-icons"

const supports = [
    {
        name: "vs-code",
        icon: HeroIcons.vscode
    },
    {
        name: "figma",
        icon: HeroIcons.figma
    },
    {
        name: "apex",
        icon: HeroIcons.apex
    },
    {
        name: "valorant",
        icon: HeroIcons.valorant
    },
]

export function HeroSupports() {
    return (
        <div className="space-y-8">
            <span className="text-xs text-muted-foreground">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, eveniet?</span>
            <div className="grid grid-cols-4 gap-4 px-8">
                {supports.map((support) => (
                    <div key={support.name} className="group justify-self-center">
                        <support.icon className="size-7 lg:size-8 group-hover:stroke-primary" />
                    </div>
                ))}
            </div>
        </div>
    )
}
