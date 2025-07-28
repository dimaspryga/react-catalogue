"use client";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useImageError } from "../hooks/useImageError";
import PropTypes from "prop-types";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { imageError, handleImageError } = useImageError();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    console.log("Wishlist toggled:", product.title);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log("Added to cart:", product.title);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative overflow-hidden transition-all duration-300 bg-white shadow-sm cursor-pointer rounded-2xl hover:shadow-xl group h-80 hover:h-96"
    >
      <div className="absolute inset-0 transition-all duration-300">
        <img
          src={
            imageError
              ? "/placeholder.svg?height=320&width=280&query=product"
              : product.thumbnail
          }
          alt={product.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="absolute z-10 flex items-start justify-between top-3 left-3 right-3">
        {product.discountPercentage > 0 && (
          <div className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full shadow-lg">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}

        <button
          onClick={handleWishlistClick}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill={isWishlisted ? "currentColor" : "none"}
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
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 transition-all duration-300 group-hover:bottom-14">
        <div className="px-4 pb-4">
          <div className="p-4 shadow-lg bg-white/95 backdrop-blur-sm rounded-xl">
            {/* Product Title */}
            <h3 className="mb-2 font-semibold text-gray-900 transition-colors line-clamp-2 group-hover:text-blue-600">
              {product.title}
            </h3>

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
                {product.rating.toFixed(1)} (
                {Array.isArray(product.reviews)
                  ? product.reviews.length
                  : Math.floor(Math.random() * 50) + 10}{" "}
                reviews)
              </span>
            </div>

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
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 transition-all duration-300 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
        <div className="px-4 pb-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center justify-center w-full px-4 py-3 space-x-2 font-semibold text-white transition-colors duration-200 bg-green-600 shadow-lg hover:bg-green-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.8 5.2a1 1 0 00.9 1.3h9.8M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6"
              />
            </svg>
            <span>{product.stock === 0 ? "Sold Out" : "Add to Cart"}</span>
          </button>
        </div>
      </div>

      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-black/10 group-hover:opacity-100" />
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
