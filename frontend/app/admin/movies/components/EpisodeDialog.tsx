"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit, X } from "lucide-react";


import { Button } from "@/components/ui/button";
import EpisodeForm from "./EpisodeForm";

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    mode: "add" | "edit";
    initialData?: Episode;
    movieId: number
};

export default function Episodedialog({
    open,
    onOpenChange,
    mode,
    initialData,
    movieId
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="w-140  p-0 bg-gray-900 border-gray-800  flex flex-col" showCloseButton={false}>
                <DialogHeader className="px-6 py-4 border-b border-gray-800 ">
                    <DialogTitle className="text-xl font-bold text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {mode === "add" ? (
                                <Plus className="text-green-500" />
                            ) : (
                                <Edit className="text-blue-500" />
                            )}
                            {mode === "add" ? "Thêm Tập Mới" : "Chỉnh Sửa Tập"}
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="h-10 w-10 p-0 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
                        >
                            <X />
                        </Button>
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-400">
                        {mode === "add"
                            ? "Nhập thông tin để thêm tập mới vào hệ thống"
                            : "Cập nhật thông tin tập"}
                    </DialogDescription>
                </DialogHeader>

                <EpisodeForm
                    key={mode === "edit" ? `episode-${initialData?.id ?? "edit"}` : `episode-add-${movieId}`}
                    mode={mode}
                    initialData={initialData}
                    onClose={() => onOpenChange(false)}
                    movieId={movieId}
                />
            </DialogContent>
        </Dialog>
    );
}
