import { Button } from "@/components/ui/button";
import { Edit, Film, Trash } from "lucide-react";


interface Props {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
}
export default function CategoryTable({ categories, onEdit, onDelete }: Props) {

    return (
        <div className="grid grid-cols-4 gap-6">
            {categories?.map((cat) => (
                <div key={cat.id}
                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all group hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="bg-gray-700/50 p-3.5 rounded-xl group-hover:bg-green-600/20 transition-colors">
                                <Film className="w-6 h-6 text-gray-400 group-hover:text-green-400 transition-colors" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">{cat.name}</h3>
                                <p className="text-gray-500 text-xs">{cat.slug}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                        <div className="flex gap-2">
                            <Button
                                onClick={() => onEdit(cat)}
                                className="p-2 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg transition-colors border border-blue-600/20">
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={() => onDelete(cat)}
                                className="p-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-colors border border-red-600/20">
                                <Trash className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                </div>
            ))}
        </div>




    )
}
