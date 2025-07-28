"use client";

import { useState, useCallback } from "react";

export const useProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductDetail = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Clean and validate product data
      const cleanedProduct = {
        id: data.id || id,
        title: data.title || "Untitled Product",
        description: data.description || "No description available",
        price: typeof data.price === "number" ? data.price : 0,
        discountPercentage:
          typeof data.discountPercentage === "number"
            ? data.discountPercentage
            : 0,
        rating: typeof data.rating === "number" ? data.rating : 0,
        stock: typeof data.stock === "number" ? data.stock : 0,
        brand: data.brand || "Unknown Brand",
        category: data.category || "uncategorized",
        thumbnail: data.thumbnail || "/placeholder.svg?height=400&width=400",
        images:
          Array.isArray(data.images) && data.images.length > 0
            ? data.images
            : [data.thumbnail || "/placeholder.svg?height=400&width=400"],
        dimensions: data.dimensions || {},
        warrantyInformation:
          data.warrantyInformation || "No warranty information",
        shippingInformation:
          data.shippingInformation || "Standard shipping applies",
        availabilityStatus: data.availabilityStatus || "In Stock",
        reviews: Array.isArray(data.reviews) ? data.reviews : [],
        returnPolicy: data.returnPolicy || "30 day return policy",
        minimumOrderQuantity: data.minimumOrderQuantity || 1,
      };

      setProduct(cleanedProduct);
    } catch (err) {
      setError(err.message || "Failed to fetch product details");
      console.error("Error fetching product details:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    product,
    loading,
    error,
    fetchProductDetail,
  };
};
