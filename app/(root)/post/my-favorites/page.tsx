import { PostCardLoading } from "@/components/custom/ui/post-card-loading"
import { currentUser } from "@/data/user-session/server"
import { db } from "@/lib/db"
import dynamic from "next/dynamic"
import { PageHeader } from "../_components/page-header"
const PostCard = dynamic(() => import("@/components/custom/ui/post-card"),
  {
    loading: () => <PostCardLoading />
  }
)

export default async function MyFavorites() {

    const user = await currentUser()

    const posts = await db.post.findMany({
        where: {
            favoritePost: {
                some: {
                    userId: user?.id
                }
            }
        },
        include: {
            category: true,
            user: true,
            favoritePost: true
        }
    })

    return (
        <PageHeader
            backButtonHref="/"
            headerTitle="My Favorites"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </PageHeader>
    )
}
