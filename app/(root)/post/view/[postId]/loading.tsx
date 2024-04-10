import { SectionContainer } from "@/components/custom/ui/Layout/section-container";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export default function ViewLoadingPage() {
    return (
        <SectionContainer className="py-6">
            <div className="max-w-2xl mx-auto">
                <Skeleton className="w-full aspect-video" />
                <Skeleton className="w-full h-11 mt-4" />
                <div className="space-y-2 mt-3">
                    <Skeleton className="w-[390px] h-6" />
                    <Skeleton className="w-[290px] -7 h-6" />
                    <Skeleton className="w-[200px] -7 h-6" />

                </div>
            </div>
        </SectionContainer>
    )
}
