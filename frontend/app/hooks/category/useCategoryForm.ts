"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";
import { CategoryPayload, categorySchema } from "@/app/types/form.type";
import { toast } from "sonner";
import { assertApiSuccess, handleFormError, useDeleteWithRefresh } from "../_shared/mutation.utils";
import { categoryApi } from "@/app/admin/service/api/category.api";



export function useCategoryForm(
    mode: "add" | "edit",
    initialData?: Category
) {
    const form = useForm<CategoryPayload>({
        resolver: zodResolver(categorySchema),
        values: mode === "edit" && initialData
            ? {
                name: initialData.name,
                slug: initialData.slug,
            }
            : {
                name: "",
                slug: "",
            }
    });
    return form;
}
export const useCategoryMutation = (
    mode: "add" | "edit",
    form: UseFormReturn<CategoryPayload>,
    categoryId?: number,
    onClose?: () => void
) => {
    const router = useRouter();

    return useMutation<IBackendRes<Category>, IBackendRes<null>, CategoryPayload>({
        mutationFn: async (data: CategoryPayload) => {
            const response = await (
                mode === "add"
                    ? categoryApi.createCategory(data)
                    : categoryApi.updateCategory(categoryId!, data)
            );
            return assertApiSuccess(response);
        },
        onSuccess: () => {
            router.refresh();
            onClose?.();
        },
        onError: (err) => {
            handleFormError(err, form.setError);
        }
    });
};

export const useDeleteCategory = () => {
    const mutation = useDeleteWithRefresh(categoryApi.deleteCategory, "Xoa the loai thanh cong");

    return {
        deleteCategory: mutation.mutate,
        isDeleting: mutation.isPending,
    };
};
