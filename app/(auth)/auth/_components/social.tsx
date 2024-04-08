"use client"
import { Button } from "@/components/shadcn/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function Social() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const onClick = (provider: "github") => {
        signIn(provider, {
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
    }
    return (
        <div className="w-full">
            <Button onClick={() => onClick("github")} variant={"default"} size={"lg"} className="w-full space-x-4">
                <Github className="size-4 text-muted-foreground" />
                <span>Continue with Github</span>
            </Button>
        </div>
    )
}
