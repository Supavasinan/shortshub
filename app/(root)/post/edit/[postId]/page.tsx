import { currentUser } from "@/data/user-session/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { PageHeader } from "../../_components/page-header";
import { CategoryForm } from "../_components/category-form";
import { DeleteButton } from "../_components/delete-button";
import { DescriptionForm } from "../_components/description-form";
import { ShortcutForm } from "../_components/shortcut-form";
import { TitleForm } from "../_components/title-form";
import { ImageForm } from "../_components/upload-image";

type EditProps = {
    params: {
        postId: string
    }
}


export default async function EditPostPage({ params }: EditProps) {

    const user = await currentUser()

    const post = await db.post.findUnique({
        where: {
            id: params.postId,
            userId: user?.id
        },
        include: {
            postDetail: true
        }
    })

    const categories = await db.category.findMany()


    if (!post) return redirect("/post/create")


    const requiredFields = [
        post.title,
        post.description,
        post.imageUrl,
        post.categoryId,
    ];

    const totalFields = requiredFields.length;

    const completedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${completedFields}/${totalFields})`;


    return (
        <PageHeader
            content={
                <DeleteButton postId={post.id} />
            }
            headerTitle="Edit Post"
            backButtonHref="/post/me"
        >
            <p className="text-sm mb-4">
                Complete all fields {completionText}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1fr]  items-start gap-4">
                <div className="flex flex-col gap-y-4 flex-1 w-full">
                    <TitleForm
                        title={post.title}
                        postId={post.id}
                    />
                    <DescriptionForm
                        description={post.description}
                        postId={post.id}
                    />
                    <CategoryForm
                        initCategoryId={post.categoryId}
                        categories={categories}
                        postId={post.id}
                    />
                    <ShortcutForm
                        postId={post.id}
                        initShortcut={post.postDetail}
                    />
                </div>
                <ImageForm
                    imageUrl={post.imageUrl}
                    postId={post.id}
                />
            </div>
        </PageHeader>
    )
}
