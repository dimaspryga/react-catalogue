"use client";

import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://dummyjson.com/products?limit=100");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Validate the response structure
      if (!data || !Array.isArray(data.products)) {
        throw new Error("Invalid response format from API");
      }

      // Clean and validate products data
      const cleanedProducts = data.products.map((product, index) => ({
        id: product.id || index,
        title: product.title || "Untitled Product",
        description: product.description || "No description available",
        price: typeof product.price === "number" ? product.price : 0,
        discountPercentage:
          typeof product.discountPercentage === "number"
            ? product.discountPercentage
            : 0,
        rating: typeof product.rating === "number" ? product.rating : 0,
        stock: typeof product.stock === "number" ? product.stock : 0,
        brand: product.brand || "Unknown Brand",
        category: product.category || "uncategorized",
        thumbnail: product.thumbnail || "/placeholder.svg?height=250&width=300",
        images: Array.isArray(product.images)
          ? product.images
          : [product.thumbnail || "/placeholder.svg?height=250&width=300"],
      }));

      setProducts(cleanedProducts);

      // Extract unique categories safely
      const uniqueCategories = Array.from(
        new Set(
          cleanedProducts
            .map((p) => p.category)
            .filter((category) => category && typeof category === "string")
        )
      );
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      console.error("Error fetching products:", err);

      // Set empty arrays as fallback
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    categories,
    refetch: fetchProducts,
  };
};
