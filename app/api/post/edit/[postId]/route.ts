import { currentUser } from "@/data/user-session/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export async function PATCH(
    request: Request,
    { params }: { params: { postId: string } }
) {
    try {
        const user = await currentUser();
        const { postId } = params;
        const values = await request.json();

        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const post = await db.post.update({
            where: {
                id: postId,
                userId: user.id
            },
            data: {
                ...values,
            }
        });
        return NextResponse.json(post);
    } catch (error) {
        return new NextResponse("Error", { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { postId: string } }
) {
    try {
        const user = await currentUser();
        const { postId } = params;
        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const post = await db.post.delete({
            where: {
                id: postId,
                userId: user.id
            }
        });
        return NextResponse.json(post);
    } catch (error) {
        return new NextResponse("Error", { status: 500 });
    }

}

