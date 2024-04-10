import { db } from "@/lib/db";
import { Hero } from "./_components/Hero/hero";
import { Categories } from "./_components/categories";
import { DynamicPosts } from "./_components/dynamic-posts";

export default async function IndexPage({ searchParams }: { searchParams: { categoryId: string, title: string } }) {

  const post = await db.post.findMany({
    where: {
      categoryId: searchParams.categoryId,
      title: {
        contains: searchParams.title,
        mode: "insensitive",
      }
    },
    orderBy: {
      title: 'asc'
    },
    include: {
      category: true,
      user: true,
      favoritePost: true
    }
  })


  const categories = await db.category.findMany()

  return (
    <div>
      <Hero />
      <Categories categories={categories} />
      <DynamicPosts posts={post} />
    </div>

  );
}
