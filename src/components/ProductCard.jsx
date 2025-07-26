"use client";

import { useImageError } from "../hooks/useImageError";
import PropTypes from "prop-types";

export default function ProductCard({ product }) {
  const { imageError, handleImageError } = useImageError();
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const totalReviews = product.reviews ? product.reviews.length : [3];

  const handleAddToCart = () => {
    console.log("Added to cart:", product.title);
  };

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-lg hover:-translate-y-1 group">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={
            imageError
              ? "/placeholder.svg?height=250&width=300&query=product"
              : product.thumbnail
          }
          alt={product.title}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full top-3 left-3">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}

        {/* Stock Badge */}
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
            product.stock > 10
              ? "bg-green-100 text-green-800"
              : product.stock > 0
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category & Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs tracking-wide text-gray-500 uppercase">
            {product.category.replace("-", " ")}
          </span>
          <span className="text-xs font-medium text-gray-600">
            {product.brand}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 font-semibold text-gray-900 transition-colors line-clamp-2 group-hover:text-green-600">
          {product.title}
        </h3>

        {/* Description */}
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating.toFixed(1)}
          </span>
          <span className="ml-2 text-sm text-gray-600">
            ({totalReviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Sold Out" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    reviews: PropTypes.array.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
