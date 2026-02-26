import { getMyProfileAction } from "@/src/actions/user.action";
import AdminProfile from "@/src/components/modules/admin/AdminProfile";

// Mark as dynamic to prevent build-time fetch failures
export const dynamic = 'force-dynamic';

export default async function MyProfilePage() {
    const result = await getMyProfileAction();

    if (!result?.data) {
        return (
            <div className="flex items-center justify-center h-screen font-bold text-rose-500">
                Failed to load profile: {result?.error || "Unknown Error"}
            </div>
        );
    }

    return <AdminProfile user={result.data} />;
}