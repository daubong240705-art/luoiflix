import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const movieSearchParsers = {
    q: parseAsString.withDefault(""),
    type: parseAsString.withDefault(""),
    status: parseAsString.withDefault(""),
    category: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    year: parseAsInteger.withDefault(0),
};

export const movieSearchParamsCache = createSearchParamsCache(movieSearchParsers);

export type MovieSearchState = {
    q: string;
    type: string;
    status: string;
    category: string[];
    page: number;
    year: number;
};

const normalizeType = (type?: string) => {
    const val = (type ?? "").trim().toLowerCase();
    if (val === "series") return "series";
    if (val === "single") return "single";
    return "";
};

const normalizeCategories = (category?: string | string[]) => {
    const values = Array.isArray(category) ? category : (category ?? "").split(",");
    return values
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);
};
const normalizeQuery = (q?: string) => (q ?? "").trim();
const normalizeStatus = (status?: string) => {
    const val = (status ?? "").trim().toLowerCase();
    if (val === "ongoing") return "ongoing";
    if (val === "completed") return "completed";
    return "";
};
const normalizeYear = (year?: number | string) => {
    const parsed = Number(year);
    return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
};
const escapeFilterValue = (value: string) => value.replace(/'/g, "\\'");

export class MovieQueryBuilder {
    private q = "";
    private type = "";
    private status = "";
    private category: string[] = [];
    private page = 1;
    private year = 0;
    private size = 10;

    static fromState(state: MovieSearchState) {
        return new MovieQueryBuilder()
            .withQuery(state.q)
            .withType(state.type)
            .withStatus(state.status)
            .withCategory(state.category)
            .withPage(state.page)
            .withYear(state.year);
    }

    withQuery(q?: string) {
        this.q = normalizeQuery(q);
        return this;
    }

    withType(type?: string) {
        this.type = normalizeType(type);
        return this;
    }

    withStatus(status?: string) {
        this.status = normalizeStatus(status);
        return this;
    }

    withCategory(category?: string | string[]) {
        this.category = normalizeCategories(category);
        return this;
    }

    withPage(page?: number) {
        const parsed = Number(page);
        this.page = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
        return this;
    }

    withYear(year?: number | string) {
        this.year = normalizeYear(year);
        return this;
    }

    withSize(size = 10) {
        const parsed = Number(size);
        this.size = Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 10;
        return this;
    }

    buildApiParams() {
        const filter = this.buildFilter();

        return {
            ...(filter && { filter }),
            ...(this.type && { type: this.type }),
            ...(this.status && { status: this.status }),
            ...(this.category.length && { category: this.category.join(",") }),
            ...(this.year && { year: this.year }),
            page: this.page,
            size: this.size,
        };
    }

    buildFilter() {
        const conditions: string[] = [];

        if (this.q)
            conditions.push(`title ~~ '%${escapeFilterValue(this.q)}%'`);

        if (this.type)
            conditions.push(`type:'${this.type.toUpperCase()}'`);

        if (this.status)
            conditions.push(`status:'${this.status.toUpperCase()}'`);

        if (this.category.length) {
            const categories = this.category
                .map(c => `categories.slug:'${escapeFilterValue(c)}'`)
                .join(" or ");

            conditions.push(
                this.category.length === 1 ? categories : `(${categories})`
            );
        }

        if (this.year)
            conditions.push(`publishYear:${this.year}`);

        return conditions.join(" and ");
    }

    buildHref() {
        const params = new URLSearchParams();
        if (this.q) params.set("q", this.q);
        if (this.type) params.set("type", this.type);
        if (this.status) params.set("status", this.status);
        if (this.category.length > 0) params.set("category", this.category.join(","));
        if (this.year) params.set("year", String(this.year));
        params.set("page", String(this.page));

        return `/search?${params.toString()}`;
    }

    getState(): MovieSearchState {
        return {
            q: this.q,
            type: this.type,
            status: this.status,
            category: this.category,
            page: this.page,
            year: this.year,
        };
    }
}

type MovieSearchHrefState = Partial<Omit<MovieSearchState, "category">> & {
    category?: string | string[];
};

export const buildMovieSearchHref = (state: MovieSearchHrefState) => {
    const builder = new MovieQueryBuilder()
        .withQuery(state.q)
        .withType(state.type)
        .withStatus(state.status)
        .withCategory(state.category)
        .withPage(state.page)
        .withYear(state.year);

    return builder.buildHref();
};
