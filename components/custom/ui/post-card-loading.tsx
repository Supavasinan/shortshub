import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function PostCardLoading() {
    return (
        <div className="w-full h-full flex flex-col justify-between gap-2">
            <Skeleton className="h-40" />
            <Skeleton className="h-4" />
            <Skeleton className="h-4" />
            <Skeleton className="h-10" />
        </div>
    )
}
