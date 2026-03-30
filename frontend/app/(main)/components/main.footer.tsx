import { Film } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-gray-800">
            <div className="container mx-auto px-4 py-12 gap-8">
                <div className="grid grid-cols-1 gap-8">
                    <div className="flex items-center gap-2 text-red-600 mb-4">
                        <Film className="w-8 h-8" />
                        <span className="text-2xl font-bold">LUOIFLIX</span>

                    </div>
                    <div className="text-gray-500">
                        <p>
                            Dữ liệu trên website chỉ mang tính chất sưu tầm và tham khảo nhiều nguồn trên Internet,
                            không sử dụng cho mục đích thương mại hay trục lợi.
                        </p>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        <p>© 2026 LUOIFLIX.</p>
                    </div>

                </div>
            </div>
        </footer>
    )
}