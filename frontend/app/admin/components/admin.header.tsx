import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type PageHeaderProps = {
    title: string;
    description?: string;
    count?: number;
    onAdd: () => void;
};

export default function PageHeader({
    title,
    description,
    count,
    onAdd
}: PageHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Trang quản lý {title}</h1>

                {(description || count !== undefined) && (
                    <p className="text-gray-400 text-sm mt-1">
                        {description}
                        {count !== undefined && (
                            <span> Tổng số: {count}</span>
                        )}
                    </p>
                )}
            </div>

            <div>
                <Button
                    onClick={() => onAdd()}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Thêm {title}
                </Button></div>
        </div>
    );
}