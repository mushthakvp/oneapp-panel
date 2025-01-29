import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeading from '../../../components/pageHeding/PageHeading';
import ProductFirstSection from './subComponents/ProductFirstSection';
import Specifications from './subComponents/Specifications';
import Statistics from './subComponents/Statistics';
import Reviews from './subComponents/Reviews';
import Delivery from './subComponents/Delivery';
import { useDeleteProduct, useGetProductDetails, useGetProductReviews } from '../../../api/useDataController';
import { Modal, Box, Typography, Divider, Slide } from '@mui/material';
import ProductFirstSectionShimmer from '../../../components/loading/productDetailShimmer/ProductFirstSectionShimmer';
import SpecificationsShimmer from '../../../components/loading/productDetailShimmer/SpecificationsShimmer';
import StatisticsShimmer from '../../../components/loading/productDetailShimmer/StatisticsShimmer';
import ReviewsShimmer from '../../../components/loading/productDetailShimmer/ReviewsShimmer';
import DeliveryShimmer from '../../../components/loading/productDetailShimmer/DeliveryShimmer';
import DeleteModal from '../../../components/modals/DeleteModal';
import { toast } from 'react-toastify';


const ProductDetail = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.id || "";

  const [isModalOpen, setModalOpen] = useState(false);
  const [productData, setProductData] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [reviewsData, setReviewsData] = useState(null); // Store reviews data
  const [page, setPage] = useState(1);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const { data, isLoading } = useGetProductDetails(selectedVariantId || id);
  const { mutate, isPending } = useDeleteProduct();
  const { data: reviews, isLoading: reviewsLoading } = useGetProductReviews(page, selectedVariantId || id); // Fetch reviews

  useEffect(() => {
    if (data) setProductData(data);
  }, [data]);

  // useEffect(() => {
  //   if (reviews) {
  //     console.log("Received reviews:", reviews);
      
  //     setReviewsData(reviews);
  //   }
  // }, [reviews]);

  const handleVariantSelect = (variantId) => {
    setSelectedVariantId(variantId);
    setPage(1);
  };

  const handleDeleteProduct = () => {
    console.log("Delete product clicked");

    mutate({ id: deleteModalId }, {
      onSuccess: () => {
        toast.success("Product deleted successfully");
        setDeleteModal(false);
        navigate("/products", { state: { deletedId: deleteModalId } });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };


  return (
    <div className="font-urbanist">
      <DeleteModal isOpen={deleteModal} setIsOpen={setDeleteModal} handleDelete={handleDeleteProduct} loading={isPending} />
      <div className="flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <svg
            className="cursor-pointer"
            onClick={() => navigate("/products")}
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 18H6M6 18L15 9M6 18L15 27"
              stroke="black"
              stroke-width="1.98214"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <PageHeading title="Product Overview" />
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={handleOpenModal}
            className="text-buttonColor border border-buttonColor px-4 py-2 rounded-md bg-[#2f4eff0f1A] text-[16px]"
          >
            Available Quantities
          </button>

          <button
            onClick={() => {
              navigate("/add-products", {
                state: { product: productData?.product },
              });
            }}
            className="bg-buttonColor border border-buttonColor px-4 py-2 text-white rounded-md text-[16px]"
          >
            Edit Details
          </button>
          <button onClick={() => { setDeleteModal(true); setDeleteModalId(productData?.product?._id); }} >
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="21.5"
                cy="21.5"
                r="21.5"
                fill="#E31F1F"
                fill-opacity="0.05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.682 12.0938H23.317C23.5497 12.0936 23.7523 12.0935 23.9437 12.1241C24.6997 12.2448 25.354 12.7163 25.7076 13.3954C25.7971 13.5673 25.8611 13.7596 25.9345 13.9803L26.0545 14.3403C26.0748 14.4013 26.0806 14.4185 26.0855 14.4321C26.2738 14.9525 26.7618 15.3043 27.3151 15.3184C27.3296 15.3187 27.3475 15.3188 27.412 15.3188H30.637C31.0823 15.3188 31.4433 15.6798 31.4433 16.125C31.4433 16.5703 31.0823 16.9313 30.637 16.9313H12.3619C11.9166 16.9313 11.5557 16.5703 11.5557 16.125C11.5557 15.6798 11.9166 15.3188 12.3619 15.3188H15.587C15.6516 15.3188 15.6694 15.3187 15.6839 15.3184C16.2372 15.3043 16.7252 14.9526 16.9135 14.4321C16.9184 14.4185 16.9241 14.4016 16.9445 14.3403L17.0645 13.9803C17.1379 13.7596 17.2019 13.5673 17.2914 13.3954C17.645 12.7163 18.2993 12.2448 19.0553 12.1241C19.2467 12.0935 19.4494 12.0936 19.682 12.0938ZM18.2832 15.3188C18.3386 15.2102 18.3876 15.0973 18.4298 14.9806C18.4427 14.9452 18.4552 14.9075 18.4714 14.859L18.5787 14.5371C18.6767 14.2431 18.6992 14.1832 18.7216 14.1402C18.8395 13.9138 19.0576 13.7566 19.3096 13.7164C19.3575 13.7087 19.4215 13.7063 19.7314 13.7063H23.2676C23.5775 13.7063 23.6416 13.7087 23.6894 13.7164C23.9414 13.7566 24.1595 13.9138 24.2774 14.1402C24.2998 14.1832 24.3223 14.2431 24.4203 14.5371L24.5276 14.8588L24.5692 14.9807C24.6114 15.0974 24.6605 15.2102 24.7158 15.3188H18.2832Z"
                fill="#E31F1F"
              />
              <path
                d="M14.9581 18.7589C14.9285 18.3146 14.5443 17.9785 14.1 18.0081C13.6557 18.0377 13.3196 18.4219 13.3492 18.8662L13.8474 26.3393C13.9393 27.7182 14.0136 28.8321 14.1877 29.7061C14.3687 30.6149 14.6766 31.3739 15.3126 31.9688C15.9485 32.5638 16.7264 32.8206 17.6451 32.9407C18.5288 33.0563 19.6451 33.0563 21.0271 33.0563H21.9719C23.3539 33.0563 24.4702 33.0563 25.3539 32.9407C26.2727 32.8206 27.0505 32.5638 27.6864 31.9688C28.3224 31.3739 28.6303 30.6149 28.8113 29.7061C28.9854 28.8321 29.0597 27.7182 29.1516 26.3393L29.6498 18.8662C29.6794 18.4219 29.3433 18.0377 28.899 18.0081C28.4547 17.9785 28.0705 18.3146 28.0409 18.7589L27.5464 26.1755C27.4498 27.6244 27.381 28.6326 27.2299 29.3911C27.0833 30.1269 26.8787 30.5163 26.5848 30.7913C26.2909 31.0663 25.8887 31.2445 25.1448 31.3419C24.3778 31.4422 23.3673 31.4438 21.9152 31.4438H21.0838C19.6317 31.4438 18.6212 31.4422 17.8543 31.3419C17.1104 31.2445 16.7081 31.0663 16.4142 30.7913C16.1203 30.5163 15.9157 30.1269 15.7691 29.3911C15.618 28.6326 15.5492 27.6244 15.4526 26.1755L14.9581 18.7589Z"
                fill="#E31F1F"
              />
              <path
                d="M18.7318 20.6978C19.1749 20.6535 19.57 20.9767 19.6143 21.4198L20.1518 26.7948C20.1961 27.2379 19.8728 27.633 19.4297 27.6773C18.9867 27.7216 18.5916 27.3983 18.5473 26.9553L18.0098 21.5803C17.9655 21.1372 18.2887 20.7421 18.7318 20.6978Z"
                fill="#E31F1F"
              />
              <path
                d="M24.2672 20.6978C24.7103 20.7421 25.0336 21.1372 24.9893 21.5803L24.4518 26.9553C24.4075 27.3983 24.0124 27.7216 23.5693 27.6773C23.1262 27.633 22.803 27.2379 22.8473 26.7948L23.3848 21.4198C23.4291 20.9767 23.8242 20.6535 24.2672 20.6978Z"
                fill="#E31F1F"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6 w-full mt-[25px]">
        <div className="w-full md:w-[73%]">
          {isLoading ? (
            <ProductFirstSectionShimmer />
          ) : (
            <ProductFirstSection
              productData={productData?.product}
              variants={productData?.variants}
              onVariantSelect={handleVariantSelect}
            />
          )}
        </div>
        <div className="w-full md:w-[27%]">
          {isLoading ? (
            <SpecificationsShimmer />
          ) : (
            <Specifications productData={productData?.product} />
          )}
        </div>
      </div>

      {isLoading ? (
        <StatisticsShimmer />
      ) : (
        <Statistics productData={productData} />
      )}

      <div className="flex flex-col md:flex-row items-start gap-6 w-full mt-[19px]">
        <div className="w-full md:w-[73%]">
          {reviewsLoading ? <ReviewsShimmer /> :
            <Reviews
              reviewsData={reviews}
              page={page}
              setPage={setPage}
              total={reviews?.total}
              product={productData?.product?.name}
            />
          }
        </div>
        <div className="w-full md:w-[27%]">
          {isLoading ? (
            <DeliveryShimmer />
          ) : (
            <Delivery productData={productData?.product} />
          )}
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        className="flex items-center justify-center"
      >
        <Slide direction="up" in={isModalOpen} timeout={700}>
          <Box
            sx={{
              transform: "translate(-50%, -50%)",
              width: "50%",
              maxWidth: "350px",
              bgcolor: "white",
              boxShadow: 20,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", fontWeight: "semibold", p: 2 }}
            >
              Available Quantities
            </Typography>
            <Divider />
            <div className="p-4">
              {productData?.product?.sizes.map((size) => (
                <div
                  key={size._id}
                  className="flex justify-between p-3 text-[14px]"
                >
                  <span className="text-[#1B1B1B] opacity-80">
                    {size.size}
                  </span>
                  <span>{size.quantity} Quantities</span>
                </div>
              ))}
            </div>
          </Box>
        </Slide>
      </Modal>
    </div>
  );
}

export default ProductDetail