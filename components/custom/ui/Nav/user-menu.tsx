"use client"

import { onSignOut } from "@/actions/auth/signout"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger
} from "@/components/shadcn/ui/menubar"
import { UserMenuConfig } from "@/config/user-menu"
import { CircleArrowOutUpRight } from "lucide-react"
import { User } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { useTransition } from "react"
import { ThemesMenu } from "./themes-menu"






export function UserMenu({ user }: { user: User }) {
    const [isPending, startTransition] = useTransition();


    const { name, email, image } = user


    async function SignOut() {
        startTransition(() => onSignOut())
    }

    return (
        <Menubar asChild>
            <MenubarMenu>
                <MenubarTrigger className="relative w-9 h-9 border rounded-full bg-secondary hover:bg-secondary/60 cursor-pointer flex justify-center items-center select-none">
                    {image
                        ? <Image
                            src={image}
                            alt={"Profile"}
                            fill
                            className="rounded-full w-full"
                        />
                        : <div
                            className="rounded-full bg-secondary/60 w-9 h-9 flex justify-center items-center select-none"
                        >
                            {name && name.charAt(0).toUpperCase()}
                        </div>
                    }

                </MenubarTrigger>
                <MenubarContent alignOffset={-150}  >
                    <MenubarItem disabled>
                        <div className="flex flex-col">
                            <span>{name}</span>
                            <span className="text-xs max-w-[200px] truncate">{email}</span>
                        </div>
                    </MenubarItem>
                    <MenubarSeparator />
                    {UserMenuConfig?.map((item) => {
                        if ((item.show === "onAuth" && user) || (item.show === "unAuth" && !user) || item.show === "public") {
                            return (
                                <MenubarItem key={item.label} asChild disabled={isPending}>
                                    <Link href={item.href} className="gap-2">
                                        <item.icon className="size-4" />
                                        <span>{item.label}</span>
                                    </Link>
                                </MenubarItem>
                            )
                        }
                    })}
                    <ThemesMenu disabled={isPending} />
                    <MenubarSeparator />
                    <MenubarItem className="text-red-500 gap-2" onClick={SignOut} disabled={isPending}>
                        <CircleArrowOutUpRight className="size-4" />
                        <span>Sign Out</span>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>


    )
}
