/* eslint-disable react/prop-types */
"use client";

import { useState } from "react";
import { useImageError } from "../hooks/useImageError";

export default function ProductImageGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { imageError, handleImageError, resetImageError } = useImageError();

  const images = product.images || [product.thumbnail];

  const handleImageSelect = (index) => {
    setSelectedImage(index);
    resetImageError();
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="overflow-hidden bg-gray-100 rounded-lg aspect-square">
        <img
          src={
            imageError
              ? "/placeholder.svg?height=500&width=500"
              : images[selectedImage]
          }
          alt={product.title}
          className="object-cover w-full h-full"
          onError={handleImageError}
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(index)}
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index
                  ? "border-green-500 ring-2 ring-green-200"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${product.title} ${index + 1}`}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=100&width=100";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
