
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
import UserForm from "./UserForm";


type Props = {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    mode: "add" | "edit";
    initialData?: User;
};


export default function UserDialog({ open,
    onOpenChange,
    mode,
    initialData,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-150 p-0 bg-gray-900 border-gray-800  flex flex-col" showCloseButton={false}>
                <DialogHeader className="px-6 py-4 border-b border-gray-800 ">
                    <DialogTitle className="text-xl font-bold text-white flex items-center gap-2 ">
                        {mode === "add" ? (
                            <Plus className="text-green-500" />
                        ) : (
                            <Edit className="text-blue-500" />
                        )}
                        {mode === "add" ? "Thêm người dùng Mới" : "Chỉnh Sửa người dùng"}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-400">
                        {mode === "add"
                            ? "Nhập thông tin để thêm người dùng mới vào hệ thống"
                            : "Cập nhật thông tin người dùng"}
                    </DialogDescription>
                </DialogHeader>

                <UserForm
                    key={mode === "edit" ? `user-${initialData?.id ?? "edit"}` : "user-add"}
                    mode={mode}
                    initialData={initialData}
                    onClose={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    )

}
