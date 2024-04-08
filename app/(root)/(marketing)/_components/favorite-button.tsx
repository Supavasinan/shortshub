"use client"
import { Button, buttonVariants } from "@/components/shadcn/ui/button";
import useFavorite from "@/hooks/use-favorite";
import { cn } from "@/lib/utils";
import { FavoritePost } from "@prisma/client";
import { Heart, Loader } from "lucide-react";

export function FavoriteButton({ postId, favorites }: { postId: string, favorites: FavoritePost[] | null }) {
    const { hasFavorited, toggleFavorite, isPending } = useFavorite({
        postId,
        favorites
    });

    return (
        <Button variant={"outline"} size={"icon"} disabled={isPending} onClick={toggleFavorite} className="group/favorite-button cursor-pointer">
            {isPending ? <Loader className="animate-spin size-3 md:size-4 " /> : <Heart className={cn(
                "size-4 md:size-5 group-hover/favorite-button:stroke-red-500 animate-in transition-all",
                hasFavorited && "fill-red-500 stroke-red-500"
            )} />}
        </Button>
    )
}