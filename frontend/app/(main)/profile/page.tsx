"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ImageUploadField from "@/components/shared/ImageUploadField";

import { authApi, type AccountPayload } from "@/app/services/auth.service";
import { useAuth } from "@/app/context/auth-provider";
import { fileApi } from "@/app/services/file.service";

type SettingsTab = "general";

export default function AccountSettingsPage() {
    const router = useRouter();
    const { setUser } = useAuth();

    const [activeTab, setActiveTab] = useState<SettingsTab>("general");
    const [account, setAccount] = useState<AccountPayload | null>(null);
    const [fullName, setFullName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        const loadAccount = async () => {
            const res = await authApi.getAccount();

            if (+res.statusCode === 401 || +res.statusCode === 403 || !res.data) {
                toast.error("Vui long dang nhap de xem trang tai khoan.");
                router.push("/login");
                return;
            }

            setAccount(res.data);
            setFullName(res.data.fullName ?? "");
            setAvatarUrl(res.data.avatarUrl || "");
            setIsLoading(false);
        };

        void loadAccount();
    }, [router]);

    const avatarPreview = useMemo(
        () => (avatarFile ? URL.createObjectURL(avatarFile) : avatarUrl),
        [avatarFile, avatarUrl]
    );

    useEffect(() => {
        return () => {
            if (avatarPreview.startsWith("blob:")) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    const hasChanges = useMemo(() => {
        if (!account) return false;

        return (
            fullName.trim() !== (account.fullName ?? "") ||
            avatarUrl !== (account.avatarUrl ?? "") ||
            avatarFile !== null
        );
    }, [account, avatarFile, avatarUrl, fullName]);

    const handleSaveChanges = async () => {
        if (!account) return;

        const trimmedName = fullName.trim();

        if (!trimmedName) {
            toast.error("Ten hien thi khong duoc de trong.");
            return;
        }

        setIsSaving(true);

        let nextAvatarUrl = avatarUrl;

        if (avatarFile) {
            const uploadRes = await fileApi.uploadImage(avatarFile, "avatars");

            if (+uploadRes.statusCode >= 400 || !uploadRes.data?.fileUrl) {
                setIsSaving(false);
                toast.error(typeof uploadRes.error === "string" ? uploadRes.error : uploadRes.message || "Khong the tai avatar len.");
                return;
            }

            nextAvatarUrl = uploadRes.data.fileUrl;
        }

        const res = await authApi.updateProfile({
            fullName: trimmedName,
            avatarUrl: nextAvatarUrl,
        });

        setIsSaving(false);

        if (+res.statusCode === 401 || +res.statusCode === 403) {
            toast.error("Phiên đăng nhập đã hết hạn.");
            router.push("/login");
            return;
        }

        if (+res.statusCode >= 400 || !res.data?.user) {
            toast.error(res.message || "Không thể cập nhật.");
            return;
        }

        const updatedUser = res.data.user;

        setAccount(updatedUser);
        setFullName(updatedUser.fullName ?? "");
        setAvatarUrl(updatedUser.avatarUrl || "");
        setAvatarFile(null);

        setUser(updatedUser);

        toast.success("Cập nhật hồ sơ thành công");
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);

        await authApi.logout();

        setUser(null);
        setIsLoggingOut(false);

        toast.success("Đã đăng xuất");
        router.push("/");
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
                <div className="flex items-center gap-3 rounded-2xl border border-gray-800 bg-[#111] px-6 py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-red-500" />
                    Đang tải thông tin tài khoản...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] pb-12 pt-24">
            <div className="container mx-auto max-w-6xl px-4">
                <h1 className="mb-8 text-3xl font-bold text-white">
                    Tài khoản
                </h1>

                <div className="flex flex-col gap-8 lg:flex-row">
                    <aside className="lg:w-1/4">
                        <div className="sticky top-24 rounded-xl border border-gray-800 bg-[#111] p-4">
                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab("general")}
                                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                                        activeTab === "general"
                                            ? "bg-red-600/10 text-red-500"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    <User className="h-4 w-4" />
                                    Thông tin chung
                                </button>
                            </nav>

                            <div className="mt-6 space-y-2 border-t border-gray-800 pt-6">
                                <Link
                                    href="/favorites"
                                    className="block rounded-lg px-4 py-2 text-sm text-gray-400 hover:bg-white/5 hover:text-white"
                                >
                                    Tủ phim
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    disabled={isLoggingOut}
                                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-400 hover:bg-red-600/10 hover:text-red-500"
                                >
                                    {isLoggingOut ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <LogOut className="h-4 w-4" />
                                    )}
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    </aside>

                    <main className="lg:w-3/4">
                        <div className="rounded-xl border border-gray-800 bg-[#111] p-8">
                            <h2 className="mb-6 border-b border-gray-800 pb-4 text-xl font-bold text-white">
                                Hồ sơ cá nhân
                            </h2>

                            <div className="mb-8 flex flex-col items-start gap-8 md:flex-row">
                                <div className="mx-auto flex flex-col items-center gap-4 md:mx-0">
                                    <div className="relative">
                                        <ImageUploadField
                                            previewUrl={avatarPreview}
                                            alt="Avatar"
                                            emptyLabel="Chua co avatar"
                                            placeholderContent={<User className="h-10 w-10 text-gray-500" />}
                                            canReset={Boolean(avatarFile)}
                                            onFileSelect={setAvatarFile}
                                            onReset={() => setAvatarFile(null)}
                                            frameClassName="h-32 w-32 rounded-full ring-4 ring-gray-800 hover:ring-red-500"
                                            emptyClassName="rounded-full"
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex-1 space-y-4">
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full rounded-lg border border-gray-800 bg-[#0a0a0a] px-4 py-2 text-white"
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            value={account?.username}
                                            disabled
                                            className="rounded-lg border border-gray-800 bg-[#1a1a1a] px-4 py-2 text-gray-500"
                                        />

                                        <input
                                            value={account?.email}
                                            disabled
                                            className="rounded-lg border border-gray-800 bg-[#1a1a1a] px-4 py-2 text-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 border-t border-gray-800 pt-6">
                                <Button
                                    onClick={handleSaveChanges}
                                    disabled={!hasChanges || isSaving}
                                    className="bg-red-600 text-white hover:bg-red-700"
                                >
                                    {isSaving && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Lưu
                                </Button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
