"use client"

import { Button } from "@/components/shadcn/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { TitleInputSchema } from "@/schema/post";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


type TitleProps = {
    title: string
    postId: string

}
export function TitleForm({ title, postId }: TitleProps) {
    const FormSchema = TitleInputSchema
    const router = useRouter()
    const [isEditing, setIsEditing] = useState(false)
    const toggleEdit = () => setIsEditing((current) => !current);
    const onSave = async (values: z.infer<typeof FormSchema>) => {

        const validatedFields = FormSchema.safeParse(values);

        if (!validatedFields.success) {
            return toast.error("Invalid fields!");
        }

        toast.promise(
            axios.patch(`/api/post/edit/${postId}`, values).then(() => {
                toggleEdit()
                router.refresh()
            }), {
            loading: "Saving...",
            success: "Saved",
            error: "Can't save"
        });
    }
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title
        }
    })

    const { isSubmitting, isValid } = form.formState;

    useEffect(() => {
        if (!isEditing && !isSubmitting) {
            form.reset({ title });
        }
    }, [isEditing, isSubmitting, form, title]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)}>
                <div className="p-4 border rounded-md w-full">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Title</p>
                        <div className="space-x-4">
                            {isEditing && (
                                <Button disabled={isSubmitting || !isValid} variant={"ghost"} type="submit" size="sm" >
                                    Save
                                </Button>
                            )}
                            <Button variant={"outline"} type="button" size={"sm"} className="space-x-2" onClick={toggleEdit}>
                                {isEditing
                                    ? (
                                        <p className="text-sm">Cancel</p>
                                    ) : (
                                        <>
                                            <Pencil className="size-4" />
                                            <p className="text-sm">Edit</p>
                                        </>
                                    )
                                }
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input disabled={!isEditing} {...field} className="w-full" placeholder="This is my title..." />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>
            </form>
        </Form >
    )
}
