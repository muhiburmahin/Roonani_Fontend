import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/src/services/user.service";
import { Roles } from "@/src/constants/role";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const { data } = await userService.getSession();
    const session = data;

    if (!session || !session.user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRole = session.user.role?.toUpperCase();

    if (userRole === Roles.admin) {
        if (pathname === "/dashboard") {
            return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }
    }

    if (userRole === Roles.customer) {
        if (pathname.startsWith("/admin-dashboard")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin-dashboard/:path*",
    ],
};