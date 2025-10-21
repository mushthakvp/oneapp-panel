import React, { useState } from 'react'
import DeleteModal from '../../modals/DeleteModal';
import TableShimmer from '../../../../../components/loading/shimmer/TableShimmer';
import { useProductAction } from '../../../../../api/useDataControllerAdmin';
import { toast } from 'react-toastify';
import BlockModal from '../../modals/BlockProduct';
import UnblockModal from '../../modals/UnblockProduct';
import EmptyScreen from '../../../../vendor/products/EmptyProductsScreen';


export default function ProductStable({ products, isLoading, selectedButton }) {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [productToActOn, setProductToActOn] = useState(null);
  const [isUnBlockModalOpen, setIsUnBlockModalOpen] = useState(false);

  const { mutate, isPending: isActionLoading } = useProductAction()

  const handleDelete = (product) => {
    setProductToActOn(product)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    mutate(
      { productId: productToActOn._id, action: 'delete' },
      {
        onSuccess: () => {
          toast.success("Product deleted successfully.");
          setIsDeleteModalOpen(false);
          setProductToActOn(null);
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to delete product. Please try again.");
          setIsDeleteModalOpen(false);
          setProductToActOn(null);
        }
      }
    );
  };

  const handleBlock = (product) => {
    setProductToActOn(product);
    setIsBlockModalOpen(true);
  };

  const confirmBlock = (blockReason) => {
    mutate(
      { productId: productToActOn._id, action: 'block', blockReason },
      {
        onSuccess: () => {
          toast.success("Product blocked successfully.");
          setIsBlockModalOpen(false);
          setProductToActOn(null);
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to block product. Please try again.");
          setIsBlockModalOpen(false);
          setProductToActOn(null);
        }
      }
    );
  };

  const handleUnBlock = (product) => {
    setProductToActOn(product);
    setIsUnBlockModalOpen(true);
  };

  const confirmUnblock = () => {
    mutate(
      { productId: productToActOn._id, action: 'unblock' },
      {
        onSuccess: () => {
          toast.success("Product unblocked successfully.");
          setIsUnBlockModalOpen(false);
          setProductToActOn(null);
        },
        onError: (error) => {          
          toast.error(error?.response?.data?.error || "Failed to unblock product. Please try again.");
          setIsUnBlockModalOpen(false);
          setProductToActOn(null);
        }
      }
    );
  };


  return (
    <table className="w-full min-w-[700px] text-left font-urbanist capitalize mt-4">
      <thead className="bg-[#F8FAFC] h-10 text-left font-[600] text-[14px] leading-[16.8px]">
        <th className="px-2 pl-4 rounded-l-lg">Product</th>
        <th className="px-1 pl-4">Brand</th>
        <th className="px-1 pl-4">Section</th>
        <th className="px-1 pl-4">Category</th>
        <th className="px-1 pl-4">Subcategory</th>
        {/* <th className="px-1 ">Quantity</th> */}
        {selectedButton === "blocked" && (
          <th className="px-1 pl-4">Reason</th>
        )}
        <th className="px-1 pl-4">Price</th>
        <th className="px-1 pl-4 rounded-r-lg">Action</th>
      </thead>

      {isLoading ? (
        <TableShimmer columnCount={7} rowCount={3} />
      ) : (
        <tbody className="text-left font-[500] text-[14px] leading-[16.8px]">
          {products?.length > 0 ? (
            products?.map((item, index) => (
              <tr className="h-[84px] border-b border-b-inputBorder">
                <td className="px-2 pl-4">
                  <div className="flex items-center gap-2">
                    <img src={item.images[0]} className="h-[48px] w-[48px]" alt={item.name} />
                    {item.name}
                  </div>
                </td>
                <td className="px-2 pl-4">{item.brand?.name}</td>
                <td className="px-2 pl-4">{item.section?.name}</td>
                <td className="px-2 pl-4">{item.category?.name}</td>
                <td className="px-2 pl-4">{item.subCategory?.name}</td>
                {/* <td className="px-2 pl-4">18</td> */}
                {selectedButton === "blocked" && (
                  <td className="px-2 pl-4">
                    <>
                      <p
                        className="line-clamp-1 cursor-pointer underline"
                        onClick={(e) => {
                          // e.stopPropagation();
                          // setIsOpen(!isOpen);
                          // setSelectedProduct(item);
                          handleBlock(item)
                        }}
                      >
                        {item?.blockReason}
                      </p>
                    </>
                  </td>
                )}
                <td className="px-2 pl-4">INR {item.offerPrice}</td>
                <td className="px-2 pl-4">
                  {selectedButton === 'all' ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleBlock(item)}>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="20"
                            cy="20"
                            r="19.6"
                            stroke="#EAEAEA"
                            stroke-width="0.8"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M20 9.25C14.0629 9.25 9.25 14.0629 9.25 20C9.25 25.9371 14.0629 30.75 20 30.75C25.9371 30.75 30.75 25.9371 30.75 20C30.75 14.0629 25.9371 9.25 20 9.25ZM10.75 20C10.75 14.8914 14.8914 10.75 20 10.75C22.2845 10.75 24.3756 11.5782 25.9894 12.9507C25.9827 12.9569 25.9762 12.9632 25.9697 12.9697L12.9697 25.9694C12.9632 25.976 12.9568 25.9826 12.9506 25.9893C11.5781 24.3755 10.75 22.2845 10.75 20ZM14.0105 27.0492C15.6243 28.4218 17.7154 29.25 20 29.25C25.1086 29.25 29.25 25.1086 29.25 20C29.25 17.7155 28.4218 15.6244 27.0493 14.0106C27.0431 14.0173 27.0368 14.0239 27.0303 14.0303L14.0303 27.0301C14.0238 27.0366 14.0172 27.043 14.0105 27.0492Z"
                            fill="#1c1c840f"
                          />
                        </svg>
                      </button>
                      {/* <button onClick={() => setIsOpen(!isOpen)}> */}
                      <button onClick={() => handleDelete(item)}>
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="20"
                            cy="20"
                            r="19.6"
                            stroke="#EAEAEA"
                            stroke-width="0.8"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M18.3094 11.25H21.6908C21.9072 11.2498 22.0957 11.2497 22.2737 11.2781C22.977 11.3905 23.5856 11.8291 23.9146 12.4608C23.9978 12.6207 24.0573 12.7996 24.1256 13.0049L24.2373 13.3398C24.2562 13.3965 24.2616 13.4125 24.2661 13.4252C24.4413 13.9093 24.8953 14.2366 25.4099 14.2496C25.4235 14.2499 25.44 14.25 25.5001 14.25H28.5001C28.9143 14.25 29.2501 14.5858 29.2501 15C29.2501 15.4142 28.9143 15.75 28.5001 15.75H11.5C11.0858 15.75 10.75 15.4142 10.75 15C10.75 14.5858 11.0858 14.25 11.5 14.25H14.5001C14.5601 14.25 14.5767 14.2499 14.5902 14.2496C15.1049 14.2366 15.5589 13.9093 15.734 13.4252C15.7386 13.4125 15.7439 13.3968 15.7629 13.3398L15.8745 13.0049C15.9428 12.7996 16.0023 12.6207 16.0856 12.4608C16.4145 11.8291 17.0231 11.3905 17.7264 11.2781C17.9044 11.2497 18.093 11.2498 18.3094 11.25ZM17.0082 14.25C17.0597 14.149 17.1053 14.044 17.1446 13.9354C17.1565 13.9025 17.1682 13.8674 17.1832 13.8223L17.283 13.5229C17.3742 13.2494 17.3952 13.1936 17.416 13.1536C17.5257 12.943 17.7285 12.7968 17.963 12.7594C18.0075 12.7523 18.067 12.75 18.3553 12.75H21.6448C21.9331 12.75 21.9927 12.7523 22.0372 12.7594C22.2716 12.7968 22.4745 12.943 22.5842 13.1536C22.605 13.1936 22.626 13.2494 22.7171 13.5229L22.8169 13.8221L22.8556 13.9355C22.8949 14.044 22.9405 14.149 22.992 14.25H17.0082Z"
                            fill="#1c1c84"
                          />
                          <path
                            d="M13.9151 17.4501C13.8875 17.0368 13.5302 16.7241 13.1169 16.7517C12.7036 16.7792 12.3909 17.1366 12.4184 17.5499L12.8819 24.5016C12.9674 25.7844 13.0364 26.8205 13.1984 27.6336C13.3668 28.4789 13.6532 29.185 14.2448 29.7384C14.8364 30.2919 15.5599 30.5307 16.4146 30.6425C17.2366 30.75 18.275 30.75 19.5606 30.75H20.4395C21.7251 30.75 22.7635 30.75 23.5856 30.6425C24.4402 30.5307 25.1638 30.2919 25.7554 29.7384C26.347 29.185 26.6334 28.4789 26.8018 27.6336C26.9638 26.8205 27.0328 25.7844 27.1183 24.5016L27.5818 17.5499C27.6093 17.1366 27.2966 16.7792 26.8833 16.7517C26.47 16.7241 26.1126 17.0368 26.0851 17.4501L25.6251 24.3492C25.5353 25.6971 25.4713 26.6349 25.3307 27.3405C25.1943 28.025 25.004 28.3873 24.7306 28.6431C24.4572 28.8988 24.083 29.0647 23.391 29.1552C22.6776 29.2485 21.7376 29.25 20.3868 29.25H19.6134C18.2626 29.25 17.3226 29.2485 16.6092 29.1552C15.9172 29.0647 15.543 28.8988 15.2696 28.6431C14.9962 28.3873 14.8058 28.025 14.6695 27.3405C14.5289 26.6349 14.4649 25.6971 14.375 24.3492L13.9151 17.4501Z"
                            fill="#1c1c84"
                          />
                          <path
                            d="M17.4255 19.2537C17.8376 19.2125 18.2052 19.5132 18.2464 19.9254L18.7464 24.9254C18.7876 25.3375 18.4869 25.7051 18.0747 25.7463C17.6626 25.7875 17.295 25.4868 17.2538 25.0746L16.7538 20.0746C16.7126 19.6625 17.0133 19.2949 17.4255 19.2537Z"
                            fill="#1c1c84"
                          />
                          <path
                            d="M22.5747 19.2537C22.9869 19.2949 23.2876 19.6625 23.2464 20.0746L22.7464 25.0746C22.7052 25.4868 22.3376 25.7875 21.9255 25.7463C21.5133 25.7051 21.2126 25.3375 21.2538 24.9254L21.7538 19.9254C21.795 19.5132 22.1626 19.2125 22.5747 19.2537Z"
                            fill="#1c1c84"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button className='bg-buttonColor px-4 py-2 rounded-lg text-white' onClick={() => handleUnBlock(item)}>
                        Unblock
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="h-[84px] text-center font-[500] text-gray-500">
                {/* No products available */}
                <EmptyScreen first='No Products' second='No products available for the vendor' />
              </td>
            </tr>
          )}
        </tbody>
      )}

      <DeleteModal
        // isOpen={isOpen} 
        // setIsOpen={setIsOpen} 
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        product={productToActOn}
        onConfirm={confirmDelete}
        isLoading={isActionLoading}
      />

      <BlockModal
        isOpen={isBlockModalOpen}
        setIsOpen={setIsBlockModalOpen}
        product={productToActOn}
        onConfirm={confirmBlock}
        isLoading={isActionLoading}
        selectedButton={selectedButton}
      />

      <UnblockModal
        isOpen={isUnBlockModalOpen}
        setIsOpen={setIsUnBlockModalOpen}
        product={productToActOn}
        onConfirm={confirmUnblock}
        isLoading={isActionLoading}
      />
    </table>
  );
}
