import { Home, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Error Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full"></div>
                        <div className="relative bg-linear-to-br from-red-500 to-red-700 p-8 rounded-full">
                            <ShieldAlert className="w-24 h-24 text-white" />
                        </div>
                    </div>
                </div>

                {/* Error Code */}
                <div className="mb-6">
                    <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500">
                        403
                    </h1>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Truy Cập Bị Từ Chối
                    </h2>
                    <p className="text-gray-400 text-lg mb-2">
                        Bạn không có quyền truy cập vào trang này.
                    </p>
                    <p className="text-gray-500">
                        Vui lòng kiểm tra quyền truy cập của bạn hoặc liên hệ quản trị viên.
                    </p>
                </div>


                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
                    >
                        <Home className="w-5 h-5" />
                        Về Trang Chủ
                    </Link>

                </div>


            </div>
        </div>
    );
}
