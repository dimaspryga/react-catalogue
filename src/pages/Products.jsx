"use client";

import ProductCard from "../components/ProductCard";
import SearchInput from "../components/SearchInput";
import SearchResults from "../components/SearchResults";
import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";
import SkeletonCard from "../components/SkeletonCard";
import Banner from "../components/Banner";
import { useProducts } from "../hooks/useProducts";
import { useFilters } from "../hooks/useFilters";
import { usePagination } from "../hooks/usePagination";

const ITEMS_PER_PAGE = 20;

export default function Products() {
  const { products, loading, error, categories } = useProducts();

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredAndSortedProducts,
    resetFilters,
    clearSearch,
    hasActiveFilters,
    searchResultsCount,
  } = useFilters(products);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    setCurrentPage,
  } = usePagination(filteredAndSortedProducts, ITEMS_PER_PAGE);

  // Safe category options generation
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...(Array.isArray(categories)
      ? categories.map((cat) => ({
          value: cat,
          label:
            cat && typeof cat === "string"
              ? cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")
              : "Unknown Category",
        }))
      : []),
  ];

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "name", label: "Name A-Z" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    ...(searchTerm ? [{ value: "relevance", label: "Most Relevant" }] : []),
  ];

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            Error Loading Products
          </h1>
          <p className="mb-4 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Product Catalog
          </h1>
          <p className="text-gray-600">
            Discover amazing products at great prices
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search products by name, description, brand, or category..."
              />
            </div>

            <div className="flex flex-col w-full gap-4 sm:flex-row lg:w-auto">
              <Dropdown
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Select Category"
              />

              <Dropdown
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                placeholder="Sort By"
              />
            </div>
          </div>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <div className="flex justify-center">
              <button
                onClick={resetFilters}
                className="flex items-center space-x-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
              >
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Clear all filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Search Results Info */}
        <SearchResults
          searchTerm={searchTerm}
          resultsCount={searchResultsCount}
          totalCount={Array.isArray(products) ? products.length : 0}
          onClearSearch={clearSearch}
        />

        {/* Banner Section - Only show when not searching */}
        {!searchTerm && <Banner />}

        {/* Results Info */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing{" "}
              {Array.isArray(paginatedProducts) ? paginatedProducts.length : 0}{" "}
              of{" "}
              {Array.isArray(filteredAndSortedProducts)
                ? filteredAndSortedProducts.length
                : 0}{" "}
              products
              {hasActiveFilters &&
                !searchTerm &&
                ` (filtered from ${
                  Array.isArray(products) ? products.length : 0
                } total)`}
            </p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : Array.isArray(paginatedProducts) &&
            paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="py-12 text-center col-span-full">
              <div className="mb-4 text-gray-400">
                {searchTerm ? (
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
                    />
                  </svg>
                )}
              </div>
              <p className="mb-2 text-lg text-gray-500">
                {searchTerm
                  ? `No products found for "${searchTerm}"`
                  : "No products found"}
              </p>
              <p className="text-sm text-gray-400">
                {searchTerm
                  ? "Try adjusting your search terms or browse our categories"
                  : "Try adjusting your search or filter criteria"}
              </p>
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="px-6 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Browse All Products
                </button>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading &&
          Array.isArray(filteredAndSortedProducts) &&
          filteredAndSortedProducts.length > ITEMS_PER_PAGE && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
      </div>
    </div>
  );
}
