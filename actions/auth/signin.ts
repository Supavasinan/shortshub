"use server"

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { SignInFormSchema } from "@/schema/auth/form.schema";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function onSubmitSignIn(
    values: z.infer<typeof SignInFormSchema>,
    callbackUrl?: string | null,
): Promise<{ error?: string; success?: string }> {
    const validatedFields = SignInFormSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email or password is incorrect" }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
        return { success: "Sign in successful!" }
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === "CallbackRouteError") {
                // @ts-ignore
                if (error.cause?.provider === "credentials" && error.cause?.err?.input === "user-not-verified") {
                    return { error: "Email not verified or click forgot password to resend email" }
                }
            }

            if (error.type === "CredentialsSignin") {
                // @ts-ignore
                if (error.code === "credentials" && error.kind === "signIn") {
                    return { error: "Email or password is incorrect" }
                }
            }

            return { error: "Something went wrong!" }
        }
        throw error;
    }

}