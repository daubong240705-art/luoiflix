"use client";

import { Filter, RotateCcw } from "lucide-react";

import { type MovieSearchState } from "@/lib/filter/MovieQueryBuilder";
import { useSearchFilterPanel } from "@/app/hooks/search/useSearchFilterPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SearchFilterPanelProps = {
    categories: Category[];
    value: MovieSearchState;
    onApply: (state: MovieSearchState) => void;
};

const typeOptions = [
    { label: "Tất cả", value: "" },
    { label: "Phim lẻ", value: "single" },
    { label: "Phim bộ", value: "series" },
];

const statusOptions = [
    { label: "Tất cả", value: "" },
    { label: "Đang chiếu", value: "ongoing" },
    { label: "Hoàn thành", value: "completed" },
];

const yearOptions = [
    { label: "Tất cả", value: 0 },
    ...Array.from({ length: 8 }, (_, index) => {
        const year = new Date().getFullYear() - index;
        return { label: String(year), value: year };
    }),
];

const chipClass = (isActive: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition ${isActive
        ? "border-red-500 bg-red-600 text-white"
        : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500 hover:text-white"
    }`;

export default function SearchFilterPanel({
    categories,
    value,
    onApply,
}: SearchFilterPanelProps) {
    const {
        isOpen,
        setIsOpen,
        draft,
        activeFilterCount,
        updateDraft,
        toggleCategory,
        handleApply,
        handleReset,
    } = useSearchFilterPanel({ value, onApply });

    const renderButtons = <T extends string | number>(
        options: Array<{ label: string; value: T }>,
        selectedValue: T,
        onSelect: (value: T) => void
    ) => (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option.label}
                    type="button"
                    className={chipClass(selectedValue === option.value)}
                    onClick={() => onSelect(option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );

    return (
        <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900/80 p-4">
            <div className="flex flex-col gap-3">

                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
                    >
                        <Filter className="h-4 w-4" />
                        {activeFilterCount > 0 ? (
                            <span className="ml-1 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
                                {activeFilterCount}
                            </span>
                        ) : null}
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleReset}
                        className="text-gray-400 hover:bg-gray-800 hover:text-white"
                    >
                        <RotateCcw className="h-4 w-4" />

                    </Button>
                </div>
            </div>

            {isOpen ? (
                <div className="mt-5 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-gray-200">Từ khoá</Label>
                        <Input
                            value={draft.q}
                            onChange={(e) => updateDraft({ q: e.target.value })}
                            placeholder="Nhap ten phim..."
                            className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label className="text-gray-200">Loại phim</Label>
                        {renderButtons(typeOptions, draft.type, (value) => updateDraft({ type: value }))}
                    </div>

                    <div className="space-y-3">
                        <Label className="text-gray-200">Trạng thái</Label>
                        {renderButtons(statusOptions, draft.status, (value) => updateDraft({ status: value }))}
                    </div>

                    <div className="space-y-3">
                        <Label className="text-gray-200">Năm phát hành</Label>
                        {renderButtons(yearOptions, draft.year, (value) => updateDraft({ year: value }))}
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <Label className="text-gray-200">Thể loại</Label>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className={chipClass(draft.category.length === 0)}
                                onClick={() => updateDraft({ category: [] })}
                            >
                                Tất cả
                            </button>

                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    className={chipClass(draft.category.includes(category.slug))}
                                    onClick={() => toggleCategory(category.slug)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            type="button"
                            onClick={handleApply}
                            className="bg-red-600 text-white hover:bg-red-700"
                        >
                            Áp dụng bộ lọc
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                            className="border-gray-700 bg-transparent text-gray-200 hover:bg-gray-800 hover:text-white"
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
