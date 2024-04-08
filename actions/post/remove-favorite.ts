"use server"

import { currentUser } from "@/data/user-session/server"
import { db } from "@/lib/db"

export const RemoveFavorite = async (
    favoriteId: string,
) => {

    const user = await currentUser()

    if (!user || !user.id) return { error: "Unauthorized" };

    try {

        await db.favoritePost.delete({
            where: {
                id: favoriteId
            }
        })

    } catch (error) {
        console.log(error)
    }
    return { success: "Favorite removed successfully!" }
}

