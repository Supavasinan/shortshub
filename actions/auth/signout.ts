"use server"

import { signOut } from "@/auth";

export async function onSignOut() {
    await signOut();
}