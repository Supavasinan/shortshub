import { SectionContainer } from '@/components/custom/ui/Layout/section-container'
import { SearchInput } from '@/components/custom/ui/Nav/search-input'
import { Button } from '@/components/custom/ui/button'
import { NavigationConfig } from '@/config/navigation'
import { currentUser } from '@/data/user-session/server'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { UserMenu } from './user-menu'
const MobileNav = dynamic(() => import("./mobile-nav"))

type NavProps = {
    searchBar?: boolean
    headerTitle?: string
}

export default async function SiteHeader({ searchBar = true, headerTitle, }: NavProps) {
    const user = await currentUser()

    return (
        <div className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <SectionContainer className="py-3">
                <div className="flex place-content-between gap-5">
                    <Link href="/" className="font-mono text-2xl cursor-pointer text-background-foreground transition-colors">ShortsHub</Link>
                    <div className="gap-5 items-center justify-center flex" >
                        {searchBar && <SearchInput />}

                        <MobileNav headerTitle={headerTitle} user={user} />
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
                                            return (
                                                <Link key={list.label} href={list.href} className="flex items-center justify-center gap-2 hover:text-[#3D99CF] transition-all">
                                                    <list.icon className="size-4" />
                                                    <p className='text-sm text-nowrap'>{list.label}</p>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                    <UserMenu user={user} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </div>
    )
}
