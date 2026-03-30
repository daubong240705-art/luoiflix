"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit, Save, X } from "lucide-react";
import MovieForm from "./MovieForm";
import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    mode: "add" | "edit";
    initialData?: Movie;
};

export default function MovieDialog({
    open,
    onOpenChange,
    mode,
    initialData,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="min-w-250 max-h-[90vh] p-0 bg-gray-900 border-gray-800  flex flex-col" showCloseButton={false}>
                <DialogHeader className="px-6 py-4 border-b border-gray-800 ">
                    <DialogTitle className="text-xl font-bold text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {mode === "add" ? (
                                <Plus className="text-green-500" />
                            ) : (
                                <Edit className="text-blue-500" />
                            )}
                            {mode === "add" ? "Thêm Phim Mới" : "Chỉnh Sửa Phim"}
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
                            ? "Nhập thông tin để thêm phim mới vào hệ thống"
                            : "Cập nhật thông tin phim, poster và thể loại"}
                    </DialogDescription>
                </DialogHeader>

                <MovieForm
                    key={mode === "edit" ? `movie-${initialData?.id ?? "edit"}` : "movie-add"}
                    mode={mode}
                    initialData={initialData}
                    onClose={() => onOpenChange(false)}
                />

                {/* <div className="px-6 py-4 border-t border-gray-800 flex justify-end gap-3">
                    <Button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="px-5 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
                    >
                        Huy bo
                    </Button>
                    <Button
                        type="submit"
                        form="movie-form"
                        className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Luu
                    </Button>
                </div> */}
            </DialogContent>
        </Dialog>
    );
}
