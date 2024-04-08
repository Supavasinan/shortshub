"use client"


import { Button } from "@/components/shadcn/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/shadcn/ui/select"
import { Category } from "@prisma/client"
import axios from "axios"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

type CategoryFormProps = {
    initCategoryId: string | null
    categories?: Category[]
    postId: string
}
export function CategoryForm({ initCategoryId, categories, postId }: CategoryFormProps) {
    const router = useRouter()
    const [categoryId, setCategoryId] = useState<string | null>(initCategoryId)

    const onSelect = (categoryId: string | null) => {
        setCategoryId(categoryId)

        toast.promise(
            axios.patch(`/api/post/edit/${postId}`, { categoryId }).then(() => {
                router.refresh()
            }), {
            loading: "Saving...",
            success: "Saved",
            error: "Something went wrong"
        });
    }


    return (
        <div className="p-4 border rounded-md w-full">
            <div className="flex items-center justify-between">
                <p className="font-semibold">Category</p>
                <div className="flex items-center justify-center gap-x-2">
                    {categoryId &&
                        <Button variant={"secondary"} size={"sm"} onClick={() => onSelect(null)}>
                            <Trash2 className="size-4 text-red-500" />
                        </Button>
                    }
                    <Select onValueChange={(categoryId) => onSelect(categoryId)}>
                        <SelectTrigger className="w-[180px]">
                            {categoryId ?
                                (
                                    <p>
                                        {categories?.find((category) => category.id === categoryId)?.name}
                                    </p>
                                )
                                : (
                                    <p>
                                        Select a category
                                    </p>
                                )
                            }
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup >
                                {categories?.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>
        </div>

    )
}
