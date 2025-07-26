"use client";

import { useState, useMemo } from "react";

export const useFilters = (products) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Safe string check function
  const safeString = (value) => {
    return value && typeof value === "string" ? value : "";
  };

  // Enhanced search function with proper error handling
  const searchProducts = (products, searchTerm) => {
    if (!searchTerm || searchTerm.trim() === "") {
      return products;
    }

    if (!Array.isArray(products) || products.length === 0) {
      return [];
    }

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    return products.filter((product) => {
      // Ensure product exists and has required properties
      if (!product || typeof product !== "object") {
        return false;
      }

      try {
        // Search in product title with safe string conversion
        const title = safeString(product.title);
        const titleMatch = title.toLowerCase().includes(normalizedSearchTerm);

        // Search in product description with safe string conversion
        const description = safeString(product.description);
        const descriptionMatch = description
          .toLowerCase()
          .includes(normalizedSearchTerm);

        // Search in product brand with safe string conversion
        const brand = safeString(product.brand);
        const brandMatch = brand.toLowerCase().includes(normalizedSearchTerm);

        // Search in product category with safe string conversion
        const category = safeString(product.category);
        const categoryMatch = category
          .toLowerCase()
          .includes(normalizedSearchTerm);

        // Return true if any field matches
        return titleMatch || descriptionMatch || brandMatch || categoryMatch;
      } catch (error) {
        console.warn("Error filtering product:", product, error);
        return false;
      }
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    // Ensure products is an array
    if (!Array.isArray(products)) {
      return [];
    }

    let filtered = [...products];

    try {
      // Apply search filter first
      filtered = searchProducts(filtered, searchTerm);

      // Filter by category
      if (selectedCategory !== "all") {
        filtered = filtered.filter((product) => {
          return product && safeString(product.category) === selectedCategory;
        });
      }

      // Sort products
      switch (sortBy) {
        case "price-low":
          filtered = filtered.sort((a, b) => {
            const priceA = typeof a?.price === "number" ? a.price : 0;
            const priceB = typeof b?.price === "number" ? b.price : 0;
            return priceA - priceB;
          });
          break;
        case "price-high":
          filtered = filtered.sort((a, b) => {
            const priceA = typeof a?.price === "number" ? a.price : 0;
            const priceB = typeof b?.price === "number" ? b.price : 0;
            return priceB - priceA;
          });
          break;
        case "rating":
          filtered = filtered.sort((a, b) => {
            const ratingA = typeof a?.rating === "number" ? a.rating : 0;
            const ratingB = typeof b?.rating === "number" ? b.rating : 0;
            return ratingB - ratingA;
          });
          break;
        case "name":
          filtered = filtered.sort((a, b) => {
            const titleA = safeString(a?.title);
            const titleB = safeString(b?.title);
            return titleA.localeCompare(titleB);
          });
          break;
        case "relevance":
          // Sort by relevance when searching
          if (searchTerm) {
            filtered = filtered.sort((a, b) => {
              const aTitle = safeString(a?.title).toLowerCase();
              const bTitle = safeString(b?.title).toLowerCase();
              const searchLower = searchTerm.toLowerCase();

              // Prioritize exact matches in title
              const aExactMatch = aTitle.includes(searchLower);
              const bExactMatch = bTitle.includes(searchLower);

              if (aExactMatch && !bExactMatch) return -1;
              if (!aExactMatch && bExactMatch) return 1;

              // Then sort alphabetically
              return aTitle.localeCompare(bTitle);
            });
          }
          break;
        default:
          break;
      }

      return filtered;
    } catch (error) {
      console.error("Error in filteredAndSortedProducts:", error);
      return [];
    }
  }, [products, searchTerm, selectedCategory, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("default");
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Safe calculations for return values
  const hasActiveFilters =
    searchTerm || selectedCategory !== "all" || sortBy !== "default";
  const hasSearchResults = searchTerm
    ? filteredAndSortedProducts.length > 0
    : true;
  const searchResultsCount = searchTerm
    ? filteredAndSortedProducts.length
    : Array.isArray(products)
    ? products.length
    : 0;

  return {
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
    hasSearchResults,
    searchResultsCount,
  };
};
