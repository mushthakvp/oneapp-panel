import React, { useEffect, useState } from 'react';
import PageHeading from '../../../components/pageHeding/PageHeading';
import ImagePicker from '../category/ImagePicker';
import { useAddAdminSubCategory } from '../../../api/useDataControllerAdmin';
import Section from '../banner/modal/Section';
import Category from '../banner/modal/category/Category';
import { toast } from 'react-toastify';
import { useImageUpload } from '../../../api/useDataController';
import { useLocation, useNavigate } from 'react-router-dom';

const AddSubCategory = () => {

    const editData = useLocation()?.state?.data
    const navigate = useNavigate()
    const [image, setImage] = useState(null);
    const { mutate, isPending } = useAddAdminSubCategory();
    const { mutate: imageMutate, isPending: imagePending } = useImageUpload()
    const [postData, setPostData] = useState({
        action: "add",
        name: "",
        section: "",
        category: "",
        image: ""
    });

    useEffect(() => {
        console.log(editData);

        if (editData) {
            setPostData({
                action: "update",
                name: editData?.name,
                section: editData?.sectionId,
                image: editData?.image,
                id: editData?._id,
                category: editData?.category._id,
            });

        }
    }, [editData]);

    const handleSubmit = () => {

        if (editData) {
            if (image) {
                imageMutate(image, {
                    onSuccess: (data) => {
                        const updateData = {
                            ...postData,
                            image: data?.url,
                            sectionId: postData?.section,
                        };
                        mutate(updateData, {
                            onSuccess: (data) => {
                                toast.success(data?.message);
                                setPostData({
                                    action: "add",
                                    name: "",
                                    section: "",
                                });
                                navigate(-1);
                            },
                            onError: (error) => {
                                console.log('error sub category: ', error);
                                
                                toast.error("Subcategory adding failed");
                            },
                        });
                    },
                    onError: () => {
                        toast.error("Image upload failed");
                    },
                });
            }
            else {
                const updateData = {
                    ...postData,
                    sectionId: postData?.section,
                };
                mutate(updateData, {
                    onSuccess: (data) => {
                        toast.success(data?.message);
                        setPostData({
                            action: "add",
                            name: "",
                            section: "",
                        });
                        navigate(-1);
                    },
                    onError: (error) => {
                        console.log('error sub category: ', error);

                        toast.error("sub category adding failed");
                    },
                });
            }
        }
        else {
            if (!postData?.name) {
                toast.error("Please enter a name.");
                return;
            }
            if (!postData?.section) {
                toast.error("Please select a section.");
                return;
            }
            if (!postData?.category) {
                toast.error("Please select a category.");
                return;
            }
            if (!image) {
                toast.error("Please select a image.");
                return;
            }
            imageMutate(image, {
                onSuccess: (data) => {
                    const updateData = {
                        ...postData,
                        image: data?.url,
                        sectionId: postData?.section,
                    };
                    mutate(updateData, {
                        onSuccess: (data) => {
                            toast.success(data?.message);
                            setPostData({
                                action: "add",
                                name: "",
                                section: "",
                            });
                            navigate(-1);
                        },
                        onError: (error) => {
                            console.log('error sub category: ', error);

                            toast.error("Subcategory adding failed");
                        },
                    });
                },
                onError: () => {
                    toast.error("Image upload failed");
                },
            });
        }
    }


    return (
        <div className="font-urbanist">
            <div className="flex items-center gap-3 ">
                <svg
                    onClick={() => navigate(-1)}
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M29.9998 18H5.99976M5.99976 18L14.9998 9M5.99976 18L14.9998 27"
                        stroke="black"
                        stroke-width="1.98214"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <PageHeading title="Add Subcategory" />
            </div>
            <div className="bg-containerWhite mt-[15px] p-[22px] rounded-md min-w-[750px] flex flex-col gap-[36px]">
                <div className="flex items-center">
                    <div className="w-full max-[30%]">
                        Subcategory name <span className="text-buttonColor">*</span>
                    </div>
                    <input
                        value={postData?.name}
                        onChange={(e) => setPostData({ ...postData, name: e.target.value })}
                        placeholder="Enter Subcategory Name"
                        type="text"
                        className="w-full min-w-[70%] border border-borderColor bg-transparent rounded-md p-2 focus:outline-none"
                    />
                </div>
                <ImagePicker image={image} setImage={setImage} editData={editData} />
                <div className="flex items-center">
                    <div className="w-full max-[30%]">
                        Section name <span className="text-buttonColor">*</span>
                    </div>
                    <div className="w-full min-w-[70%]">
                        <Section selected={postData} setSelected={setPostData} />
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-full max-[30%]">
                        Category name <span className="text-buttonColor">*</span>
                    </div>
                    <div className="w-full min-w-[70%]">
                        <Category
                            sectionId={postData?.section}
                            selected={postData}
                            setSelected={setPostData}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button disabled={isPending || imagePending} onClick={handleSubmit} className="w-full max-w-[352px] flex items-center justify-center bg-buttonColor text-white p-2 rounded-md">
                        {isPending || imagePending ? 'Loading....' : editData ? " Save Changes" : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddSubCategory