"use client";

import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

import { SectionContainer } from "@/components/custom/ui/Layout/section-container";
import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/shadcn/ui/separator";

interface CategoriesProps {
    categories: Category[]
}

export function Categories({
    categories
}: CategoriesProps) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");

    const onClick = (id: string | undefined) => {
        const query = { categoryId: id };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true });

        router.push(url, {
            scroll: false
        });
    };

    return (
        <SectionContainer className="py-6 space-y-5">
            <h1 className="text-md md:text-lg lg:text-xl font-bold text-center ">Categories</h1>
            <Separator className="shadow-2xl" />
            <div className="flex items-center justify-center gap-4 flex-wrap">
                <Button className={cn("text-xs md:text-sm", !categoryId && "bg-primary/10")} variant={"ghost"} size={"sm"} onClick={() => onClick(undefined)}>
                    Newest
                </Button>
                {categories.map((item) => (
                    <Button className={cn("text-xs md:text-sm", item.id === categoryId && "bg-primary/10")} variant={"ghost"} size={"sm"} key={item.id} onClick={() => onClick(item.id)}>
                        {item.name}
                    </Button>
                ))}
            </div>
        </SectionContainer>
    )
}