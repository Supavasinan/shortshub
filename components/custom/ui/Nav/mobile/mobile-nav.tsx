
import { buttonVariants } from "@/components/shadcn/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger
} from "@/components/shadcn/ui/sheet"
import { cn } from "@/lib/utils"

import { NavigationConfig } from "@/config/navigation"
import { UserMenuConfig } from "@/config/user-menu"
import { SquareChevronLeft } from "lucide-react"
import { User } from "next-auth"
import Link from "next/link"
import { SignOutButton } from "../signout-button"
import PathName from "./path-name"
import { ThemesMenuMobileButton } from "./themes-mobile-button"

export default function MobileNav({ user }: { user?: User }) {
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
                                <span>{user.name}</span>
                                <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                            <div className="flex gap-2">
                                <ThemesMenuMobileButton />
                                <SignOutButton />
                            </div>
                        </div>
                    )}
                    <PathName />
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

                    {UserMenuConfig?.map((list) => {
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
