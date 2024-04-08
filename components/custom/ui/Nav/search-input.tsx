"use client"
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";

export function SearchInput({ className }: { className?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("categoryId");
    const title = searchParams.get("title");

    const [value, setValue] = useState(title || "");
    const debouncedValue = useDebounce<string>(value, 300);


    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        const query = {
            title: debouncedValue,
            categoryId: categoryId,
        };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, { skipNull: true, skipEmptyString: true });

        router.push(url, { scroll: false});
    }, [debouncedValue, router, categoryId])

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClickFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div onClick={handleClickFocus} className="w-full relative flex items-center justify-between cursor-text">
            <Search className="size-4 left-4 stroke-muted-foreground absolute" />

            <input
                ref={inputRef}
                onChange={onChange}
                value={value}
                className="pl-12 pr-4 text-xs h-[36px] w-full placeholder:text-muted-foreground outline-none bg-background rounded-md border"
                type="text"
                placeholder="Search"
            />
        </div>
    )
}
