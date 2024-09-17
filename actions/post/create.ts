"use server"
import { currentUser } from "@/data/user-session/server";
import { db } from "@/lib/db";
import { CreatePostSchema } from "@/schema/post";
import { z } from "zod";

export const createPost = async (values: z.infer<typeof CreatePostSchema>) => {

 const validatedFields = CreatePostSchema.safeParse(values);
 if (!validatedFields.success) return { error: "Invalid fields!" };

 const { title } = validatedFields.data;

 const user = await currentUser()

 if (!user || !user.id) return { error: "Unauthorized" };

 try {
  const newPost = await db.post.create({
   data: {
    userId: user?.id,
    title
   }
  })

  return { postId: newPost.id, success: "Post created successfully!" }
 } catch (error) {
  console.error(error)
 }

}