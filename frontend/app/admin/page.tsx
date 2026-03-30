import { Film, Play, User } from "lucide-react";

import { getDashboardSummary } from "@/lib/api/admin.api";

const formatNumber = (value: number) => new Intl.NumberFormat("vi-VN").format(value);

export default async function AdminPage() {
    const summaryResponse = await getDashboardSummary();
    const summary = summaryResponse.data ?? {
        totalMovies: 0,
        totalUsers: 0,
        totalViews: 0,
    };

    return (
        <div className="space-y-6">
            <div className="rounded-lg bg-gray-800 p-6">
                <h2 className="mb-4 text-xl font-semibold text-white">Trang quản trị</h2>
                <p className="text-gray-400">Chào mừng bạn đến với trang quản trị hệ thống.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-linear-to-br from-blue-600 to-blue-700 p-6 text-white">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="rounded-lg bg-white/20 p-3">
                            <Film className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold">{formatNumber(summary.totalMovies)}</span>
                    </div>
                    <h3 className="text-sm font-medium opacity-90">Tổng số phim</h3>
                </div>

                <div className="rounded-lg bg-linear-to-br from-green-600 to-green-700 p-6 text-white">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="rounded-lg bg-white/20 p-3">
                            <User className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold">{formatNumber(summary.totalUsers)}</span>
                    </div>
                    <h3 className="text-sm font-medium opacity-90">Tổng số người dùng</h3>
                </div>

                <div className="rounded-lg bg-linear-to-br from-purple-600 to-purple-700 p-6 text-white">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="rounded-lg bg-white/20 p-3">
                            <Play className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold">{formatNumber(summary.totalViews)}</span>
                    </div>
                    <h3 className="text-sm font-medium opacity-90">Tổng số lượt xem</h3>
                </div>
            </div>
        </div>
    );
}
