
"use client"

import { createPost } from "@/actions/post/create"
import { Button } from "@/components/custom/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/ui/form"
import { CreatePostSchema } from "@/schema/post"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"



export function CreateForm() {
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof CreatePostSchema>>({
        resolver: zodResolver(CreatePostSchema),
        defaultValues: {
            title: ""
        }
    })

    const onSubmit = (values: z.infer<typeof CreatePostSchema>) => {
        setIsPending(true)
        toast.promise(createPost(values).then((data) => {
            setIsPending(false)
            router.push(`/post/edit/${data?.postId}`)
            router.refresh()
        }), {
            loading: "Creating...",
            success: "Created",
            error: "Error"

        })
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit((onSubmit))}>
                <div className="flex items-center justify-center flex-col gap-4">
                    <h1 className="text-xl font-semibold">Name your post</h1>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem >
                                <FormControl>
                                    <input type="text" {...field}  placeholder="What about your post.." className="outline-none md:w-[300px] lg:w-[500px] text-center border-b-2 text-base" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" loading={isPending} >
                        Create Post
                    </Button>
                </div>
            </form>
        </Form>
    )
}
