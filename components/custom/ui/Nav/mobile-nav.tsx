
import { buttonVariants } from "@/components/shadcn/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/shadcn/ui/sheet"
import { cn } from "@/lib/utils"

import { NavigationConfig } from "@/config/navigation"
import { SquareChevronLeft } from "lucide-react"
import { User } from "next-auth"
import Link from "next/link"
import { SignOutButton } from "./signout-button"
import { UserMenuConfig } from "@/config/user-menu"
type MobileNavProps = {
    headerTitle?: string
    user?: User
}

export default function MobileNav({ headerTitle, user }: MobileNavProps) {

    if (!user) return (
        <Sheet >
            <SheetTrigger className="lg:hidden">
                <SquareChevronLeft />
            </SheetTrigger>
            <SheetContent className="flex gap-3 flex-col">
                <ul className="overflow-y-auto">
                    {NavigationConfig?.map((list) => {
                        if ((list.show === "unAuth" && !user) || list.show === "public") {
                            return (
                                <Link
                                    key={list.label}
                                    href={list.href}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "sm" }),
                                        "flex align-center gap-3 justify-start w-full",
                                    )}>
                                    <list.icon className="size-4" />
                                    <span className="text-sm font-light">{list.label}</span>
                                </Link>
                            );
                        }
                        return null;
                    })}
                    {UserMenuConfig?.map((list) => {
                        if ((list.show === "unAuth" && !user) || list.show === "public") {
                            return (
                                <Link
                                    key={list.label}
                                    href={list.href}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "sm" }),
                                        "flex align-center gap-3 justify-start w-full",
                                    )}>
                                    <list.icon className="size-4" />
                                    <span className="text-sm font-light">{list.label}</span>
                                </Link>
                            );
                        }
                        return null;
                    })}
                </ul>

            </SheetContent>
        </Sheet>
    )

    const { name, email } = user


    return (
        <Sheet >
            <SheetTrigger className="lg:hidden">
                <SquareChevronLeft />
            </SheetTrigger>
            <SheetContent className="flex gap-3 flex-col">
                <SheetHeader className="gap-2">
                    {user && (
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col justify-center items-start">
                                <span>{name}</span>
                                <span className="text-xs text-muted-foreground">{email}</span>
                            </div>
                            <SignOutButton />
                        </div>
                    )}
                    <SheetTitle className="text-start">{headerTitle}</SheetTitle>
                </SheetHeader>
                <ul className="overflow-y-auto">
                    {NavigationConfig?.map((list) => {
                        if ((list.show === "onAuth" && user) || (list.show === "unAuth" && !user) || list.show === "public") {
                            return (
                                <Link
                                    key={list.label}
                                    href={list.href}
                                    className={cn(
                                        buttonVariants({ variant: "ghost", size: "sm" }),
                                        "flex align-center gap-3 justify-start w-full",
                                    )}>
                                    <list.icon className="size-4" />
                                    <span className="text-sm font-light">{list.label}</span>
                                </Link>
                            );
                        }
                        return null;
                    })}
                </ul>
            </SheetContent>
        </Sheet>

    )
}
