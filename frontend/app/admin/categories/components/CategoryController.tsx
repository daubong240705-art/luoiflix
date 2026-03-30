"use client";

import { useMemo, useState } from "react";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useDeleteCategory } from "@/app/hooks/category/useCategoryForm";
import AdminTablePagination from "../../components/admin-table-pagination";
import AdminTableToolbar from "../../components/admin-table-toolbar";
import PageHeader from "../../components/admin.header";
import CategoryDialog from "./CategoryDialog";
import CategoryTable from "./CategoryTable";

export type CategoryDialogState =
    | { type: "add" }
    | { type: "edit"; category: Category }
    | null;

export default function CategoriesController({ categories }: { categories: Category[] }) {
    const [dialog, setDialog] = useState<CategoryDialogState>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { deleteCategory } = useDeleteCategory();
    const pageSize = 12;

    const filteredCategories = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return categories.filter((category) =>
            !keyword
            || category.name.toLowerCase().includes(keyword)
            || category.slug.toLowerCase().includes(keyword)
        );
    }, [categories, search]);

    const totalPages = Math.max(1, Math.ceil(filteredCategories.length / pageSize));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedCategories = filteredCategories.slice(
        (safeCurrentPage - 1) * pageSize,
        safeCurrentPage * pageSize
    );

    return (
        <>
            <PageHeader
                title="thể loại"
                count={filteredCategories.length}
                onAdd={() => setDialog({ type: "add" })}
            />

            <AdminTableToolbar
                searchValue={search}
                onSearchChange={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }}
                searchPlaceholder="Tìm theo tên thể loại hoặc slug..."
                totalItems={categories.length}
                filteredItems={filteredCategories.length}
            />

            <CategoryTable
                categories={paginatedCategories}
                onEdit={(category) => setDialog({ type: "edit", category })}
                onDelete={(category) => setCategoryToDelete(category)}
            />
            <AdminTablePagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <CategoryDialog
                open={dialog !== null}
                onOpenChange={() => setDialog(null)}
                mode={dialog?.type === "edit" ? "edit" : "add"}
                initialData={dialog?.type === "edit" ? dialog.category : undefined}
            />

            <ConfirmDialog
                Open={!!categoryToDelete}
                onClose={() => setCategoryToDelete(null)}
                onConfirm={() => {
                    if (!categoryToDelete) return;
                    deleteCategory(categoryToDelete.id, {
                        onSuccess: () => setCategoryToDelete(null),
                    });
                }}
                title="Xoá thể loại?"
                message="Xóa thể loại này sẽ gỡ nó khỏi các phim đang sử dụng. Bạn có chắc không?"
            />
        </>
    );
}
