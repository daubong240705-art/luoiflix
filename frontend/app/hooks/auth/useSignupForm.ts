"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SignupForm, signupSchema } from "@/app/types/form.type";
import { assertApiSuccess, handleFormError } from "@/app/hooks/_shared/mutation.utils";
import { authApi, SignupPayload } from "@/app/services/auth.service";

export function useSignupForm() {
  return useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
}

export function useSignupMutation(form: ReturnType<typeof useSignupForm>) {
  const router = useRouter();

  return useMutation<IBackendRes<SignupPayload>, IBackendRes<null>, SignupForm>({
    mutationFn: async (data: SignupForm) => {
      const payload: SignupPayload = {
        fullName: data.fullName,
        email: data.email,
        username: data.username,
        password: data.password,
      };

      const response = await authApi.signup(payload);
      return assertApiSuccess(response);
    },
    onSuccess: () => {
      toast.success("Tạo tài khoản thành cônh, đăng nhập để tiếp tục");
      router.push("/login");
    },
    onError: (err) => {
      handleFormError(err, form.setError);
    },
  });
}
