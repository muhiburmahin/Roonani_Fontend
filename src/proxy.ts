import { NextRequest, NextResponse } from "next/server";
import { Roles } from "@/src/constants/role";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // ১. সরাসরি কুকি থেকে সেশন টোকেন চেক করুন (সবথেকে দ্রুত এবং নিরাপদ পদ্ধতি)
    const sessionToken = request.cookies.get("__Secure-better-auth.session_token") || 
                         request.cookies.get("better-auth.session_token");

    // ২. যদি টোকেন না থাকে, সরাসরি লগইন পেজে পাঠান
    if (!sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // ৩. ইউজারের রোল চেক করার জন্য আপনার ব্যাকএন্ডে রিকোয়েস্ট পাঠান
    // মিডলওয়্যারে কুকি ফরওয়ার্ড করা বাধ্যতামূলক
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/get-session`, {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        });
        
        const session = await response.json();
        const user = session?.user;

        if (!user) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const userRole = user.role?.toUpperCase();

        // অ্যাডমিন রিডাইরেক্ট লজিক
        if (userRole === Roles.admin.toUpperCase()) {
            if (pathname === "/dashboard") {
                return NextResponse.redirect(new URL("/admin-dashboard", request.url));
            }
        }

        // কাস্টমার রিডাইরেক্ট লজিক
        if (userRole === Roles.customer.toUpperCase()) {
            if (pathname.startsWith("/admin-dashboard")) {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }
        }

    } catch (error) {
        console.error("Middleware Auth Error:", error);
        // এরর হলে নিরাপত্তার জন্য ড্যাশবোর্ডে ঢুকতে না দেওয়াই ভালো
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin-dashboard/:path*",
    ],
};