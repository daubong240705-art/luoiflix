
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
import CategoryForm from "./CategoryForm";


type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    mode: "add" | "edit";
    initialData?: Category;
};
export default function CategoryDialog({ open,
    onOpenChange,
    mode,
    initialData, }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className=" w-140 p-0 bg-gray-900 border-gray-800  flex flex-col" showCloseButton={false}>
                <DialogHeader className="px-6 py-4 border-b border-gray-800 ">
                    <DialogTitle className="text-xl font-bold text-white flex items-center gap-2 ">
                        {mode === "add" ? (
                            <Plus className="text-green-500" />
                        ) : (
                            <Edit className="text-blue-500" />
                        )}
                        {mode === "add" ? "Thêm Phim Mới" : "Chỉnh Sửa Phim"}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-400">
                        {mode === "add"
                            ? "Nhập thông tin để thêm thể loại mới"
                            : "Cập nhật thông tin thể loại"}
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm
                    mode={mode}
                    initialData={initialData}
                    onClose={() => onOpenChange(false)}
                />

            </DialogContent>
        </Dialog>
    )
}
