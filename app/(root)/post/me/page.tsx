import { PostCardLoading } from "@/components/custom/ui/post-card-loading"
import { buttonVariants } from "@/components/shadcn/ui/button"
import { currentUser } from "@/data/user-session/server"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { PageHeader } from "../_components/page-header"
const PostCardOwner = dynamic(() => import("@/components/custom/ui/post-card-owner"),
    {
        loading: () => <PostCardLoading />
    }
)


export default async function MyPosts() {

    const user = await currentUser()
    const posts = await db.post.findMany(
        {
            orderBy: {
                title: "asc"
            },
            where: { userId: user?.id },
            include: {
                category: true
            }
        }
    )


    return (

        <PageHeader
            content={
                <Link href="/post/create" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex items-center justify-center gap-4")}>
                    <Plus className="size-4" />
                    <p className="text-sm">
                        Create
                    </p>
                </Link>
            }
            backButtonHref="/"
            headerTitle="My Posts"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {posts.map((post) => <PostCardOwner post={post} key={post.id} />)}
            </div>
        </PageHeader>
    )
}
