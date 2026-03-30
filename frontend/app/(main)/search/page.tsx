import { movieSearchParamsCache } from "@/lib/filter/MovieQueryBuilder";
import { getCategories } from "@/lib/api/main.api";

import SearchPageClient from "./search-page-client";

type SearchPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const parsed = await movieSearchParamsCache.parse(searchParams);
    const categoriesRes = await getCategories();
    const initialState = {
        q: parsed.q,
        type: parsed.type,
        status: parsed.status,
        category: parsed.category
            ? parsed.category.split(",").map((item) => item.trim()).filter(Boolean)
            : [],
        page: parsed.page,
        year: parsed.year,
    };

    return (
        <SearchPageClient
            key={JSON.stringify(initialState)}
            initialState={initialState}
            categories={categoriesRes.data?.result ?? []}
        />
    );
}
