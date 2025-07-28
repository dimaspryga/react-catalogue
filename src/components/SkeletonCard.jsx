export default function SkeletonCard() {
  return (
    <div className="relative overflow-hidden bg-white shadow-sm rounded-2xl animate-pulse h-80">
      {/* Background Image Skeleton - Fills entire card */}
      <div className="absolute inset-0 bg-gray-200"></div>

      {/* Top Badges Skeleton */}
      <div className="absolute z-10 flex items-start justify-between top-3 left-3 right-3">
        <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>

      {/* Content Panel Skeleton - Fixed at bottom of original card */}
      <div className="absolute left-0 right-0 z-10" style={{ bottom: "0px" }}>
        <div className="px-4 pb-4">
          <div className="overflow-hidden shadow-lg bg-white/95 backdrop-blur-sm rounded-xl">
            <div className="p-4">
              {/* Title Skeleton */}
              <div className="h-5 mb-2 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-5 mb-3 bg-gray-200 rounded"></div>

              {/* Rating Skeleton */}
              <div className="flex items-center mb-3">
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 bg-gray-200 rounded"
                    ></div>
                  ))}
                </div>
                <div className="w-16 h-4 ml-2 bg-gray-200 rounded"></div>
              </div>

              {/* Price Skeleton */}
              <div className="flex items-center space-x-2">
                <div className="w-16 h-6 bg-gray-200 rounded"></div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
