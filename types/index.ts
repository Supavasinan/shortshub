import { LucideIcon } from "lucide-react"

export type NavbarMobileTypes = {
    label: string
    href: string
    icon: LucideIcon 
    show: "onAuth" | "unAuth" | "public"
}[]


export type UserMenuTypes = {
    label: string
    href: string
    icon: LucideIcon 
    show: "onAuth" | "unAuth" | "public"
}[]