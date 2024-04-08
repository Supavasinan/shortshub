"use client";

import toast from "react-hot-toast";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { ImageUp } from "lucide-react";

type FileUploadProps = {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;

}

export const FileUpload = ({
    onChange,
    endpoint,
}: FileUploadProps) => {
    return (
        <UploadDropzone
            appearance={{
                button({ ready, isUploading }) {
                    return cn(
                        "text-sm  font-medium text-primary hover:text-primary/80 transition-colors",
                        ready && "bg-secondary hover:bg-secondary/90 ",
                    )
                },
                label() {
                    return "text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                },
                container() {
                    return "mt-0 border-dashed  border-accent/50 bg-secondary/10 outline-1  outline-primary/50"
                },

                allowedContent() {
                    return "text-red-500 text-xs mt-2"
                }

            }}
            content={{
                uploadIcon() {
                    return <ImageUp className="size-6 md:size-8" />
                },
                
            }}
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`);
            }}
        />
    )
}