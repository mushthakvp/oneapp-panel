import React from 'react';
import ProductCard from './ProductCard';
import ShimmerProductCard from '../../../components/loading/productsShimmer/ShimmerProductCard';
import EmptyScreen from './EmptyProductsScreen';


function ProductsGridSection({ products, currency, isLoading, page, setPage, totalPages }) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ShimmerProductCard key={index} />
        ))}
      </div>
    );
  }

  if (!isLoading && products?.length === 0) {
    return <EmptyScreen />;
  }

  return (
    <div className="mt-[29px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[28px]">

      {products?.map((product, index) => (
        <ProductCard product={product} currency={currency} key={index} />
      ))}

      {!isLoading && totalPages > 1 && page < totalPages && (
        <button onClick={() => setPage(page + 1)} className="col-span-full">
          Load More
        </button>
      )}

    </div>
  );
}

export default ProductsGridSection
