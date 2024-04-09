"use client"

import { SheetTitle } from '@/components/shadcn/ui/sheet'
import { NavigationConfig } from '@/config/navigation'
import { usePathname } from 'next/navigation'

export default function PathName() {
    const usePathName = usePathname()

    const currentPathName = NavigationConfig?.find((path) => path.href === usePathName)?.label

    return (
        <SheetTitle className="text-start">{currentPathName}</SheetTitle>
    )
}
