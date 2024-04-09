"use server"

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { generateSalt } from "@/lib/generate-salt";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SignUpFormSchema } from "@/schema/auth/form.schema";
import bcrypt from "bcryptjs";
import { z } from "zod";


export async function onSubmitSignUp(
    values: z.infer<typeof SignUpFormSchema>
): Promise<{ error?: string; success?: string }> {
    const validatedFields = SignUpFormSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { name, email, password, confirmPassword } = validatedFields.data

    if (password !== confirmPassword) {
        return { error: "Passwords don't match!" };
    }

    const salt = await generateSalt()

    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already exists!" };
    }

    await db.user.create({
        data: {
            name,
            email,
            passwordSalt: salt,
            password: hashedPassword,
        }
    })


    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        name,
        verificationToken.token,
    );

    return { success: "Please check your mail to verify your account" };
}