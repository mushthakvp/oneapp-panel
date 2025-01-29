import React, { useState, useEffect, useRef } from "react";
import PageHeading from "../../../components/pageHeding/PageHeading";
import BannerCard from "./BannerCard";
import { useAddAdminBanner, useGetBanners } from "../../../api/useDataControllerAdmin";
import AddBannerModal from "./modal/AddbannnerModal";
import DeleteModal from "../../../components/modals/DeleteModal";
import { toast } from "react-toastify";
import NodataWithText from "../../../components/nodata/NodataWithText";

const Banner = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetBanners(page);
    const [isModalOpen, setIsModalOpen] = useState(false);
     const [editData, setEditData] = useState({});
    const [bannerData, setBannerData] = useState([]);
    const [deleteModal,setDeleteModal]=useState(false)
    const [id,setId]=useState('')   
  const observer = useRef();
const {mutate,isPending} = useAddAdminBanner();
  const lastBannerElementRef = (node) => {
    if (isLoading) return; // Avoid triggering when loading

    if (observer.current) observer.current.disconnect(); // Disconnect observer
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (data?.totalPages > 1) {
          setPage((prevPage) => prevPage + 1); // Increment page when bottom is reached
        }
      }
    });

    if (node) observer.current.observe(node); // Observe last banner card
  };

  // Handle banner edit
  const handleEdit = (id) => {
    console.log(`Edit banner with id ${id}`);
  };

  // Handle banner delete
  const handleDelete = () => {
      mutate({ action: "delete", id: id }, {
        
         onSuccess: () => { setBannerData((prevBannerData) =>
           prevBannerData.filter((banner) => banner._id !== id)
         );
              toast.success("Banner deleted successfully");
              setDeleteModal(false);
          },
          onError: (error) => {
           toast.error("Error deleting banner");
            console.error("Error deleting banner:", error);
          },
        });
     
    // Filter out the deleted banner from the bannerData array
   
  };



useEffect(() => {
  if (data?.banners) {
    const updatedBanners = data.banners.map((newBanner) => {
      const existingBanner = bannerData.find(
        (banner) => banner?._id === newBanner?._id
      );
      return existingBanner ? { ...existingBanner, ...newBanner } : newBanner;
    });

    // Create a set of existing IDs from the updated banners to avoid duplicates
    const existingIds = new Set(updatedBanners.map((banner) => banner._id));

    // Filter out any banners that are already in the updated list
    const mergedBanners = bannerData.filter(
      (banner) => !existingIds.has(banner._id)
    );

    // Combine the updated banners with the non-duplicate previous banners
    setBannerData([...updatedBanners, ...mergedBanners]);
  }
}, [data?.banners]);

  return (
      <div className="font-urbanist">
          <DeleteModal isOpen={deleteModal} setIsOpen={setDeleteModal} handleDelete={handleDelete} id={id}/>
      <AddBannerModal editData={editData} setEditData={setEditData} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <PageHeading title="Banner" />
      <div className="bg-containerWhite mt-[15px] p-[22px] rounded-md overflow-x-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-[18px] font-[600]">All Banners</h1>
          <button
            onClick={() => {
              setEditData('');
              setIsModalOpen(true)
            }}
            className="text-[14px] rounded-md text-white bg-buttonColor flex items-center justify-center p-2 px-4"
          >
            Add Banner
          </button>
        </div>

        <hr className="my-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bannerData?.length>0&&
                      bannerData.map((banner, index) => {
          
              return (
                <div ref={lastBannerElementRef} key={banner._id}>
                  <BannerCard
                    banner={banner}
                          onEdit={() => {
                        setEditData(banner);
                             setIsModalOpen(true);
                          }}
                          onDelete={() => {
                        setId(banner._id);
                              setDeleteModal(true)
                          }}
                  />
                </div>
              );
            
          })}
        </div>

        {isLoading && (
          <div className="text-center py-4">
            <p>Loading more banners...</p>
          </div>
        )}
              {
                  !isLoading && !data?.banners?.length && (
                    
                      <NodataWithText text="No Banner Found" subText={'Banner'} />
                  )
}
        {error && <p className="text-red-500 text-center">{error.message}</p>}
      </div>
    </div>
  );
};

export default Banner;
