import { FavoriteButton } from "@/app/(root)/(marketing)/_components/favorite-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar";
import { Badge } from "@/components/shadcn/ui/badge";
import { Separator } from "@/components/shadcn/ui/separator";
import { PostPayload } from "@/prisma/payloads/post";
import { format } from 'date-fns';
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



export default async function PostCard({ post }: { post: PostPayload }) {
    return (
        <div className="group/post-card shadow-xl col-span-1 rounded-md dark:border transition-colors overflow-hidden relative">
            <div className=" absolute z-10 top-3 right-3">
                <FavoriteButton favorites={post.favoritePost} postId={post.id} />
            </div>
            <Link href={`/post/view/${post.id}`}>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center cursor-pointer">
                    {!post.imageUrl ? (
                        <ImageIcon className="size-10  text-muted-foreground" />
                    ) : (
                        <Image
                            src={post.imageUrl}
                            fill
                            className="object-cover group-hover/post-card:scale-125 transition-all rounded-md"
                            alt={post.title}
                        />
                    )}

                </div>
                <div className="py-4 px-2 space-y-4">
                    {post.categoryId && <Badge className="text-xs" variant={"secondary"}>{post.category?.name}</Badge>}
                    <p className="text-sm group-hover/post-card:underline text-balance truncate">
                        {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{format(post.updatedAt, 'LLLL d, yyyy')}</p>
                </div>
            </Link>

            <Separator />
            <div className="p-2 flex items-center justify-between">
                <div className="flex items-center justify-start gap-x-2">
                    <Avatar className="size-5">
                        {post.user?.image ? (
                            <AvatarImage src={post.user.image} alt={`@${post.user.name}`} />
                        ) : (
                            <AvatarFallback className="text-xs">{post.user?.name && post.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        )}
                    </Avatar>
                    {post.user && (
                        <p className="text-xs text-muted-foreground truncate w-16">
                            kdopskdopskdiopskd
                        </p>
                    )}
                </div>
                <p className="text-xs text-muted-foreground">
                    {post.favoritePost.length} {post.favoritePost.length > 1 ? "Likes" : "Like"}
                </p>
            </div>
        </div>
    );
}
