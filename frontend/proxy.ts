import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
    user?: {
        role?: string;
    };
};

export function proxy(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;

    // nếu chưa login → không cho vào admin
    if (!token) {
        return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    try {
        const decoded = jwtDecode<JwtPayload>(token);

        // không phải ADMIN
        if (decoded.user?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/forbidden", request.url));
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};