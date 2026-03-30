"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type AdminTablePaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function AdminTablePagination({
    currentPage,
    totalPages,
    onPageChange,
}: AdminTablePaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <Pagination className="mt-6">
            <PaginationContent>
                {currentPage > 1 ? (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(currentPage - 1);
                            }}
                            className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                        />
                    </PaginationItem>
                ) : null}

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(page);
                            }}
                            className={`border-gray-700 ${page === currentPage
                                ? "bg-red-600 text-white hover:bg-red-600"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {currentPage < totalPages ? (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(currentPage + 1);
                            }}
                            className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                        />
                    </PaginationItem>
                ) : null}
            </PaginationContent>
        </Pagination>
    );
}
