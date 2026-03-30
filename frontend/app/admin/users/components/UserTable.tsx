import { Button } from "@/components/ui/button";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Mail, Shield, Trash2 } from "lucide-react";

interface Props {
    users: User[];
    onEdit: (movie: User) => void;
    onDelete: (movie: User) => void;
}

export default function UserTable({ users, onEdit, onDelete }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-xl">
            <div className="overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="border-b border-gray-700 bg-gray-900/50 text-left">
                            <TableHead className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">ID</TableHead>
                            <TableHead className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Người dùng</TableHead>
                            <TableHead className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Email</TableHead>
                            <TableHead className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Vai trò</TableHead>
                            <TableHead className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Sửa/xoá</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-700">
                        {users?.map((user) => (
                            <TableRow key={user.id} className="group transition-all hover:-translate-y-1 hover:bg-gray-700/30">
                                <TableCell className="px-6 py-4 font-mono text-gray-500">{user.id}</TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        {user.avatarUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={user.avatarUrl}
                                                alt={user.username}
                                                width={48}
                                                height={64}
                                                className="h-16 w-12 rounded bg-gray-700 object-cover shadow-md"
                                            />
                                        ) : (
                                            <div className="flex h-16 w-12 items-center justify-center rounded bg-gray-700 text-xs font-semibold text-gray-300 shadow-md">
                                                {user.username.slice(0, 1).toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-bold text-white transition-colors group-hover:text-blue-500">
                                                {user.fullName}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500">
                                                {user.username}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        {user.email}
                                    </div>
                                </TableCell>

                                <TableCell className="px-6 py-4x">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                                        user.role === "ADMIN"
                                            ? "border border-purple-500/20 bg-purple-500/10 text-purple-400"
                                            : "border-green-500/20 bg-green-500/10 text-green-500"
                                    }`}>
                                        <Shield className="h-3 w-3" />
                                        {user.role === "ADMIN" ? "Admin" : "User"}
                                    </span>
                                </TableCell>

                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            onClick={() => onEdit(user)}
                                            className="rounded-lg border border-blue-600/20 bg-blue-600/10 p-2 text-blue-500 transition-colors hover:bg-blue-600 hover:text-white"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            onClick={() => onDelete(user)}
                                            className="rounded-lg border border-red-600/20 bg-blue-600/10 p-2 text-red-500 transition-colors hover:bg-red-600 hover:text-white"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
