import { Button } from "@/components/custom/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export function ButtonBack({ href, label, className }: { href: string; label: string; className?: string }) {
    return (
        <Link
            href={href}
            className={cn("text-sm font-medium text-gray-500 hover:text-gray-700", className)}
        >
            <Button className="flex gap-2">
                <ChevronLeft className="size-4" />
                <span>{label}</span>
            </Button>
        </Link>
    );
}