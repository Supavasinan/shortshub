"use client";

import { FileUpload } from "@/components/custom/ui/file-upload";
import { Button } from "@/components/shadcn/ui/button";
import axios from "axios";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";


interface ImageFormProps {
    imageUrl: string | null
    postId: string;
};

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required",
    }),
});

export const ImageForm = ({
    imageUrl,
    postId
}: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const onUpload = async (values: z.infer<typeof formSchema>) => {
        const validatedFields = formSchema.safeParse(values);

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
            error: "Something went wrong"
        });
    }

    const onDelete = async () => {
        toast.promise(
            axios.patch(`/api/post/edit/${postId}`, { imageUrl: null }).then(() => {
                router.refresh()
            }), {
            loading: "Saving...",
            success: "Saved",
            error: "Something went wrong"
        });
    }

    return (
        <div className="p-4 border rounded-md w-full flex flex-col">
            <div className="flex items-center justify-between">
                <p className="font-semibold">Image</p>
                <div className="space-x-2">
                    {imageUrl && !isEditing && (
                        <Button variant={"outline"} type="button" size={"sm"} onClick={onDelete} >
                            <Trash2 className="size-4 text-red-500" />
                        </Button>
                    )}
                    <Button variant={"outline"} type="button" size={"sm"} className="space-x-2" onClick={toggleEdit}>
                        {isEditing && (
                            <p className="text-sm">Cancel</p>

                        )}

                        {!isEditing && !imageUrl && (
                            <>
                                <PlusCircle className="size-4" />
                                <p className="text-sm">Add image</p>
                            </>
                        )}

                        {!isEditing && imageUrl && (
                            <>
                                <Pencil className="size-4" />
                                <p className="text-sm">Edit image</p>
                            </>
                        )}
                    </Button>
                </div>
            </div>
            <div className="mt-4 w-full h-full flex flex-col items-center justify-center">

                {imageUrl && !isEditing && (
                    <div className="relative aspect-video mt-2 w-full h-full">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={imageUrl}
                        />
                    </div>
                )}


                {isEditing && (
                    <div>
                        <FileUpload
                            endpoint="postImage"
                            onChange={(url) => {
                                if (url) {
                                    onUpload({ imageUrl: url });
                                }
                            }}
                        />

                    </div>
                )}
                <div className="text-xs text-muted-foreground mt-4 self-start">
                    16:9 aspect ratio recommended
                </div>
            </div>
        </div>
    )
}