import { SectionContainer } from "@/components/custom/ui/Layout/section-container"
import { buttonVariants } from "@/components/shadcn/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

type PageProps = {
    children: React.ReactNode
    headerTitle: string
    backButtonHref: string
    content?: React.ReactNode
    className?: string
}


export function PageHeader({ children, headerTitle, backButtonHref, content, className }: PageProps) {
    return (
        <SectionContainer className={cn("py-6", className)}>
            <div className="flex items-center justify-between ">
                <div className="flex items-center justify-center gap-x-4">
                    <Link href={backButtonHref} className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                        <ChevronLeft />
                    </Link>
                    <h1 className="text-base md:text-md">{headerTitle}</h1>
                </div>
                {content}
            </div>
            <div className="mt-4">
                {children}
            </div>
        </SectionContainer>
    )
}
