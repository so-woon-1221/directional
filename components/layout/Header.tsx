"use client";

import { ChartBar, LayoutDashboard, Table } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <LayoutDashboard />
            </div>
            <span className="text-xl font-bold text-gray-900">Directional</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            <Link
              href="/table"
              className={`
                relative px-4 py-2 text-sm font-medium transition-colors rounded-lg
                ${
                  isActive("/table")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
              `}
            >
              <span className="flex items-center gap-2">
                <Table />
                Table
              </span>
              {isActive("/table") && (
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
                <ChartBar />
                Chart
              </span>
              {isActive("/chart") && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
