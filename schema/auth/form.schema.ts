import { z } from "zod"

export const SignInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be atleast 8 characters" }),
})

export const SignUpFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    password: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters" }),
    confirmPassword: z
        .string()
        .min(1, { message: "Confirm Password is required" }),
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password don't match",
    });


export const ResetPasswordSchema = z.object({
    email: z.string().email(),
})

export const NewPasswordSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters" }),
})