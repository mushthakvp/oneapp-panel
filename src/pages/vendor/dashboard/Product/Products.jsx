import React, { useState } from 'react'
import ProductStable from './ProductStable';
import PageNation from '../../../../components/pagenation/PageNation';

function Products() {
  const [page, setPage] = useState(1);
  const [totalPage,setTotalPAge]=useState(0)
  return (
    <div className="mt-[24px] p-5 sm:p-[26px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-[16px] w-full font-urbanist overflow-y-auto">
      <h1 className="ext-[18px] font-[600] leading-[21.6px]">
        Product Stocks(Below 20 in stocks)
      </h1>
      <ProductStable page={page} setTotalPage={setTotalPAge}/>
     {totalPage>1&& <PageNation setPage={setPage}/>}
    </div>
  );
}

export default Products
