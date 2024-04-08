import { z } from "zod";

export const ProfileFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
})