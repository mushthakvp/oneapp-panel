import React, { useState, useEffect } from 'react'
import ProductsSearchSection from './ProductsSearchSection';
import ProductsGridSection from './ProductsGridSection';
import PageHeading from '../../../components/pageHeding/PageHeading';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAddReturnPolicy, useGetProducts, useGetSections } from '../../../api/useDataController';
import { Modal } from '@mui/material';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../../api/axios';


function Products() {
  
  const [returnPolicyModal, setReturnPolicyModal] = useState(false);
  const deletedId = useLocation()?.state?.deletedId;
  const [returnPolicy, setReturnPolicy] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [page, setPage] = useState(1);
  const { isPending, mutate } = useAddReturnPolicy();
  const [products, setProducts] = useState([]);
  const limit = 8;

  const { data: productData, isLoading: isProductsLoading } = useGetProducts(
    limit,
    page,
    search,
    selectedSection
  );

  const { data: sections } = useGetSections("");

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [search, selectedSection]);

  useEffect(() => {
    if (productData?.products || deletedId) {
      setProducts((prevProducts) => {
        // First filter out deleted product if deletedId exists
        const filteredProducts = deletedId
          ? prevProducts.filter((product) => product._id !== deletedId)
          : prevProducts;

        // If there are no new products, just return the filtered array
        if (!productData?.products) {
          return filteredProducts;
        }

        // Otherwise, continue with the existing merge logic using filtered products
        return [...filteredProducts, ...productData.products].reduce(
          (acc, current) => {
            const x = acc.find((item) => item._id === current._id);
            if (!x) {
              return [...acc, current];
            } else {
              return acc.map((item) =>
                item._id === current._id ? current : item
              );
            }
          },
          []
        );
      });
    }
  }, [productData, deletedId]); // Added deletedId to dependencies

  // Reset products and page when search or selected section changes
  // useEffect(() => {
  //   setProducts([]);
  //   setPage(1);
  // }, [search, selectedSection]);

  return (
    <div>
      <div className="flex items-center justify-between font-urbanist">
        <PageHeading title="Products" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              // if (!productData?.isReturnPolicyAdded) {
              //   setReturnPolicyModal(true);
              //   return;
              // }

              window.open(`${BASE_URL}docs-for-upload-docs/`, "_blank");
            }}
            className="p-2 px-4 bg-buttonColor flex items-center justify-center gap-4 rounded-md text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            Add Bulk Product
          </button>
          <button
            onClick={() => {
              if (!productData?.isReturnPolicyAdded) {
                setReturnPolicyModal(true);
                return;
              }

              navigate("/add-products");
            }}
            className="p-2 px-4 bg-buttonColor flex items-center justify-center gap-4 rounded-md text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-containerWhite rounded-md border border-inputBorder mt-[26px] p-[35px]">
        <ProductsSearchSection
          setSearch={setSearch}
          search={search}
          selected={selectedSection}
          setSelected={setSelectedSection}
          sections={sections?.sections}
        />
        <ProductsGridSection
          products={products}
          currency={productData?.currency}
          isLoading={isProductsLoading}
          page={page}
          setPage={setPage}
          totalPages={productData?.totalPages}
        />
      </div>
      <Modal
        open={returnPolicyModal}
        onClose={() => setReturnPolicyModal(false)}
        className="flex items-center justify-center font-urbanist"
      >
        <div className="bg-white rounded-md  w-full max-w-[387px]">
          <h1 className="p-3 text-center border-b border-b-inputBorder w-full text-[16px] md:text-[20px] font-[600]">
            Add Return Policy
          </h1>
          <div className="p-5 md:px-8">
            <p className="text-md font-[500] mb-2">Return Policy</p>
            <textarea
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
              name=""
              className="w-full outline-none bg-transparent border border-inputBorder rounded-md p-3 min-h-[132px]"
              placeholder="Add your return policy"
              id=""
            ></textarea>
            <button
              disabled={isPending}
              onClick={() => {
                if (!returnPolicy)
                  return toast.error("Please add return policy");
                mutate(
                  { returnPolicy: returnPolicy },
                  {
                    onSuccess: (data) => {
                      toast.success("Return policy added successfully");
                      setReturnPolicyModal(false);
                      setReturnPolicy("");
                      navigate("/add-products");
                    },
                    onError: () => {
                      toast.error("Something went wrong");
                    },
                  }
                );
              }}
              className="mt-5 w-full flex items-center justify-center text-white bg-buttonColor h-10 rounded-md md:h-12"
            >
              {isPending ? "Loading...." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Products
