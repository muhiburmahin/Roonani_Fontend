"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import CustomerOverview from "@/src/components/modules/dashboard/CustomerOverview";
import { authClient } from "@/src/lib/auth-client";

export default function DashboardPage() {
    const router = useRouter();
    const [isVerifying, setIsVerifying] = useState(true);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const session = await authClient.getSession();
                if (!session?.data?.user) {
                    console.warn("[Dashboard] No session found, redirecting to login");
                    router.push("/login");
                    return;
                }
                console.log("[Dashboard] Session verified for user:", session.data.user.email);
                setIsVerifying(false);
            } catch (error) {
                console.error("[Dashboard] Session verification failed:", error);
                router.push("/login");
            }
        };

        verifySession();
    }, [router]);

    if (isVerifying) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <Loader2 className="animate-spin text-brand" size={40} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Verifying session...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Page Header Area */}
            <div className="flex flex-col gap-2 px-2">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                    My Dashboard
                </h2>
                <p className="text-slate-500 font-bold">
                    Welcome back to your account.
                </p>
            </div>

            {/* The Overview Module Section */}
            <CustomerOverview />
        </div>
    );
}