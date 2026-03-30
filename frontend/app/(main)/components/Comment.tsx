"use client";

import { useAuth } from "@/app/context/auth-provider";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import { createComment, deleteComment, getCommentsByMovieId } from "@/lib/api/main.api";
import { MessageCircle, MessageCircleMore, Send, Trash2, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
    movieId: number;
};

const formatDateTime = (value?: string) => {
    if (!value) return "";

    return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
};

export default function Comments({ movieId }: Props) {
    const { user: currentUser } = useAuth();
    const [comments, setComments] = useState<MovieComment[]>([]);
    const [commentToDelete, setCommentToDelete] = useState<MovieComment | null>(null);
    const [content, setContent] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalComments, setTotalComments] = useState(0);

    const fetchComments = useCallback(async (p = 1) => {
        const res = await getCommentsByMovieId(movieId, p, 5);
        setComments(res.data?.result ?? []);
        setTotalPages(res.data?.meta.pages ?? 1);
        setTotalComments(res.data?.meta.total ?? 0);
        setPage(res.data?.meta.current ?? p);
    }, [movieId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            void fetchComments(1);
        }, 0);

        return () => clearTimeout(timer);
    }, [fetchComments]);

    const handleSubmit = async () => {
        const text = content.trim();
        if (!text || !currentUser) return;

        const res = await createComment(movieId, text);
        if (res.data) {
            setContent("");
            await fetchComments(1);
        }
    };

    const handleDelete = async () => {
        if (!commentToDelete) return;

        const res = await deleteComment(commentToDelete.id);
        if (Number(res.statusCode) < 400) {
            const nextPage = comments.length === 1 && page > 1 ? page - 1 : page;
            await fetchComments(nextPage);
        }

        setCommentToDelete(null);
    };

    return (
        <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
            <div className="mb-6 flex items-center gap-2 border-b border-gray-700 pb-4">
                <MessageCircle className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-semibold text-white">
                    Bình luận ({totalComments})
                </h2>
            </div>

            <div className="mb-8 flex gap-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser?.avatarUrl} className="object-cover" />
                    <AvatarFallback>
                        <User className="h-5 w-5 text-gray-300" />
                    </AvatarFallback>
                </Avatar>

                <div className="relative flex-1">
                    <Textarea
                        value={content}
                        disabled={!currentUser}
                        rows={2}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                void handleSubmit();
                            }
                        }}
                        placeholder={currentUser ? "Viết bình luận..." : "Đăng nhập để bình luận"}
                        className="w-full resize-none break-all rounded-lg border border-gray-700 bg-gray-900 py-3 pl-4 pr-12 text-white"
                    />

                    <button
                        onClick={() => void handleSubmit()}
                        disabled={!currentUser}
                        className="absolute bottom-3 right-3 text-gray-400 hover:text-red-500 disabled:opacity-40"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {comments.length === 0 ? (
                <div className="flex h-50 flex-col items-center justify-center rounded-2xl border border-gray-700 bg-gray-800 text-gray-400">
                    <MessageCircleMore className="h-10 w-10" />
                    <p>Chưa có bình luận</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => {
                        const canDelete =
                            currentUser?.role === "ADMIN" || currentUser?.id === comment.user_id;

                        return (
                            <div key={comment.id} className="flex gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={comment.avatarUrl} className="object-cover" />
                                    <AvatarFallback>
                                        <User className="h-5 w-5 text-gray-300" />
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1">
                                    <div className="mb-1 flex justify-between">
                                        <div className="flex gap-2 text-sm">
                                            <span className="font-bold text-white">{comment.fullName}</span>
                                            <span className="text-gray-500">
                                                {formatDateTime(comment.createdAt)}
                                            </span>
                                        </div>

                                        {canDelete ? (
                                            <button
                                                onClick={() => setCommentToDelete(comment)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        ) : null}
                                    </div>

                                    <p className="break-all whitespace-pre-line text-sm text-gray-300">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {totalPages > 1 ? (
                <Pagination className="mt-6">
                    <PaginationContent>
                        {page > 1 ? (
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        void fetchComments(page - 1);
                                    }}
                                    className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                                />
                            </PaginationItem>
                        ) : null}

                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((itemPage) => (
                            <PaginationItem key={itemPage}>
                                <PaginationLink
                                    href="#"
                                    isActive={itemPage === page}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        void fetchComments(itemPage);
                                    }}
                                    className={`border-gray-700 ${
                                        itemPage === page
                                            ? "bg-red-600 text-white hover:bg-red-600"
                                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    }`}
                                >
                                    {itemPage}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {page < totalPages ? (
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        void fetchComments(page + 1);
                                    }}
                                    className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                                />
                            </PaginationItem>
                        ) : null}
                    </PaginationContent>
                </Pagination>
            ) : null}

            <ConfirmDialog
                Open={!!commentToDelete}
                onClose={() => setCommentToDelete(null)}
                onConfirm={() => {
                    void handleDelete();
                }}
                title="Xóa bình luận?"
                message="Hành động này không thể hoàn tác."
            />
        </div>
    );
}
