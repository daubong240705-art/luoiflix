export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-4">
        <div className="w-full rounded-2xl border border-gray-800 bg-[#141414] p-8 text-center shadow-2xl">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-red-600" />
          <h2 className="mt-5 text-xl font-semibold text-white">Đang tải dữ liệu...</h2>
          <p className="mt-2 text-sm text-gray-400">Vui lòng đợi trong giây lát.</p>
        </div>
      </div>
    </div>
  );
}
