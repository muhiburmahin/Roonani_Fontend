import ProfileSettings from "@/src/components/modules/dashboard/ProfileSettings";

export default function MyProfilePage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1 px-4">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                    Profile Settings
                </h2>
                <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
                    Update your account information
                </p>
            </div>

            {/* The Profile Module */}
            <ProfileSettings />
        </div>
    );
}