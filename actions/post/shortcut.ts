"use server"

import { currentUser } from "@/data/user-session/server";
import { db } from "@/lib/db";
import { ShortcutsInputSchema } from "@/schema/post";
import { z } from "zod";

export const setShortCut = async (
    values: z.infer<typeof ShortcutsInputSchema>,
    postId: string
) => {
    const user = await currentUser()

    if (!user || !user.id) return { error: "Unauthorized" };


    const validatedFields = ShortcutsInputSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { shortcut } = validatedFields.data;



    for (const data of shortcut) {



        try {
            const existingShortcut = await db.postDetail.findMany({
                where: {
                    id: data.id
                }
            })

            if (existingShortcut.length > 0) {
                await db.postDetail.update({
                    where: {
                        id: data.id
                    },
                    data: {
                        value: data.value,
                        label: data.label
                    }
                })
            } else {
                await db.postDetail.create({
                    data: {
                        postId,
                        value: data.value,
                        label: data.label
                    }
                });
            }

        } catch (error) {
            return { error };
        }
    }
}