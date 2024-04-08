import { z } from "zod";

export const CreatePostSchema = z.object({
    title: z.string().min(1, { message: "Title is required" })
})

export const TitleInputSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(70, { message: "Title must be less than 70 characters" })
})

export const DescriptionInputSchema = z.object({
    description: z.string().max(500, { message: "Description must be less than 1000 characters" })
})


export const ShortcutsInputSchema = z.object({
    shortcut: z.array(
        z.object({
            id: z.string().min(1).optional(),
            label: z.string().min(1),
            value: z.string().min(1),
        })
    )
})