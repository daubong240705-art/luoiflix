"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4">
        <div className="w-full rounded-2xl border border-gray-800 bg-[#141414] p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-600/15 text-red-500">
            <AlertTriangle className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-bold text-white">Không ổn rồi đại vương ơi</h1>
          <p className="mt-2 text-sm text-gray-400">
            Hệ thống gặp sự cố khi tải dữ liệu. Vui lòng thử lại.
          </p>

          {error?.message && (
            <p className="mt-4 rounded-lg border border-gray-800 bg-black/40 p-3 text-xs text-gray-300">
              {error.message}
            </p>
          )}

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
            >
              <RotateCcw className="h-4 w-4" />
              Thử lại
            </button>
            <Link
              href="/"
              className="rounded-md border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-red-500 hover:text-red-400"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
