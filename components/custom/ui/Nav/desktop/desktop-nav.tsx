import { NavigationConfig } from "@/config/navigation";
import { User } from "next-auth";
import Link from "next/link";
import { Button } from "../../button";
import { UserMenu } from "../user-menu";

export default function DesktopNav({ user }: { user?: User }) {
    return (
        <div className="hidden lg:flex gap-5">
            {!user && (
                <>
                    <Link href="/auth/sign-in"><Button >Sign in</Button></Link>
                    <Link href="/auth/sign-up"><Button variant={'primary'}>Sign up</Button></Link>
                </>
            )}


            {user && (
                <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center justify-center gap-4">
                        {NavigationConfig.map((list) => {
                            if ((list.show === "unAuth" && !user) || list.show === "onAuth" && user || list.show === "public") {
                                return (
                                    <Link key={list.label} href={list.href} className="flex items-center justify-center gap-2 hover:text-[#3D99CF] transition-all">
                                        <list.icon className="size-4" />
                                        <p className='text-sm text-nowrap'>{list.label}</p>
                                    </Link>
                                )
                            }
                        })}
                    </div>
                    <UserMenu user={user} />
                </div>
            )}
        </div>
    )
}
