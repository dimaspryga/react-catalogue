"use client";

import { useState } from "react";
import PropTypes from "prop-types";

export default function ProductReviews({ product }) {
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // Use actual reviews from API, fallback to empty array if not available
  const apiReviews = Array.isArray(product.reviews) ? product.reviews : [];

  // Transform API reviews to match our component structure
  const transformedReviews = apiReviews.map((review, index) => ({
    id: review.id || index + 1,
    reviewerName: review.reviewerName || "Anonymous",
    reviewerEmail: review.reviewerEmail || "",
    rating: typeof review.rating === "number" ? review.rating : 0,
    date: review.date
      ? new Date(review.date).toLocaleDateString()
      : new Date().toLocaleDateString(),
    comment: review.comment || "No comment provided",
    verified: true,
    helpful: Math.floor(Math.random() * 10), // Mock helpful count
    notHelpful: Math.floor(Math.random() * 3), // Mock not helpful count
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
      review.reviewerName || "Anonymous"
    )}&background=random`,
  }));

  // Sort reviews
  const sortedReviews = [...transformedReviews].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = sortedReviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  // Calculate rating distribution based on actual reviews
  const ratingCounts = [0, 0, 0, 0, 0]; // [1-star, 2-star, 3-star, 4-star, 5-star]
  transformedReviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  // Use product rating from API as the main rating
  const averageRating = typeof product.rating === "number" ? product.rating : 0;
  const totalReviews = transformedReviews.length;

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "highest", label: "Highest Rating" },
    { value: "lowest", label: "Lowest Rating" },
    { value: "helpful", label: "Most Helpful" },
  ];

  if (totalReviews === 0) {
    return (
      <div className="py-8">
        <div className="text-center">
          <div className="mb-2 text-4xl font-bold text-gray-900">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  index < Math.floor(averageRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="mb-4 text-gray-600">Overall Rating</div>
          <div className="p-6 rounded-lg bg-gray-50">
            <p className="text-gray-600">No reviews available yet.</p>
            <p className="mt-2 text-sm text-gray-500">
              Be the first to review this product!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Header with Sort */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Reviews ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
        </h3>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort-reviews" className="text-sm text-gray-600">
            Sort by:
          </label>
          <select
            id="sort-reviews"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Reviews List */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {paginatedReviews.map((review) => (
              <div
                key={review.id}
                className="pb-6 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.reviewerName}
                    className="flex-shrink-0 w-10 h-10 rounded-full"
                  />

                  <div className="flex-1">
                    {/* Reviewer Info */}
                    <div className="flex items-center mb-2 space-x-2">
                      <span className="font-medium text-gray-900">
                        {review.reviewerName}
                      </span>
                      {review.verified && (
                        <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>

                    {/* Rating and Date */}
                    <div className="flex items-center mb-3 space-x-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 ${
                              index < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>

                    {/* Review Comment */}
                    <p className="mb-4 leading-relaxed text-gray-700">
                      {review.comment}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-sm text-gray-500 transition-colors hover:text-green-600">
                        <span>Reply</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-500 transition-colors hover:text-green-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7m5 3v3a2 2 0 01-2 2H9.5a2 2 0 01-1.697-.928L6 12m8-2v2m0 0v2m0-2h2m-2 0h-2"
                          />
                        </svg>
                        <span>{review.helpful}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-sm text-gray-500 transition-colors hover:text-red-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L15 17m-8-3v-2m0 0V9a2 2 0 012-2h2.5a2 2 0 011.697.928L15 12m-8 0h2m0 0h2"
                          />
                        </svg>
                        <span>{review.notHelpful}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(totalPages, 5) }).map(
                  (_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          currentPage === pageNumber
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                )}
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-500">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setCurrentPage(1)}
                className="text-sm font-medium text-green-600 transition-colors hover:text-green-800"
              >
                Show all reviews
              </button>
            </div>
          )}
        </div>

        {/* Rating Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky p-6 rounded-lg bg-gray-50 top-4">
            {/* Overall Rating */}
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center mb-2 space-x-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.floor(averageRating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[rating - 1];
                const percentage =
                  totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="w-2 text-sm text-gray-600">{rating}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 transition-all duration-300 bg-yellow-400 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-sm text-right text-gray-600">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductReviews.propTypes = {
  product: PropTypes.object.isRequired,
};
