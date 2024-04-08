import { currentUser } from "@/data/user-session/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
    const user = await currentUser();

    if (!user) throw new Error("Unauthorized");

    return { user };
}

export const ourFileRouter = {
    postImage: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;