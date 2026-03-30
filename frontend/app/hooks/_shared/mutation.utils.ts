/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export type ApiFailure = {
    statusCode?: number | string;
    error?: unknown;
    message?: string;
};


export const assertApiSuccess = <T>(response: T): T => {
    const apiError = response as ApiFailure;
    const statusCode = Number(apiError?.statusCode ?? 200);

    if (statusCode >= 400 || apiError?.error) {
        throw response;
    }

    return response;
};

export const handleFormError = <T extends FieldValues>(
    err: IBackendRes<any>,
    setError: UseFormSetError<T>
) => {
    const serverErrors = err.error;

    if (serverErrors && typeof serverErrors === 'object' && !Array.isArray(serverErrors)) {
        Object.keys(serverErrors).forEach((field) => {
            setError(field as Path<T>, {
                type: "server",
                message: serverErrors[field],
            });
        });

        toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại!");
    }
    else {
        const errorMessage = Array.isArray(serverErrors)
            ? serverErrors[0]
            : typeof serverErrors === 'string'
                ? serverErrors
                : err.message;

        toast.error(errorMessage || "Có lỗi xảy ra trong quá trình lưu dữ liệu!");
    }
};



export const useDeleteWithRefresh = <TId>(
    mutationFn: (id: TId) => Promise<any>,
    successMessage: string = "Xóa dữ liệu thành công!"
) => {
    const router = useRouter();

    return useMutation<IBackendRes<any>, IBackendRes<null>, TId>({
        mutationFn: async (id: TId) => {
            const response = await mutationFn(id);
            return assertApiSuccess(response);
        },

        onSuccess: () => {
            router.refresh();
            toast.success(successMessage);
        },

        onError: (err) => {
            const serverErrors = err.error;

            const errorMessage = Array.isArray(serverErrors)
                ? serverErrors[0]
                : typeof serverErrors === 'string'
                    ? serverErrors
                    : err.message;

            toast.error(errorMessage || "Có lỗi xảy ra trong quá trình xóa dữ liệu!");
        },
    });
};
