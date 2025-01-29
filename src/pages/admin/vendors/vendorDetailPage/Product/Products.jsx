import React, { useEffect, useState } from 'react'
import ProductStable from './ProductStable';
import Buttons from './Buttons';
import Search from '../Search';
import { useGetVendorProducts } from '../../../../../api/useDataControllerAdmin'
import ReviewPagination from '../../../../../components/pagination/ReviewPagination';


function Products({ vendor }) {

  const [selectedButton, setSelectedButton] = useState("all");
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const[id,setId]=useState();
  const limit = 10;
  console.log(vendor);
  
  useEffect(() => {
 if (vendor?._id) {
   setId(vendor?._id);
 } else {
   setId(vendor?.vendor?._id);
 }
},[vendor])
  const { data, isLoading, isError, error } = useGetVendorProducts(
    selectedButton,
    page,
    limit,
    searchQuery,
    id
  );

  const rowsPerPage = 10;
  // const pageCount = Math.ceil(data?.total / rowsPerPage);

  console.log('data vendor products: ', data);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedButton]);


  return (
    <>
      <h1 className="ext-[26px] font-[600] mb-6 leading-[21.6px]">
        Products ({data?.total})
      </h1>
      <div className="flex items-center gap-5">
        <Buttons selected={selectedButton} setSelected={setSelectedButton} />
        <Search search={searchQuery} setSearch={setSearchQuery} />
      </div>
      <div className='overflow-x-auto '>
        <ProductStable
          products={data?.products}
          isLoading={isLoading}
          selectedButton={selectedButton}
        />

        {data?.total > 10 &&
          <div className='mt-6'>
            <ReviewPagination
              page={page}
              totalPages={data?.totalPages}
              rowsPerPage={rowsPerPage}
              totalReviews={data?.total}
              onPageChange={(page) => setPage(page)}
              showing='Products'
            />
          </div>
        }

      </div>
    </>
  );
}

export default Products
