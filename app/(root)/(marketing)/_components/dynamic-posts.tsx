import { SectionContainer } from "@/components/custom/ui/Layout/section-container"
import { PostCardLoading } from "@/components/custom/ui/post-card-loading"
import { PostPayload } from "@/prisma/payloads/post"
import dynamic from "next/dynamic"
const PostCard = dynamic(() => import("@/components/custom/ui/post-card"),
  {
    loading: () => <PostCardLoading />
  }
)


export function DynamicPosts({ posts }: { posts: PostPayload[] }) {
  return (
    <SectionContainer className="py-6">
      <div className="   
            grid 
            grid-cols-2
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-4
            ">

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}


      </div>

    </SectionContainer >
  )
}
