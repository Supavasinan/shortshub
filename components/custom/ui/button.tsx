import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader } from "lucide-react";
import React from "react";
const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap px-2.5 py-1 hover:opacity-80 font-regular outline-0 rounded-md text-primary text-xs ring-offset-background ease-out duration-200  focus-visible:outline-4 focus-visible:outline-offset-1 border-2 transition-all  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-secondary",
                primary: "bg-[#3D99CF] text-white",
            },
            size: {
                default: "h-[26px]",
                lg: "h-[36px]",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & {
    loading?: boolean
}


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, variant, size, loading, ...props }, ref) => {
    return (
        <button
            {...props}
            ref={ref}
            disabled={loading}
            className={
                cn(buttonVariants({ variant, size, className }))
            }
        >
            {loading && <Loader className="w-4 h-4 animate-spin mr-2" />}
            {children}
        </button>
    );
});

Button.displayName = "Button";

