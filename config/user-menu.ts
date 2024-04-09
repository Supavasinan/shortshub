import { UserMenuTypes } from "@/types";
import { LogIn, UserRoundPlus } from "lucide-react";

export const UserMenuConfig: UserMenuTypes = [
    {
        label: "Sign In",
        href: "/auth/sign-in",
        icon: LogIn,
        show: "unAuth",
    },
    {
        label: "Sign Up",
        href: "/auth/sign-up",
        icon: UserRoundPlus,
        show: "unAuth"
    },
    // {
    //     label: "Settings",
    //     href: "/dashboard/account/profile",
    //     icon: UserRoundPlus,
    //     show: "onAuth"
    // },
]