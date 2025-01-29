import React, { useEffect, useState } from 'react'
import PlusMinusButton from '../../PlusMinusButton';
import { Modal } from '@mui/material';
import { useAddBrands, useGetBrands, useImageUpload } from '../../../../../../api/useDataController';
import { toast } from 'react-toastify';
import { Sledding } from '@mui/icons-material';

function Brand({ selected, setSelected,selectedBrandName }) {
    const [search,setSearch]=useState('')
    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectName, setSelectedName] = useState('');
 
    const { isPending, mutate,isPending:imagePending} = useImageUpload()
    const { mutate:addBrand,isPending:addLoading} = useAddBrands()
    const {data,error,isLoading}=useGetBrands(search)
    const [brandAdd, setBrandAdd] = useState({
      name: "",
      image: '',
        description: ""
    });
    const [isOpen, setIsOpen] = React.useState(false);
    const [imagePre, setImagePre] = useState('')
    const handleImageChange = (e) => {
        if (!e.target.files[0]) return
       
        setBrandAdd({...brandAdd, image: e.target.files[0]})
          setImagePre(URL.createObjectURL(e.target.files[0]))
    }
    const handleSubmit = () => {
        if(!brandAdd.name || !brandAdd.image || !brandAdd.description) {
            toast.info("Please fill all the fields")
            return
        }
        mutate(brandAdd?.image, {
            onSuccess: (res) => {
                
                addBrand(
                  {
                    name: brandAdd?.name,
                    image: res?.url,
                    description: brandAdd?.description,
                  },
                  {
                    onSuccess: (res) => {
                      toast.success("Brand Added Successfully");

                      setBrandAdd({
                        name: "",
                        image: "",
                        description: "",
                      });
                      setImagePre("");

                      setModalOpen(false);
                    },
                  },
                  {
                    onError: (err) => {
                      toast.error(err.response.data.message);
                    },
                  }
                );
            },
            onError: (err) => {
        toast.error(err.response.data.message)
     }
 })

    };
    useEffect(() => {
      if (selected && data?.brands) {
        // Log selected brand ID
       // Log selected brand ID

        const selectedBrandName = data?.brands
          ?.filter((brand) => {
          // Check if they match
            return brand._id === selected?.brand; // Compare the _id with selected?.brand
          })
          .map((filteredBrand) => filteredBrand.name); // After filtering, map to get only the name

        if (selectedBrandName?.length > 0) {
          setSelectedName(selectedBrandName[0]); // Set the first matched brand name
        } else {
          setSelectedName(""); // Reset if no brand is found
        }
      }
    }, [selected, data?.brands]);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="flex justify-between items-center h-12 gap-[8px] transition-all duration-700 ease-out"
    >
      <div className="w-full relative border border-inputBorder rounded-md h-12 flex items-center justify-between px-3">
        {selectName && selectName}
        {!selectName && <span className="opacity-60">Select Brand</span>}
        <svg
          className={`cursor-pointer ${
            isOpen ? "rotate-180 duration-700 ease-out" : ""
          }`}
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.4216 0H1.57842C0.264145 0 -0.472617 1.29145 0.339396 2.17182L5.76098 8.05013C6.39099 8.73353 7.60726 8.73353 8.23902 8.05013L13.6606 2.17011C14.4726 1.29145 13.7359 0 12.4216 0Z"
            fill="#1B3865"
          />
        </svg>
        {/* dropElement */}
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className={`w-full z-50 bg-containerWhite absolute left-0 rounded-md duration-700 ease-out overflow-y-auto  ${
            isOpen ? "h-48 border border-inputBorder top-12" : "h-0 top-10"
          }  `}
        >
          <div className="p-2 ">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full  h-8 border border-inputBorder rounded-md px-2 outline-none"
              name=""
              id=""
            />
            {data?.brands?.map((data) => {
              return (
                <li
                  onClick={() => {
                    setSelected({
                      ...selected,
                      brand: data?._id,
                    });
                    selectedBrandName(data?.name);
                    setSelectedName(data?.name);
                    setIsOpen(false);
                  }}
                  className="p-2 cursor-pointer"
                >
                  {data?.name}
                </li>
              );
            })}
          </div>
        </div>
      </div>
      <PlusMinusButton
        callBack={() => setModalOpen(true)}
        icon={
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.7647 8.545H9.47059V1.23578C9.47059 1.10563 9.36518 1 9.23529 1H8.76471C8.63482 1 8.52941 1.10563 8.52941 1.23578V8.545H1.23529C1.10541 8.545 1 8.65063 1 8.78078V9.25234C1 9.38249 1.10541 9.48812 1.23529 9.48812H8.52941V16.7973C8.52941 16.927 8.63482 17.0331 8.76471 17.0331H9.23529C9.36518 17.0331 9.47059 16.927 9.47059 16.7973V9.48812H16.7647C16.8941 9.48812 17 9.38249 17 9.25234V8.78078C17 8.65063 16.8941 8.545 16.7647 8.545Z"
              fill="white"
              stroke="white"
              stroke-width="2"
            />
          </svg>
        }
      />
      <Modal
        className="flex items-center justify-center"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div className="bg-containerWhite  max-w-[332px] w-full rounded-lg overflow-hidden">
          <div className="w-full p-4 border border-b-inputBorder text-center">
            <h1 className="text-[18px] font-[600] leading-[21.6px]">
              Add Brand
            </h1>
          </div>
          <div className="p-2 flex items-center justify-center ">
            <input
              type="file"
              id="proPicId"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {/* imagePicker */}
            <div className="w-[78px] h-[78px] rounded-full relative bg-[#F0F0F0]">
              {imagePre && (
                <img
                  src={imagePre}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              )}
              <div
                onClick={() => {
                  document.getElementById("proPicId").click();
                }}
                className="bg-buttonColor bottom-0 right-0 cursor-pointer absolute z-30 w-[15px] h-[15px] rounded-full flex items-center justify-center"
              >
                <svg
                  width="8"
                  height="7"
                  viewBox="0 0 8 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.4668 3.20016H4.0668M4.0668 3.20016H6.6668M4.0668 3.20016V5.80016M4.0668 3.20016V0.600159"
                    stroke="white"
                    stroke-width="1.04"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
            </div>
            {/* imagePicker */}
          </div>
          <div className="px-4">
            <div className="w-full ">
              <p className="mb-[4px]">Brand</p>
              <input
                type="text"
                placeholder="Enter Your Brand Name"
                value={brandAdd?.name}
                onChange={(e) =>
                  setBrandAdd({ ...brandAdd, name: e.target.value })
                }
                className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
              />
            </div>
            <div className="w-full mt-5">
              <p className="mb-[4px]">Description</p>
              <input
                type="text"
                value={brandAdd?.description}
                onChange={(e) =>
                  setBrandAdd({ ...brandAdd, description: e.target.value })
                }
                placeholder="Enter brand description"
                className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={imagePending || addLoading}
              className="w-full mb-4 h-12 flex items-center justify-center text-sm text-white bg-buttonColor mt-6 rounded-lg"
            >
              {imagePending || addLoading ? "Loading...." : "Submit"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Brand
