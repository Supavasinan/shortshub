"use server"

import { currentUser } from "@/data/user-session/server"
import { db } from "@/lib/db"

export const AddFavorite = async (
    postId: string,
) => {

    const user = await currentUser()

    if (!user || !user.id) return { error: "Unauthorized" };

    try {
        const favorite = await db.favoritePost.create({
            data: {
                userId: user.id,
                postId
            }
        })

        return { favorite }
    } catch (error) {
        console.log(error)
    }

}
