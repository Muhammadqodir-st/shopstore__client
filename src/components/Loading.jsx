export default function Loading() {

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        {/* spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        {/* text */}
        <p className="text-gray-600 font-medium tracking-wide">Loading...</p>
      </div>
    </div>
  );
  
}