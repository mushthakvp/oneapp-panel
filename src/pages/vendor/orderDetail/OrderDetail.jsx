import React, { useState } from 'react';
import PageHeading from '../../../components/pageHeding/PageHeading';
import { useNavigate, useLocation } from 'react-router-dom';
import OrderInfoSection from './subComponents/OrderInfoSection';
import ProductList from './subComponents/ProductList';
import OrderDetailShimmer from '../../../components/loading/shimmer/OrderDetailShimmer';
import { useGetOrderOverview, useUpdatePacked } from '../../../api/useDataController';
import { toast } from 'react-toastify';
import InvoiceModal from './subComponents/InvoiceModal';


const OrderDetail = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const id = state?.orderId;

    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

    const {
        data,
        isLoading,
        error,
        refetch: refetchOrderDetails
    } = useGetOrderOverview(id);

    const { mutate, isPending } = useUpdatePacked(id);

    const handleStatusUpdate = async (productId) => {
        mutate(
            { id: productId },
            {
                onSuccess: (data) => {
                    toast.success(data?.message || 'Packed status updated successfully');
                    // Optionally force refetch if needed
                    refetchOrderDetails(id);
                },
                onError: (error) => {
                    toast.error(error.message || 'Failed to update order status');
                }
            }
        );
    };


    return (
        <div className='font-urbanist'>
            <div className="flex gap-4 items-center mb-6">
                <svg
                    className='cursor-pointer'
                    onClick={() => navigate("/orders")}
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M30 18H6M6 18L15 9M6 18L15 27"
                        stroke="black"
                        strokeWidth="1.98214"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <PageHeading title="Details" />
            </div>

            {isLoading ? (
                <OrderDetailShimmer />
            ) : (
                <>
                    <div className="text-[28px] md:text-[38px] font-semibold italic text-black">Order ID: #{data?.order?._id?.slice(-5)}</div>
                    <div className="font-urbanist text-[18px] italic font-thin leading-[46px] text-left text-[#00000066]">
                        Order Date: {data?.order?.shippingAddress?.createdAt?.split("T")[0]}
                    </div>

                    <OrderInfoSection order={data?.order} />

                    <div className="flex justify-between items-center mt-6 mb-4">
                        <h2 className="text-black font-semibold text-[28px]">
                            Products <span className="font-thin text-[#00000066]">({data?.order?.products?.length})</span>
                        </h2>
                        <button
                            onClick={() => setIsInvoiceModalOpen(true)}
                            className="text-buttonColor border border-buttonColor px-4 py-2 rounded-md bg-[#2f4eff0f1A] text-[18px]"
                        >
                            Available Invoices
                        </button>
                    </div>

                    <ProductList
                        products={data?.order?.products}
                        onUpdateStatus={handleStatusUpdate}
                        isPending={isPending}
                    />
                </>
            )}

            <InvoiceModal
                isOpen={isInvoiceModalOpen}
                onClose={() => setIsInvoiceModalOpen(false)}
                order={data?.order}
            />

        </div>
    );
}

export default OrderDetail;
