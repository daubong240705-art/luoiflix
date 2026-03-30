"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useFavoriteMovies } from "@/app/hooks/favorites/useFavoriteMovies";
import { cn } from "@/lib/utils";

type Props = {
    movie: Movie;
    className?: string;
    iconClassName?: string;
    label?: string;
    activeLabel?: string;
    inactiveLabel?: string;
    showLabel?: boolean;
};

export function FavoriteToggle({
    movie,
    className,
    iconClassName,
    label,
    activeLabel = "Yêu thích",
    inactiveLabel = "Yêu thích",
    showLabel = true,
}: Props) {
    const router = useRouter();
    const { isFavorite, toggleFavorite } = useFavoriteMovies();
    const favorite = isFavorite(movie.id);

    const handleToggle = async () => {
        const result = await toggleFavorite(movie);

        if (result.authRequired) {
            toast.error(result.message);
            router.push("/login");
            return;
        }

        if (!result.success) {
            toast.error(result.message ?? "Không thể cập nhật yêu thích.");
            return;
        }

        toast.success(
            result.isFavorite
                ? `Đã thêm "${movie.title}" vào yêu thích`
                : `Đã xoá "${movie.title}" khỏi yêu thích`
        );
    };

    return (
        <button
            type="button"
            onClick={handleToggle}
            aria-pressed={favorite}
            aria-label={favorite ? activeLabel : inactiveLabel}
            className={cn(
                "flex items-center justify-center gap-2 rounded-lg transition-all",
                className
            )}
        >
            <Heart
                className={cn(
                    "transition-all",
                    iconClassName,
                    favorite ? "fill-red-500 text-red-500" : "text-gray-300"
                )}
            />
            {showLabel ? <span>{label ?? (favorite ? activeLabel : inactiveLabel)}</span> : null}
        </button>
    );
}
