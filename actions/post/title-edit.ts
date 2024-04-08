"use server"

import { currentUser } from "@/data/user-session/server";
import { db } from "@/lib/db";
import { TitleInputSchema } from "@/schema/post"
import { z } from "zod";

export const onTitleEdit = async (
    values: z.infer<typeof TitleInputSchema>,
    postId: string
) => {

    const validatedFields = TitleInputSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { title } = validatedFields.data;
    const user = await currentUser()

    if (!user || !user.id) return { error: "Unauthorized" };

    await db.post.update({
        where: {
            userId: user?.id,
            id: postId
        },
        data: {
            title
        }
    })

}