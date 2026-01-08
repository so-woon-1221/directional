"use client";

import { ChartBar, LayoutDashboard, LogIn, Table } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderClientProps {
  isLoggedIn: boolean;
}

export default function HeaderClient({ isLoggedIn }: HeaderClientProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <LayoutDashboard className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Dashboard</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Navigation */}
            <nav className="flex items-center space-x-2">
              <Link
                href="/posts"
                className={`
                relative px-4 py-2 text-sm font-medium transition-colors rounded-lg
                ${
                  isActive("/posts")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
              >
                <span className="flex items-center gap-2">
                  <Table className="h-4 w-4" />
                  Posts
                </span>
                {isActive("/posts") && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </Link>

              <Link
                href="/chart"
                className={`
                relative px-4 py-2 text-sm font-medium transition-colors rounded-lg
                ${
                  isActive("/chart")
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
              >
                <span className="flex items-center gap-2">
                  <ChartBar className="h-4 w-4" />
                  Chart
                </span>
                {isActive("/chart") && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                )}
              </Link>
            </nav>

            {isLoggedIn ? null : (
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
