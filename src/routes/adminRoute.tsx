import { Routes } from "../types";
export const adminRoutes: Routes[] = [
    {
        title: "Admin Management",
        items: [
            {
                title: "Dashboard",
                url: "/admin-dashboard",
            },
            {
                title: "Categories",
                url: "/admin-dashboard/categories",
            },
            {
                title: "Product",
                url: "/admin-dashboard/product",
            },
            {
                title: "Orders",
                url: "/admin-dashboard/orders",
            },
            {
                title: "My Profile",
                url: "/admin-dashboard/my-profile",
            },
            {
                title: "All Users",
                url: "/admin-dashboard/users",
            },
            {
                title: "Go-To-Home",
                url: "/",
            },
        ],
    },
];