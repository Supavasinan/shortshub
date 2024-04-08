"use client"

import { onSignOut } from "@/actions/auth/signout";
import { Button } from "@/components/shadcn/ui/button";
import { CircleArrowOutUpRight, Loader } from "lucide-react";
import { useTransition } from "react";

export function SignOutButton() {
    const [isPending, startTransition] = useTransition();

    async function SignOut() {
        startTransition(() => onSignOut())
    }
    return (
        <Button variant="ghost" size="icon" disabled={isPending} onClick={SignOut}>
            {isPending ? <Loader className="animate-spin size-4" /> : <CircleArrowOutUpRight className="size-4 text-red-500" />}
        </Button>
    )
}
