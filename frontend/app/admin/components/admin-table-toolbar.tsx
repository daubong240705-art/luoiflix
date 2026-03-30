"use client";

import { ReactNode } from "react";
import { Search } from "lucide-react";


import { AppInput } from "@/components/shared/AppInput";

type AdminTableToolbarProps = {
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder: string;
    totalItems: number;
    filteredItems: number;
    children?: ReactNode;
};

export default function AdminTableToolbar({
    searchValue,
    onSearchChange,
    searchPlaceholder,
    children,
}: AdminTableToolbarProps) {
    return (
        <div className="mb-4 rounded-xl border border-gray-700 bg-gray-800/80 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <AppInput
                        color="red"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="border-gray-700 bg-gray-900 pl-9 text-white placeholder:text-gray-500"
                    />
                </div>

                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    {children}
                </div>
            </div>
        </div>
    );
}
