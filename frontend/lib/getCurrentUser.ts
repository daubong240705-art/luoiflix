import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { cache } from "react";


export interface JwtPayload {
    user: Pick<
        User,
        "id" | "username" | "email" | "fullName" | "avatarUrl" | "role"
    >;
    exp?: number;
    iat?: number;
}

export type AuthUser = Pick<
    User,
    "id" | "username" | "email" | "fullName" | "avatarUrl" | "role"
>;

export const getCurrentUser = cache(async (): Promise<AuthUser | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded?.user ?? null;
    } catch {
        return null;
    }
});