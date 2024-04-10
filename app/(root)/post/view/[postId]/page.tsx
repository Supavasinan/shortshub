import { Badge } from "@/components/shadcn/ui/badge"
import { buttonVariants } from "@/components/shadcn/ui/button"
import { currentUser } from "@/data/user-session/server"
import { db } from "@/lib/db"
import { absoluteUrl, cn } from "@/lib/utils"
import { Dot, Keyboard, Pencil } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PageHeader } from "../../_components/page-header"
import { Metadata } from "next/types"


type Props = {
  params: {
    postId: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const post = await db.post.findUnique({
    where: {
      id: params.postId
    },
    include: {
      category: true,
      user: true,
      postDetail: true
    }
  })

  return {
    title: post?.title,
    description: post?.description,
    category: post?.category?.name,
    authors: { name: post?.user.name || "Anonymous", url: post?.user.image || "" },
    creator: post?.user.name,
    openGraph: {
      title: post?.title,
      description: post?.description || "No description provided",
      url: absoluteUrl(`/post/view/${post?.id}`),
      images: [
        {
          url: post?.imageUrl || "",
          width: 800,
          height: 600
        }
      ],

    },
    twitter: {
      card: "summary_large_image",
      title: post?.title,
      description: post?.description || "No description provided",
      images: [
        {
          url: post?.imageUrl || "",
          width: 800,
          height: 600
        }
      ]
    },
  }
}


export default async function PostView({ params }: Props) {

  const user = await currentUser()
  const post = await db.post.findUnique({
    where: {
      id: params.postId
    },
    include: {
      category: true,
      user: true,
      postDetail: true
    }
  })
  if (!post) return redirect("/post/create")
  const isOwnPost = post.user.id === user?.id

  return (
    <PageHeader
      backButtonHref="/"
      headerTitle="Back"
    >
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          <div className=" aspect-video">
            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                fill
                alt={post.title}
                className="object-contain"
                sizes="(min-width: 760px) 672px, 91.82vw"
                loading="lazy"
              />
            )}

          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 justify-start items-start">
          {isOwnPost && (
            <Link href={`/post/edit/${post.id}`} className={cn(buttonVariants({ variant: "ghost" }), "self-end flex items-center justify-center gap-3")}>
              <Pencil className="size-4" />
              <p className="text-sm">Edit Post</p>
            </Link>
          )}
          {post.category?.name && (
            <Badge variant="secondary" className="self-end">
              {post.category?.name}
            </Badge>
          )}
          <p className="text-base md:text-xl font-semibold">{post.title}</p>
          <p className="text-balance text-sm md:text-base text-muted-foreground">
            {post.description}
          </p>
          <div className="border rounded-lg w-full p-6 mt-3 space-y-3">
            <div className="flex items-center justify-start gap-2">
              <p className="underline font-medium">Shortcuts</p>
              <Keyboard className="size-4" />
            </div>
            {post.postDetail.map((detail) => (
              <div key={detail.id}>
                <div className="flex items-start justify-start gap-2">
                  <Dot className="size-6" />
                  <p className="text-sm bg-card-foreground text-primary-foreground px-3 py-1 rounded-xl">{detail.value}</p>
                  <p>{detail.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageHeader>
  )
}
