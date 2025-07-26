"use client";

import PropTypes from "prop-types";

export default function SearchResults({
  searchTerm,
  resultsCount,
  totalCount,
  onClearSearch,
}) {
  if (!searchTerm || typeof searchTerm !== "string") return null;

  const safeResultsCount = typeof resultsCount === "number" ? resultsCount : 0;
  const safeTotalCount = typeof totalCount === "number" ? totalCount : 0;

  return (
    <div className="p-4 mb-6 border border-blue-200 rounded-lg bg-blue-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <div>
            <p className="font-medium text-blue-800">
              {safeResultsCount > 0 ? (
                <>
                  Found <span className="font-bold">{safeResultsCount}</span>{" "}
                  result{safeResultsCount !== 1 ? "s" : ""} for{" "}
                  <span className="font-bold">`{searchTerm}`</span>
                </>
              ) : (
                <>
                  No results found for{" "}
                  <span className="font-bold">`{searchTerm}`</span>
                </>
              )}
            </p>
            {safeResultsCount > 0 && safeTotalCount > 0 && (
              <p className="text-sm text-blue-600">
                Showing results from {safeTotalCount} total products
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onClearSearch}
          className="flex items-center space-x-1 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
        >
          <span>Clear</span>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {safeResultsCount === 0 && (
        <div className="pt-3 mt-3 border-t border-blue-200">
          <p className="mb-2 text-sm text-blue-700">Try these suggestions:</p>
          <ul className="space-y-1 text-sm text-blue-600">
            <li>• Check your spelling</li>
            <li>• Use more general keywords</li>
            <li>• Try different product categories</li>
            <li>• Browse our popular products instead</li>
          </ul>
        </div>
      )}
    </div>
  );
}

SearchResults.propTypes = {
  searchTerm: PropTypes.string,
  resultsCount: PropTypes.number,
  totalCount: PropTypes.number,
  onClearSearch: PropTypes.func,
};
