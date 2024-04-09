import { Badge } from "@/components/shadcn/ui/badge";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


type Post = Prisma.PostGetPayload<{
    include: {
        category: true,
    }
}>;



export default function PostCardOwner({ post }: { post: Post }) {
    return (
        <div className="group/post-card shadow-xl col-span-1 rounded-md transition-colors overflow-hidden relative">
            <Link href={`/post/edit/${post.id}`}>
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
                <div className="py-4 space-y-4">
                    {post.categoryId && <Badge className="text-xs" variant={"secondary"}>{post.category?.name}</Badge>}
                    <p className="text-sm group-hover/post-card:underline text-balance truncate">
                        {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{format(post.updatedAt, 'LLLL d, yyyy')}</p>
                </div>
            </Link>
        </div>
    )
}
