import { AddFavorite } from "@/actions/post/add-favorite";
import { RemoveFavorite } from "@/actions/post/remove-favorite";
import { currentUser } from "@/data/user-session/client";
import { FavoritePost } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { toast } from "react-hot-toast";

const useFavorite = ({ postId, favorites }: { postId: string, favorites: FavoritePost[] | null }) => {
  const router = useRouter();
  const user = currentUser();
  const [isToggling, setIsToggling] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { favorite, hasFavorited } = useMemo(() => {
    let favorite: FavoritePost | undefined;
    let hasFavorited: boolean = false;

    favorites?.forEach(item => {
      if (item.userId === user?.id && item.postId === postId) {
        favorite = item;
        hasFavorited = true;
      }
    });

    return { favorite, hasFavorited };
  }, [user, favorites, postId]);


  const toggleFavorite = () => startTransition(async () => {
    try {
      if (!user?.id) {
        router.push('/auth/sign-in');
        return;
      }
      if (isToggling) return;
      setIsToggling(true);
      if (hasFavorited && favorite) {
        await RemoveFavorite(favorite.id);
      } else {
        await AddFavorite(postId);
      }
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setTimeout(() => setIsToggling(false), 1000);
    }
  })

  return {
    hasFavorited,
    toggleFavorite,
    isPending
  }
}

export default useFavorite;
