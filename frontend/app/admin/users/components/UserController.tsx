"use client";

import { useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useDeleteUser } from "@/app/hooks/user/useUserForm";
import AdminTablePagination from "../../components/admin-table-pagination";
import AdminTableToolbar from "../../components/admin-table-toolbar";
import PageHeader from "../../components/admin.header";
import UserDialog from "./UserDialog";
import UserTable from "./UserTable";

export type UserDialogState =
    | { type: "add" }
    | { type: "edit"; user: User }
    | null;

export default function UsersController({ users }: { users: User[] }) {
    const [dialog, setDialog] = useState<UserDialogState>(null);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);
    const { deleteUser } = useDeleteUser();
    const pageSize = 10;

    const filteredUsers = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return users.filter((user) => {
            const matchesSearch = !keyword
                || user.fullName.toLowerCase().includes(keyword)
                || user.username.toLowerCase().includes(keyword)
                || user.email.toLowerCase().includes(keyword);
            const matchesRole = roleFilter === "ALL" || user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [roleFilter, search, users]);

    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedUsers = filteredUsers.slice(
        (safeCurrentPage - 1) * pageSize,
        safeCurrentPage * pageSize
    );

    return (
        <>
            <PageHeader
                title="người dùng"
                count={filteredUsers.length}
                onAdd={() => setDialog({ type: "add" })}
            />

            <AdminTableToolbar
                searchValue={search}
                onSearchChange={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                }}
                searchPlaceholder="Tìm theo tên, username hoặc email..."
                totalItems={users.length}
                filteredItems={filteredUsers.length}
            >
                <Select
                    value={roleFilter}
                    onValueChange={(value) => {
                        setRoleFilter(value);
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className="w-full border-gray-700 bg-gray-900 text-white lg:w-45">
                        <SelectValue placeholder="Vai tro" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-700 bg-gray-900 text-gray-100">
                        <SelectItem value="ALL">Tất cả vai trò</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                </Select>
            </AdminTableToolbar>

            <UserTable
                users={paginatedUsers}
                onEdit={(user) => setDialog({ type: "edit", user })}
                onDelete={(user) => setUserToDelete(user)}
            />
            <AdminTablePagination
                currentPage={safeCurrentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <UserDialog
                open={dialog !== null}
                onOpenChange={() => setDialog(null)}
                mode={dialog?.type === "edit" ? "edit" : "add"}
                initialData={dialog?.type === "edit" ? dialog.user : undefined}
            />

            <ConfirmDialog
                Open={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={() => {
                    if (!userToDelete) return;
                    deleteUser(userToDelete.id, {
                        onSuccess: () => setUserToDelete(null),
                    });
                }}
                title="Xoá người dùng?"
                message="Xóa người dùng này sẽ xóa luôn toàn bộ comment của họ. Bạn có chắc không?"

            />
        </>
    );
}
