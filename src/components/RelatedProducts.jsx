import ProductCard from "./ProductCard";
import PropTypes from "prop-types";

export default function RelatedProducts({ products }) {
  if (!Array.isArray(products) || products.length === 0) return null;

  return (
    <div className="pt-8 border-t border-gray-200">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        You Might Like This Product
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

RelatedProducts.propTypes = {
  products: PropTypes.array,
};
