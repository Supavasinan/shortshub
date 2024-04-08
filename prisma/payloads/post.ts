import { Prisma } from "@prisma/client"

export type PostPayload = Prisma.PostGetPayload<{
    include: {
        category: true,
        user: true,
        favoritePost: true
    }
}>