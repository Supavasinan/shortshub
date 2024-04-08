"use server";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { generateSalt } from "@/lib/generate-salt";
import { NewPasswordSchema } from "@/schema/auth/form.schema";
import bcrypt from "bcryptjs";
import { z } from "zod";
export async function newPassword(
    values: z.infer<typeof NewPasswordSchema>,
    token: string
): Promise<{ error?: string; success?: string }> {

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { error: "Email does not exist!" }
    }

    const salt = await generateSalt()

    const hashedPassword = await bcrypt.hash(password, salt);

    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword, passwordSalt: salt },
    });

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    });

    return { success: "Password updated!" };
}