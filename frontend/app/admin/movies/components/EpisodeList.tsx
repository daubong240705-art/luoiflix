"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit, Film, Plus, Trash2 } from "lucide-react";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";

import Episodedialog from "./EpisodeDialog";
import { movieApi } from "../../service/api/movie.api";
import { useDeleteEpisode } from "../../../hooks/movie/useEpisodeForm";


export type EpisodeDialogState =
    | { type: "add" }
    | { type: "edit"; episode: Episode }
    | null;

type Props = {
    movieId: number;
};

export default function EpisodeList({ movieId }: Props) {
    const { data: episodes = [] } = useQuery<Episode[]>({
        queryKey: ["episodes", movieId],
        queryFn: () => movieApi.getEpisodeByMovie(movieId),
        enabled: !!movieId,
    });

    const [dialog, setDialog] = useState<EpisodeDialogState>(null);
    const [episodeToDelete, setEpisodeToDelete] = useState<Episode | null>(null);

    const { deleteEpisode } = useDeleteEpisode(movieId);

    return (
        <>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Film className="w-4 h-4 text-blue-500" />
                    Danh sách tập ({episodes.length})
                </h3>
                <Button
                    type="button"
                    onClick={() => setDialog({ type: "add" })}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Thêm tập
                </Button>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 h-70 overflow-y-auto p-2 space-y-1 custom-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]">
                {episodes.length ? (
                    episodes.map((ep) => (
                        <div
                            key={ep.id}
                            className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-lg group"
                        >
                            <div className="flex gap-3 items-center">
                                <span className="bg-gray-900 px-2 py-1 rounded text-xs font-mono text-gray-300">
                                    #{ep.episodeOrder}
                                </span>
                                <div>
                                    <div className="text-sm text-gray-200">{ep.name}</div>
                                    <div className="text-xs text-gray-500 truncate max-w-70">{ep.videoUrl || "Chua co link"}</div>
                                </div>
                            </div>

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                                <Button
                                    type="button"
                                    onClick={() => setDialog({ type: "edit", episode: ep })}
                                    className="p-2 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg border border-blue-600/20"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setEpisodeToDelete(ep)}
                                    className="p-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-lg border border-red-600/20"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <Film className="w-8 h-8 opacity-20" />
                        <span className="text-xs">Chưa có tập phim nào</span>
                    </div>
                )}
            </div>

            <Episodedialog
                open={dialog !== null}
                onOpenChange={() => setDialog(null)}
                mode={dialog?.type === "edit" ? "edit" : "add"}
                initialData={dialog?.type === "edit" ? dialog.episode : undefined}
                movieId={movieId}
            />

            <ConfirmDialog
                Open={!!episodeToDelete}
                onClose={() => setEpisodeToDelete(null)}
                onConfirm={() => {
                    if (!episodeToDelete) return;
                    // Gọi delete và đóng dialog khi xong
                    deleteEpisode(episodeToDelete.id, {
                        onSuccess: () => setEpisodeToDelete(null),
                    });
                }}
                title="Xoá tập phim?"
                message="Hành động này không thể hoàn tác."
            />

        </>
    );
}
