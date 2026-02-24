"use server";
import { userService } from "../services/user.service";

export const getAdminDashboardStatsAction = async () => {
    const result = await userService.getAdminStats();

    if (result?.success) {
        return result.data;
    }

    return null;
};


export const getMyProfileAction = async () => {
    try {
        const result = await userService.getMyProfile();
        if (result && result.success) {
            return {
                data: result.data,
                error: null
            };
        }

        return {
            data: null,
            error: result.message || "Failed to fetch profile"
        };
    } catch (error) {
        console.error("Action Error (getMyProfile):", error);
        return {
            data: null,
            error: "An unexpected error occurred while fetching profile"
        };
    }
};

export const getAllUsersAction = async () => {
    try {
        const res = await userService.getAllUsers();
        return res; // সার্ভিস থেকে আসা success এবং data রিটার্ন করবে
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to fetch users" };
    }
};


/**
 * ৪. প্রোফাইল আপডেট করার অ্যাকশন
 * (আপনি যদি অ্যাডমিন প্রোফাইল আপডেট বন্ধ রাখতে চান তবে এটি কল করবেন না)
 */
// export const updateUserAction = async (id: string | null, data: Partial<UpdateUser>) => {
//     try {
//         const result = await userService.updateUser(id, data);

//         if (result.success) {
//             revalidateTag("me", "default");
//             revalidateTag("users", "default");
//         }

//         return result;
//     } catch (error) {
//         console.error("Action Error (updateUser):", error);
//         return { success: false, message: "আপডেট প্রসেসটি সম্পন্ন হয়নি" };
//     }
// };

/**
 * ৫. কাস্টমার স্ট্যাটাস পাওয়ার জন্য
 */
export const getCustomerStatsAction = async () => {
    try {
        const stats = await userService.getCustomerStats();

        // টার্মিনালে ডাটা প্রিন্ট হচ্ছে কি না দেখুন
        console.log("Action Status Check:", stats);

        if (!stats || stats.success === false) {
            console.log("No data found or unauthorized");
        }

        return stats;
    } catch (error) {
        console.error("Action Error:", error);
        return { success: false, message: "Customer stats action failed" };
    }
};

