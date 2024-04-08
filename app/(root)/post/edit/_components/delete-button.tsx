
"use client"

import { Button } from "@/components/shadcn/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover"
import axios from "axios"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export function DeleteButton({ postId }: { postId: string }) {
    const router = useRouter()
    const deletePost = () => {
        toast.promise(axios.delete(`/api/post/edit/${postId}`),
            {
                loading: "Deleting post...",
                success: () => {
                    router.push("/post/me")
                    router.refresh()
                    return "Post deleted successfully"
                },
                error: "Failed to delete post",
            }
        )
    }

    return (

        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"secondary"} size={"sm"} className="flex items-center justify-center gap-x-2 ">
                    <Trash2 className="size-4 text-red-500" />
                    <p className="text-sm text-red-500">Delete</p>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
                <div className="grid gap-4">
                    <div className="flex flex-col gap-y-2">
                        <h4 className="font-medium leading-none text-sm">Are you sure you want to delete this post?</h4>
                        <p className="text-xs text-muted-foreground">
                            This action cannot be undone.
                        </p>
                        <Button variant={"outline"} size={"sm"} className="self-end text-red-500" onClick={deletePost}>Delete</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>

    )
}
