import { SectionContainer } from "@/components/custom/ui/Layout/section-container";
import { PostCardLoading } from "@/components/custom/ui/post-card-loading";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export default function IndexLoadingPages() {
    return (
        <SectionContainer className="mt-32 flex flex-col gap-4 items-center justify-center">
            <Skeleton className="h-32 w-4/6 rounded-lg " />
            <Skeleton className="h-12 w-3/5 rounded-lg " />
            <div className="flex gap-4">
                <Skeleton className="size-14 rounded-lg " />
                <Skeleton className="size-14 rounded-lg " />
                <Skeleton className="size-14 rounded-lg " />
            </div>
            <div className="mt-4 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                <PostCardLoading />
                <PostCardLoading />
                <PostCardLoading />
                <PostCardLoading />
                <PostCardLoading />
            </div>
        </SectionContainer>
    )
}
