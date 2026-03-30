import { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { Lock, Mail, Save, User2 } from "lucide-react";

import { AppInput } from "@/components/shared/AppInput";
import { FormError } from "@/components/shared/FormError";
import ImageUploadField from "@/components/shared/ImageUploadField";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserForm, useUserMutation } from "@/app/hooks/user/useUserForm";
import { UserFormValues, UserSubmitPayload } from "@/app/types/form.type";
import { toast } from "sonner";

type Props = {
    mode: "add" | "edit";
    initialData?: User;
    onClose: () => void;
};

export default function UserForm({ mode, initialData, onClose }: Props) {
    const form = useUserForm(mode, initialData);
    const mutation = useUserMutation(mode, form, initialData?.id, onClose);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const avatarPreview = useMemo(
        () => (avatarFile ? URL.createObjectURL(avatarFile) : (initialData?.avatarUrl ?? "")),
        [avatarFile, initialData?.avatarUrl]
    );

    useEffect(() => {
        return () => {
            if (avatarPreview.startsWith("blob:")) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    const onSubmit = async (data: UserFormValues) => {

        const payload: UserSubmitPayload = {
            fullName: data.fullName,
            username: data.username,
            email: data.email,
            role: data.role,
            password: data.password || undefined,
            avatarUrl: initialData?.avatarUrl || undefined,
            avatarFile,
        };
        await toast.promise(
            mutation.mutateAsync(payload),
            {
                loading: mode === "add" ? "Đang tạo user..." : "Đang cập nhật user...",
                success: (res) => {
                    const name = res.data?.username || "user";
                    onClose();
                    return mode === "add"
                        ? `Tạo ${name} thành công!`
                        : `Cập nhật ${name} thành công!`;
                },
                error: () => {
                    return mode === "add"
                        ? "Tạo user thất bại!"
                        : "Cập nhật user thất bại!";
                },
            }
        );
    }


    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 p-6">
                <div className="flex flex-row gap-8">
                    <div className="flex flex-col items-center">
                        <ImageUploadField
                            previewUrl={avatarPreview}
                            alt={form.watch("username") || "avatar"}
                            emptyLabel="Chua co avatar"
                            placeholderContent={<User2 className="h-12 w-12 text-gray-500" />}
                            helperText={avatarFile?.name || "Hover vao avatar de chon anh hoac hoan tac"}
                            canReset={Boolean(avatarFile)}
                            onFileSelect={setAvatarFile}
                            onReset={() => setAvatarFile(null)}
                            frameClassName="h-28 w-28 rounded-full bg-gray-900 group-hover:border-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/20"
                            emptyClassName="rounded-full"
                        />
                        <span className="mt-3 text-sm text-gray-400">Ảnh đại diện</span>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-400">Họ và tên</label>
                            <AppInput
                                {...form.register("fullName")}
                                type="text"
                                color="blue"
                                placeholder="Nhap ho va ten"
                                className="px-4 py-5 text-white"
                            />
                            <FormError message={form.formState.errors.fullName?.message} />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-400">Tên đăng nhập</label>
                            <AppInput
                                {...form.register("username")}
                                type="text"
                                color="blue"
                                placeholder="username"
                                disabled={mode === "edit"}
                                className="px-4 py-5 text-white"
                            />
                            <FormError message={form.formState.errors.username?.message} />
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-400">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                            <AppInput
                                {...form.register("email")}
                                type="email"
                                color="blue"
                                placeholder="email@example.com"
                                className="px-4 py-5 pl-10 text-white"
                            />
                        </div>
                        <FormError message={form.formState.errors.email?.message} />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-400">Vai trò</label>
                        <Controller
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <Select key={field.value} value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full rounded-lg border-gray-700 bg-gray-800 px-4 py-5 text-white transition-all hover:border-blue-500/50 focus:border-blue-500 data-placeholder:font-sm data-placeholder:text-gray-400">
                                        <SelectValue placeholder="Vai tro" />
                                    </SelectTrigger>
                                    <SelectContent className="border border-gray-700 bg-gray-800 text-white">
                                        <SelectItem value="ADMIN" className="cursor-pointer focus:bg-gray-700 data-[state=checked]:bg-blue-600">Quản trị viên</SelectItem>
                                        <SelectItem value="USER" className="cursor-pointer focus:bg-gray-700 data-[state=checked]:bg-blue-600">Người dùng</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FormError message={form.formState.errors.role?.message} />
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                        <Lock className="h-4 w-4" /> Thiết lập mật khẩu
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <AppInput
                                {...form.register("password")}
                                type="password"
                                color="blue"
                                placeholder="Mật khẩu"
                                className="px-4 py-5 text-white"
                            />
                            <FormError message={form.formState.errors.password?.message} />
                        </div>
                        <div>
                            <AppInput
                                {...form.register("confirmPassword")}
                                type="password"
                                color="blue"
                                placeholder="Xác nhận mật khẩu"
                                className="px-4 py-5 text-white"
                            />
                            <FormError message={form.formState.errors.confirmPassword?.message} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-800 px-6 py-4">
                <Button type="button" onClick={onClose} className="rounded-lg px-5 py-2 text-gray-300 hover:bg-gray-800">
                    Huỷ bỏ
                </Button>

                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2 font-bold text-white hover:bg-red-700"
                >
                    <Save className="h-4 w-4" />
                    {mutation.isPending ? "Đang lưu..." : "Lưu"}
                </Button>
            </div>
        </form>
    );
}
