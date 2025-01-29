import React, { useState, useEffect } from "react";
import { useGetProductSearch } from "../../../api/useDataController";

function SearchProduct({
  setFormData,
  formData,
  selectedProducts,
  setSelectedProducts,
}) {
  
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetProductSearch(search, 1);
  const [isOpen, setIsOpen] = useState(false);

  // Effect to set initial products
  useEffect(() => {
    if (formData?.products?.length > 0 && data?.products?.length > 0) {
      const defaultProducts = formData.products
        .map((productId) => {
          const foundProduct = data.products.find(
            (product) => product._id === productId
          );
          return foundProduct || null;
        })
        .filter((product) => product !== null); // Remove any null values

      if (defaultProducts.length > 0) {
        setSelectedProducts(defaultProducts);
      }
    }
  }, [formData?.products, data?.products]);

  const handleProductSelect = (product) => {
    if (!selectedProducts.find((p) => p._id === product._id)) {
      const newSelectedProducts = [...selectedProducts, product];
      setSelectedProducts(newSelectedProducts);

      setFormData({
        ...formData,
        products: [...(formData.products || []), product._id],
      });
    }
  };

  const handleRemoveProduct = (productId) => {
    const filteredProducts = selectedProducts.filter(
      (p) => p._id !== productId
    );
    setSelectedProducts(filteredProducts);

    setFormData({
      ...formData,
      products: (formData.products || []).filter((id) => id !== productId),
    });
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="mt-2 w-full relative max-w-[520px] rounded-md flex items-center p-2 md:px-4 border"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.49046 15.9809C12.6273 15.9809 15.9809 12.6273 15.9809 8.49046C15.9809 4.35359 12.6273 1 8.49046 1C4.35359 1 1 4.35359 1 8.49046C1 12.6273 4.35359 15.9809 8.49046 15.9809Z"
          stroke="black"
          strokeOpacity="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.7031 14.0898L16.6398 17.0189"
          stroke="black"
          strokeOpacity="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="w-full flex flex-wrap gap-2">
        {selectedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-gray-100 p-2 text-xs relative rounded"
          >
            {product.name}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveProduct(product._id);
              }}
              className="absolute -right-1 -top-1 rounded-full p-1 text-xs bg-red-600 text-white w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.6">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.43057 8.51192C4.70014 8.19743 5.17361 8.161 5.48811 8.43057L12 14.0122L18.5119 8.43057C18.8264 8.16101 19.2999 8.19743 19.5695 8.51192C19.839 8.82642 19.8026 9.29989 19.4881 9.56946L12.4881 15.5695C12.2072 15.8102 11.7928 15.8102 11.5119 15.5695L4.51192 9.56946C4.19743 9.29989 4.161 8.82641 4.43057 8.51192Z"
            fill="black"
          />
        </g>
      </svg>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-12 w-full left-0 max-h-[400px] z-50 overflow-y-auto bg-white rounded-md"
        >
          <div className="relative p-2 bg-white shadow-sm">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Products"
              className="w-full outline-none p-2 bg-transparent px-3 sticky top-0 border rounded-md"
            />
          </div>

          {data?.products?.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductSelect(product)}
              className="p-2 px-4 border-b pb-2 cursor-pointer hover:bg-gray-50"
            >
              {product.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchProduct;
