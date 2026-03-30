"use client";

import { useEffect, useState } from "react";

import { type MovieSearchState } from "@/lib/filter/MovieQueryBuilder";

type UseSearchFilterPanelProps = {
    value: MovieSearchState;
    onApply: (state: MovieSearchState) => void;
};

export function useSearchFilterPanel({ value, onApply }: UseSearchFilterPanelProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [draft, setDraft] = useState<MovieSearchState>(value);

    useEffect(() => {
        setDraft(value);
    }, [value]);

    const activeFilterCount = [
        value.q,
        value.type,
        value.status,
        value.year > 0 ? String(value.year) : "",
        ...value.category,
    ].filter(Boolean).length;

    const updateDraft = (partial: Partial<MovieSearchState>) => {
        setDraft((prev) => ({ ...prev, ...partial }));
    };

    const toggleCategory = (slug: string) => {
        updateDraft({
            category: draft.category.includes(slug)
                ? draft.category.filter((item) => item !== slug)
                : [...draft.category, slug],
        });
    };

    const handleApply = () => {
        onApply({
            ...draft,
            q: draft.q.trim(),
            page: 1,
            year: Number.isFinite(Number(draft.year)) ? Number(draft.year) : 0,
        });
    };

    const handleReset = () => {
        const resetState: MovieSearchState = {
            q: "",
            type: "",
            status: "",
            category: [],
            page: 1,
            year: 0,
        };

        setDraft(resetState);
        onApply(resetState);
    };

    return {
        isOpen,
        setIsOpen,
        draft,
        activeFilterCount,
        updateDraft,
        toggleCategory,
        handleApply,
        handleReset,
    };
}
