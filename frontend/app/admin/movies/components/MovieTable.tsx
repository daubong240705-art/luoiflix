import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Props {
    movies: Movie[];
    onEdit: (movie: Movie) => void;
    onDelete: (movie: Movie) => void;
}

export default function MoviesTable({ movies, onEdit, onDelete }: Props) {
    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl">
            <div className="overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-900/50 text-left border-b border-gray-700">
                            <TableHead className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">ID</TableHead>
                            <TableHead className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Thông tin phim</TableHead>
                            <TableHead className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Thể loại</TableHead>
                            <TableHead className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Trạng thái</TableHead>
                            <TableHead className="px-6 py-4 text-gray-400 font-semibold text-sm uppercase tracking-wider">Sửa/xoá</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-700">

                        {movies?.map((movie) => (
                            <TableRow key={movie.id} className="hover:bg-gray-700/30 transition-all group hover:-translate-y-1">
                                <TableCell className="px-6 py-4 text-gray-500 font-mono">{movie.id}</TableCell>
                                <TableCell className="px-6 py-4x">
                                    <div className="flex items-center gap-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={movie.posterUrl}
                                            alt={movie.title}
                                            width={48}
                                            height={64}
                                            className="w-12 h-16 object-cover rounded bg-gray-700 shadow-md"
                                        />
                                        <div>
                                            <div className="text-white font-bold group-hover:text-red-500 transition-colors">
                                                {movie.title}
                                            </div>
                                            <div className="text-gray-500 text-xs mt-1">
                                                {movie.publishYear}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="px-6 py-4x">
                                    <div className="flex flex-wrap gap-1.5">
                                        {movie.categories.slice(0, 2).map((cat) => {

                                            return (
                                                <span key={cat.id} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs border border-gray-600">
                                                    {cat.name}
                                                </span>);
                                        })}
                                        {movie.categories.length > 2 && (
                                            <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs border border-gray-600">
                                                +{movie.categories.length - 2}
                                            </span>
                                        )} </div>
                                </TableCell>

                                <TableCell className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${movie.status === 'ONGOING'
                                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                        : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                        }`}>
                                        {movie.status === 'ONGOING' ? 'Đang phát' : 'Hoàn thành'}
                                    </span>
                                </TableCell>

                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                        <Button
                                            onClick={() => onEdit(movie)}
                                            className="p-2 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-lg border border-blue-600/20">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            onClick={() => onDelete(movie)}
                                            className="p-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-lg border border-red-600/20">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
