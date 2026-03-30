import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

interface ConfirmDialogProps {
    Open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export function ConfirmDialog({ Open, onClose, onConfirm, title, message }: ConfirmDialogProps) {
    return (
        <AlertDialog open={Open} onOpenChange={onClose}>
            <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold text-red-500">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400 text-base">
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-gray-700">Hủy bỏ</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white border-0" >
                        Xác nhận xóa
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}