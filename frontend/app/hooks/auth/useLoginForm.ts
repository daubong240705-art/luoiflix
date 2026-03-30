"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoginForm, loginSchema } from "@/app/types/form.type";
import { assertApiSuccess, handleFormError } from "@/app/hooks/_shared/mutation.utils";
import { authApi } from "@/app/services/auth.service";

export function useLoginForm() {
    return useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });
}

export function useLoginMutation(form: ReturnType<typeof useLoginForm>) {
    const router = useRouter();

    return useMutation<IBackendRes<User>, IBackendRes<null>, LoginForm>({
        mutationFn: async (data: LoginForm) => {
            const response = await authApi.login(data);
            return assertApiSuccess(response);
        },
        onSuccess: () => {
            toast.success("Đăng nhập thành công");
            router.push("/");
            router.refresh();
        },
        onError: (err) => {
            handleFormError(err, form.setError);
        },
    });
}
