"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReturn } from "react-hook-form";

import { UserPayload, UserSubmitPayload, userSchema, UserSubmitValues } from "@/app/types/form.type";
import { toast } from "sonner";
import { assertApiSuccess, handleFormError, useDeleteWithRefresh } from "../_shared/mutation.utils";
import { userApi } from "@/app/admin/service/api/user.api";
import { fileApi } from "@/app/services/file.service";


export function useUserForm(
    mode: "add" | "edit",
    initialData?: User
) {
    const form = useForm<UserSubmitValues>({
        resolver: zodResolver(userSchema),
        values: mode === "edit" && initialData
            ? {
                fullName: initialData.fullName,
                username: initialData.username,
                email: initialData.email,
                role: initialData.role,
                password: "",
                confirmPassword: "",
            }
            : {
                fullName: "",
                username: "",
                email: "",
                role: "USER",
                password: "",
                confirmPassword: "",
            }
    });
    return form;
}

export const useUserMutation = (
    mode: "add" | "edit",
    form: UseFormReturn<UserSubmitValues>,
    userId?: number,
    onClose?: () => void
) => {
    const router = useRouter();

    return useMutation<IBackendRes<User>, IBackendRes<null>, UserSubmitPayload>({
        mutationFn: async (data: UserSubmitPayload) => {
            const { avatarFile, ...rest } = data;
            let avatarUrl = rest.avatarUrl;

            if (avatarFile) {
                const uploadAvatarResponse = assertApiSuccess(
                    await fileApi.uploadImage(avatarFile, "avatars")
                );
                avatarUrl = uploadAvatarResponse.data?.fileUrl ?? avatarUrl;
            }

            const payload: UserPayload = {
                ...rest,
                avatarUrl,
            };

            const response = await (mode === "add"
                ? userApi.createUser(payload)
                : userApi.updateUser(userId!, payload));
            return assertApiSuccess(response);
        },

        onError: (err) => {
            handleFormError(err, form.setError);
        }
    });
};

export const useDeleteUser = () => {
    const mutation = useDeleteWithRefresh(userApi.deleteUser, "Xoa nguoi dung thanh cong");

    return {
        deleteUser: mutation.mutate,
        isDeleting: mutation.isPending,
    };
};
