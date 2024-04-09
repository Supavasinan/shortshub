"use client"
import { MenubarCheckboxItem, MenubarSub, MenubarSubContent, MenubarSubTrigger } from "@/components/shadcn/ui/menubar";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

const themes = ["light", "dark", "system"]

export function ThemesMenu({ disabled }: { disabled?: boolean }) {
    const { setTheme, theme } = useTheme()

    return (
        <MenubarSub>
            <MenubarSubTrigger className="gap-2">
                <SunMoon className="size-4" />
                <span>Themes</span>
            </MenubarSubTrigger>
            <MenubarSubContent>

                {themes.map((item) => (
                    <MenubarCheckboxItem
                        key={item}
                        onClick={() => setTheme(item)}
                        checked={item === theme}
                        className="capitalize"
                        disabled={disabled}
                    >
                        {item}
                    </MenubarCheckboxItem>
                ))}
            </MenubarSubContent>
        </MenubarSub>
    )
}
