import { NavbarMobileTypes } from "@/types";
import { Heart, Home, Table2, UserRoundPlus } from "lucide-react";

export const NavigationConfig: NavbarMobileTypes = [
    
    {
        label: "Home",
        href: "/",
        icon: Home,
        show: "onAuth"
    },
    {
        label: "My Posts",
        href: "/post/me",
        icon: Table2,
        show: "onAuth"
    },
    {
        label: "My Favorites",
        href: "/post/my-favorites",
        icon: Heart,
        show: "onAuth"
    },
]