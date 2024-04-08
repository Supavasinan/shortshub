"use server"

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetPasswordSchema } from "@/schema/auth/form.schema";
import { z } from "zod";

export async function sendResetPassword(
    values: z.infer<typeof ResetPasswordSchema>
): Promise<{ error?: string; success?: string }> {
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { email } = validatedFields.data;


    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "Email not found!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    );

    return { success: "Reset email sent!" };
}