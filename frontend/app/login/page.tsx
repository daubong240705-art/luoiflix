"use client";

import Link from "next/link";
import { Film } from "lucide-react";

import { useLoginForm, useLoginMutation } from "@/app/hooks/auth/useLoginForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const form = useLoginForm();
    const loginMutation = useLoginMutation(form);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black"></div>

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="bg-red-600 p-3 rounded-full mb-4">
                            <Film className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Đăng nhập</h1>
                    </div>

                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit((data) => loginMutation.mutate(data))}
                    >
                        <div className="space-y-2">
                            <Label className="text-zinc-200">Tên đăng nhập</Label>
                            <Input
                                placeholder="Nhập tên đang nhập"
                                className="bg-zinc-800 border-zinc-700 text-white"
                                {...register("username")}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">{errors.username.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-zinc-200">Mật khẩu</Label>
                            <Input
                                type="password"
                                placeholder="Nhap mat khau"
                                className="bg-zinc-800 border-zinc-700 text-white"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
                        >
                            {loginMutation.isPending ? "Dang dang nhap..." : "Đăng nhập"}
                        </Button>

                        <div className="text-center">
                            <p className="text-zinc-400 text-sm">
                                Chưa có tài khoản?{" "}
                                <Link
                                    href="/signup"
                                    className="text-red-600 hover:text-red-500 font-semibold transition-colors"
                                >
                                    Đang ký ngay
                                </Link>
                            </p>
                        </div>

                        <div className="w-full h-4 flex items-center justify-center border-zinc-700 bg-transparent border text-zinc-300 hover:bg-zinc-800 hover:text-white py-6 rounded-lg transition-all">
                            <Link href="/">Tiếp tục với tư cách khách</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
