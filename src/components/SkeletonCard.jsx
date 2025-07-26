export default function SkeletonCard() {
  return (
    <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Category & Brand */}
        <div className="flex items-center justify-between mb-2">
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
          <div className="w-12 h-3 bg-gray-200 rounded"></div>
        </div>

        {/* Title */}
        <div className="h-5 mb-2 bg-gray-200 rounded"></div>
        <div className="w-3/4 h-5 mb-3 bg-gray-200 rounded"></div>

        {/* Description */}
        <div className="h-4 mb-1 bg-gray-200 rounded"></div>
        <div className="w-5/6 h-4 mb-3 bg-gray-200 rounded"></div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-4 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="w-8 h-4 ml-2 bg-gray-200 rounded"></div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-16 h-6 bg-gray-200 rounded"></div>
            <div className="w-12 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="w-20 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
