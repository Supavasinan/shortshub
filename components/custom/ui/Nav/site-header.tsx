import { SectionContainer } from '@/components/custom/ui/Layout/section-container'
import { SearchInput } from '@/components/custom/ui/Nav/search-input'
import { currentUser } from '@/data/user-session/server'
import dynamic from 'next/dynamic'
import Link from 'next/link'
const MobileNav = dynamic(() => import("./mobile/mobile-nav"))
const DesktopNav = dynamic(() => import("./desktop/desktop-nav"))

type NavProps = {
    searchBar?: boolean
}

export default async function SiteHeader({ searchBar = true, }: NavProps) {
    const user = await currentUser()

    return (
        <div className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <SectionContainer className="py-3">
                <div className="flex place-content-between gap-5">
                    <Link href="/" className="font-mono text-2xl cursor-pointer text-background-foreground transition-colors">ShortsHub</Link>
                    <div className="gap-5 items-center justify-center flex" >
                        {searchBar && <SearchInput />}

                        <MobileNav user={user} />
                        <DesktopNav user={user} />
                    </div>
                </div>
            </SectionContainer>
        </div>
    )
}
