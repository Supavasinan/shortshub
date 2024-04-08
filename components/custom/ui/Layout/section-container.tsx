import { cn } from "@/lib/utils";

export function SectionContainer({
    children,
    className,
}: Readonly<{
    children: React.ReactNode;
    className?: string;
}>) {
    return (
        <div
            className={cn(
                "container px-4 sm:px-6 lg:max-w-7xl lg:px-8",
                className
            )}
        >
            {children}
        </div>
    );
}