/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
"use client";

import { useState } from "react";
import PropTypes from "prop-types";

export default function ProductTabs({ product, activeTab, setActiveTab }) {
  const [currentTab, setCurrentTab] = useState(activeTab || "details");

  const tabs = [
    { id: "details", label: "Details" },
    { id: "reviews", label: "Reviews" },
    { id: "discussion", label: "Discussion" },
  ];

  return (
    <div className="mb-8 border-b border-gray-200">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 relative ${
              currentTab === tab.id
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
            {tab.id === "reviews" && (
              <span className="px-2 py-1 ml-2 text-xs text-gray-600 bg-gray-100 rounded-full">
                {Array.isArray(product.reviews) ? product.reviews.length : 0}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

ProductTabs.propTypes = {
  product: PropTypes.object.isRequired,
};
