"use client";

import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search products...",
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      inputRef.current?.blur();
    }
  };

  // Auto-focus on Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className={`h-5 w-5 transition-colors duration-200 ${
            isFocused ? "text-green-500" : "text-gray-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className={`block w-full pl-10 pr-12 py-3 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 ${
          isFocused
            ? "border-green-500 shadow-lg"
            : "border-gray-300 hover:border-gray-400"
        }`}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
      />

      {/* Right side content */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {value ? (
          /* Clear Button */
          <button
            onClick={handleClear}
            className="p-1 text-gray-400 transition-colors duration-200 rounded-full hover:text-gray-600 hover:bg-gray-100"
            aria-label="Clear search"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          /* Keyboard Shortcut Hint */
          <div className="items-center hidden space-x-1 text-xs text-gray-400 sm:flex">
            <kbd className="px-2 py-1 text-xs bg-gray-100 border border-gray-300 rounded">
              {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
            </kbd>
            <kbd className="px-2 py-1 text-xs bg-gray-100 border border-gray-300 rounded">
              K
            </kbd>
          </div>
        )}
      </div>

      {/* Loading indicator*/}
      {value && (
        <div className="absolute inset-y-0 flex items-center pr-3 right-8">
          <div className="w-4 h-4 border-b-2 border-green-500 rounded-full opacity-0 animate-spin"></div>
        </div>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
