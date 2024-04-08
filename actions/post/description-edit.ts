"use server"

import { currentUser } from "@/data/user-session/server";
import { db } from "@/lib/db";
import { DescriptionInputSchema } from "@/schema/post"
import { z } from "zod";

export const onDescriptionEdit = async (
    values: z.infer<typeof DescriptionInputSchema>,
    postId: string
) => {

    const validatedFields = DescriptionInputSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { description } = validatedFields.data;
    const user = await currentUser()

    if (!user || !user.id) return { error: "Unauthorized" };
    await db.post.update({
        where: {
            userId: user?.id,
            id: postId
        },
        data: {
            description
        }
    })

}