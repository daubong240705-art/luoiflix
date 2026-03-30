"use client";

import { createContext, useContext, useState } from "react";

export type AuthUser = {
    id: number;
    username: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    role: string;
};

type AuthContextType = {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
    children,
    initialUser,
}: {
    children: React.ReactNode;
    initialUser: AuthUser | null;
}) {
    const [user, setUser] = useState<AuthUser | null>(initialUser);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return ctx;
}