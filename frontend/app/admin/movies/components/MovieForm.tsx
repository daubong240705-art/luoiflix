"use client";

import { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AppInput } from "@/components/shared/AppInput";
import { FormError } from "@/components/shared/FormError";
import ImageUploadField from "@/components/shared/ImageUploadField";

import EpisodeList from "./EpisodeList";
import { categoryApi } from "../../service/api/category.api";
import { useMovieForm, useMovieMutation } from "../../../hooks/movie/useMovieForm";
import { MovieFormValues } from "@/app/types/form.type";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    mode: "add" | "edit";
    initialData?: Movie;
    onClose: () => void;
};

export default function MovieForm({ mode, initialData, onClose }: Props) {
    const form = useMovieForm(mode, initialData);

    const { data: categories = [], isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: categoryApi.getAllAdminCategories,
    });

    const selected = form.watch("categoryIds") || [];
    const posterUrl = form.watch("posterUrl");
    const thumbUrl = form.watch("thumbUrl");
    const [posterFile, setPosterFile] = useState<File | null>(null);
    const [thumbFile, setThumbFile] = useState<File | null>(null);

    const mutation = useMovieMutation(mode, form, initialData?.id, onClose);

    const posterPreview = useMemo(
        () => (posterFile ? URL.createObjectURL(posterFile) : (posterUrl ?? "")),
        [posterFile, posterUrl]
    );

    const thumbPreview = useMemo(
        () => (thumbFile ? URL.createObjectURL(thumbFile) : (thumbUrl ?? "")),
        [thumbFile, thumbUrl]
    );

    useEffect(() => {
        return () => {
            if (posterPreview.startsWith("blob:")) {
                URL.revokeObjectURL(posterPreview);
            }
        };
    }, [posterPreview]);

    useEffect(() => {
        return () => {
            if (thumbPreview.startsWith("blob:")) {
                URL.revokeObjectURL(thumbPreview);
            }
        };
    }, [thumbPreview]);


    const router = useRouter();
    const onSubmit = async (data: MovieFormValues) => {
        form.clearErrors("root");
        
        await toast.promise(
            mutation.mutateAsync({
                ...data,
                posterFile,
                thumbFile,
            }),
            {
                loading: mode === "add" ? "Đang tạo phim..." : "Đang cập nhật phim...",
                success: (res) => {
                    router.refresh();
                    const name = res.data?.title || "phim";
                    onClose();
                    return mode === "add"
                        ? `Tạo ${name} thành công!`
                        : `Cập nhật ${name} thành công!`;
                },
                error: () => {
                    return mode === "add"
                        ? "Tạo phim thất bại!"
                        : "Cập nhật phim thất bại!";
                },
            }
        );
    };

    return (
        <div className="flex flex-col overflow-y-auto custom-scrollbar [scrollbar-width:none] [-ms-overflow-style:none]">
            <div className="flex-1 p-6">
                <form id="movie-form" onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-8">
                    <div className="col-span-3 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-400">Poster</label>
                            <ImageUploadField
                                previewUrl={posterPreview}
                                alt="Poster preview"
                                emptyLabel="Chưa có poster"
                                canReset={Boolean(posterFile)}
                                onFileSelect={setPosterFile}
                                onReset={() => setPosterFile(null)}
                                frameClassName="aspect-2/3 w-full rounded-xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-400">Thumbnail</label>
                            <ImageUploadField
                                previewUrl={thumbPreview}
                                alt="Thumbnail preview"
                                emptyLabel="Chưa có thumbnail"
                                canReset={Boolean(thumbFile)}
                                onFileSelect={setThumbFile}
                                onReset={() => setThumbFile(null)}
                                frameClassName="aspect-video w-full rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="col-span-9">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-400">Tên phim</label>
                                <AppInput
                                    placeholder="Nhập tên phim..."
                                    type="text"
                                    color="red"
                                    className="px-4 py-5 text-white"
                                    {...form.register("title")}
                                />
                                <FormError message={form.formState.errors.title?.message} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-400">Đường dẫn</label>
                                <AppInput
                                    placeholder="Nhập slug phim..."
                                    type="text"
                                    color="red"
                                    className="px-4 py-5 text-white"
                                    {...form.register("slug")}
                                />
                                <FormError message={form.formState.errors.slug?.message} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-400">Năm</label>
                                <AppInput
                                    placeholder="Năm sản xuất"
                                    type="text"
                                    color="red"
                                    className="px-4 py-2.5 text-white"
                                    {...form.register("publishYear", { valueAsNumber: true })}
                                />
                                <FormError message={form.formState.errors.publishYear?.message} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-400">Trạng thái</label>
                                <Controller
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full rounded-lg border-gray-700 bg-gray-800 px-4 py-2.5 text-white transition-all hover:border-red-500 focus-visible:ring-0 focus:border-red-500 data-placeholder:font-sm data-placeholder:text-gray-400">
                                                <SelectValue placeholder="Trang thai" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-700 bg-gray-800 text-white">
                                                <SelectItem value="ONGOING" className="cursor-pointer focus:bg-gray-700 data-[state=checked]:bg-red-600">Đang phát</SelectItem>
                                                <SelectItem value="COMPLETED" className="cursor-pointer focus:bg-gray-700 data-[state=checked]:bg-red-600">Hoàn thành</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <FormError message={form.formState.errors.status?.message} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-400">Loại phim</label>
                                <Controller
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full rounded-lg border-gray-700 bg-gray-800 px-4 py-2.5 text-white transition-all hover:border-red-500 focus-visible:ring-0 focus:border-red-500 data-placeholder:font-sm data-placeholder:text-gray-400">
                                                <SelectValue placeholder="Chon loai phim" />
                                            </SelectTrigger>
                                            <SelectContent className="border border-gray-700 bg-gray-800 text-white">
                                                <SelectItem value="SERIES" className="cursor-pointer focus:bg-gray-700 data-[state=checked]:bg-red-600">Phim bộ</SelectItem>
                                                <SelectItem value="SINGLE" className="cursor-pointer focus:bg-gray-700 data-[state=checked]:bg-red-600">Phim lẻ</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <FormError message={form.formState.errors.type?.message} />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-400">Thể loại</label>
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2 rounded-lg border border-gray-700 bg-gray-800/50 p-3">
                                {isLoading && <span className="text-sm text-gray-500">Dang tai the loai...</span>}
                                {isError && <span className="text-sm text-red-500">Khong tai duoc the loai</span>}

                                {categories.map((cat) => {
                                    const isSelected = selected.includes(cat.id);
                                    return (
                                        <Button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => {
                                                const next = isSelected
                                                    ? selected.filter((id) => id !== cat.id)
                                                    : [...selected, cat.id];

                                                form.setValue("categoryIds", next, { shouldDirty: true, shouldValidate: true });
                                            }}
                                            className={`rounded border px-3 py-1 text-sm transition ${
                                                isSelected
                                                    ? "border-red-600 bg-red-600 text-white"
                                                    : "border-gray-600 bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white"
                                            }`}
                                        >
                                            {cat.name}
                                        </Button>
                                    );
                                })}
                            </div>
                            <FormError message={form.formState.errors.categoryIds?.message} />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-400">Mô tả nội dung</label>
                            <Textarea
                                {...form.register("description")}
                                placeholder="Nhập mô tả nội dung phim..."
                                className="h-30 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white transition-all hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 focus:border-red-500 focus:ring-2 focus:ring-red-500"
                            />
                            <FormError message={form.formState.errors.description?.message} />
                        </div>

                        <input type="hidden" {...form.register("posterUrl")} />
                        <input type="hidden" {...form.register("thumbUrl")} />
                    </div>
                </form>

                {mode === "edit" && initialData?.id && <EpisodeList movieId={initialData.id} />}
            </div>
                 <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-800">
                <Button type="button" onClick={onClose} className="px-5 py-2 rounded-lg text-gray-300 hover:bg-gray-800">
                    Huy bo
                </Button>
                <Button
                    type="submit"
                    form="movie-form"
                    disabled={mutation.isPending}
                    className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    {mutation.isPending ? "Đang lưu..." : "Lưu"}
                </Button>
            </div>
        </div>
    );
}
