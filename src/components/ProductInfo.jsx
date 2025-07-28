"use client";

import { useState } from "react";
import PropTypes from "prop-types";

export default function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  // Mock data for sizes and colors (since API doesn't provide these)
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Green", value: "#22c55e", selected: true },
    { name: "Blue", value: "#3b82f6" },
    { name: "Gray", value: "#6b7280" },
    { name: "Black", value: "#000000" },
  ];

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product: product.title,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    // Add to cart logic here
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const productRating = typeof product.rating === "number" ? product.rating : 0;
  const reviewCount = Array.isArray(product.reviews)
    ? product.reviews.length
    : 0;

  return (
    <div className="space-y-8">
      {/* Product Title */}
      <div>
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          {product.title}
        </h1>
        <p className="text-lg text-gray-600">{product.brand}</p>
      </div>

      {/* Rating - Using actual API data */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${
                index < Math.floor(productRating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="font-medium text-gray-700">
          ({productRating.toFixed(1)})
        </span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-600">
          {reviewCount} review{reviewCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center space-x-4">
        <span className="text-4xl font-bold text-gray-900">
          ${discountedPrice.toFixed(2)}
        </span>
        {product.discountPercentage > 0 && (
          <>
            <span className="text-2xl text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
            <span className="px-3 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">
              -{Math.round(product.discountPercentage)}% OFF
            </span>
          </>
        )}
      </div>

      {/* Description */}
      <div className="prose prose-gray max-w-none">
        <p className="text-lg leading-relaxed text-gray-700">
          {product.description}
        </p>
      </div>

      {/* Stock Status */}
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full ${
            product.stock > 10
              ? "bg-green-500"
              : product.stock > 0
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        />
        <span className="text-sm font-medium text-gray-700">
          {product.stock > 10
            ? "In Stock"
            : product.stock > 0
            ? `Only ${product.stock} left in stock`
            : "Out of Stock"}
        </span>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Color</h3>
        <div className="flex space-x-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                selectedColor === color.name
                  ? "border-gray-900 ring-2 ring-gray-300"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={color.name}
              title={color.name}
            />
          ))}
        </div>
        {selectedColor && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedColor}
          </p>
        )}
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Size</h3>
        <div className="grid grid-cols-6 gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-all duration-200 ${
                selectedSize === size
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {selectedSize && (
          <p className="mt-2 text-sm text-gray-600">Selected: {selectedSize}</p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Quantity</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="flex items-center justify-center w-12 h-12 transition-colors duration-200 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="w-16 text-lg font-medium text-center border-gray-300 border-x">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              className="flex items-center justify-center w-12 h-12 transition-colors duration-200 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500">
            {product.stock} items available
          </p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="w-full px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 bg-green-600 rounded-lg shadow-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>

      {/* Buy This Item Button */}
      <button
        onClick=""
        disabled={product.stock === 0}
        className="w-full px-8 py-4 mt-3 text-lg font-semibold text-green-600 transition-colors duration-200 bg-white border-green-600 rounded-lg shadow-lg hover:border hover:text-green-700 hover:slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
      >
        {product.stock === 0 ? "Out of Stock" : "Buy This Item"}
      </button>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center px-6 py-3 space-x-2 text-gray-700 transition-all duration-200 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="font-medium">Add to Wishlist</span>
        </button>
        <button className="flex items-center justify-center px-6 py-3 space-x-2 text-gray-700 transition-all duration-200 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
            />
          </svg>
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Product Features */}
      <div className="pt-8 border-t border-gray-200">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Free Shipping</p>
              <p className="text-sm text-gray-600">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Easy Returns</p>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Secure Payment</p>
              <p className="text-sm text-gray-600">SSL encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
};
