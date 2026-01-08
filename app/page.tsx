import { ChartBar, Table } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Directional</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link
            href="/table"
            className="group block p-8 bg-white rounded-xl border border-gray-200 hover:border-blue-500 transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Table />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Table View
              </h2>
            </div>
          </Link>

          <Link
            href="/chart"
            className="group block p-8 bg-white rounded-xl border border-gray-200 hover:border-indigo-500 transition-all hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <ChartBar />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Chart View
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
