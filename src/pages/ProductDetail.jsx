"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductInfo from "../components/ProductInfo";
import ProductTabs from "../components/ProductTabs";
import ProductReviews from "../components/ProductReviews";
import RelatedProducts from "../components/RelatedProducts";
import Breadcrumb from "../components/Breadcrumb";
import { useProducts } from "../hooks/useProducts";
import { useProductDetail } from "../hooks/useProductDetail";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { product, loading, error, fetchProductDetail } = useProductDetail();
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    if (id) {
      fetchProductDetail(id);
    }
  }, [id, fetchProductDetail]);

  if (loading) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="bg-gray-200 rounded-lg aspect-square"></div>
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 rounded aspect-square"
                  ></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-3/4 h-8 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">
            Product Not Found
          </h1>
          <p className="mb-4 text-gray-600">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/" },
    {
      label:
        product.category?.charAt(0).toUpperCase() + product.category?.slice(1),
      href: `/?category=${product.category}`,
    },
    { label: product.title, href: "#", current: true },
  ];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const renderTabContent = () => {
    switch (activeTab) {
      case "reviews":
        return <ProductReviews product={product} />;
      case "discussion":
        return (
          <div className="py-8">
            <div className="text-center">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Product Discussion
              </h3>
              <p className="text-gray-600">Discussion feature coming soon!</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-8">
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 font-semibold text-gray-900">
                  Product Information
                </h4>
                <p className="leading-relaxed text-gray-700">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    Specifications
                  </h4>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Brand:</dt>
                      <dd className="font-medium text-gray-900">
                        {product.brand}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Category:</dt>
                      <dd className="font-medium text-gray-900 capitalize">
                        {product.category}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Stock:</dt>
                      <dd className="font-medium text-gray-900">
                        {product.stock} units
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Minimum Order:</dt>
                      <dd className="font-medium text-gray-900">
                        {product.minimumOrderQuantity} unit(s)
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h4 className="mb-3 font-semibold text-gray-900">
                    Warranty & Returns
                  </h4>
                  <dl className="space-y-3">
                    <div>
                      <dt className="mb-1 text-gray-600">Warranty:</dt>
                      <dd className="text-gray-900">
                        {product.warrantyInformation}
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-gray-600">Return Policy:</dt>
                      <dd className="text-gray-900">{product.returnPolicy}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-gray-600">Shipping:</dt>
                      <dd className="text-gray-900">
                        {product.shippingInformation}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="container px-4 py-6 mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Product Detail */}
        <div className="grid grid-cols-1 gap-12 mb-12 lg:grid-cols-2">
          {/* Product Images */}
          <ProductImageGallery product={product} />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Product Tabs */}
        <ProductTabs
          product={product}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Tab Content */}
        {renderTabContent()}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </div>
    </div>
  );
}
