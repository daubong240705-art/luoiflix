"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Film, Users, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Film, label: "Quản lý phim", href: "/admin/movies" },
    { icon: Tag, label: "Quản lý thể loại", href: "/admin/categories" },
    { icon: Users, label: "Quản lý người dùng", href: "/admin/users" },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-gray-800 border-r border-gray-700 min-h-screen sticky top-0">
            <div className="p-6">
                {/* Logo */}
                <div className="flex items-center gap-2 text-red-600 mb-8">
                    <Film className="w-8 h-8" />
                    <span className="text-2xl font-bold">Admin</span>
                </div>

                {/* Menu */}
                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Button
                                key={item.href}
                                asChild
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3 px-4 py-3 rounded-lg font-medium transition-colors",
                                    isActive
                                        ? "bg-red-600 text-white shadow-lg shadow-red-900/20 hover:bg-red-600"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                )}
                            >
                                <Link href={item.href}>
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </Button>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
