"use server"

import { currentUser } from "@/data/user-session/server";
import { db } from "@/lib/db";

export const deleteShortcut = async (
    shortcutId: string
) => {
    const user = await currentUser()

    if (!user || !user.id) return { error: "Unauthorized" };


    try {
        await db.postDetail.delete({
            where: {
                id: shortcutId
            }
        });

    } catch (error) {
        return { error };
    }

}