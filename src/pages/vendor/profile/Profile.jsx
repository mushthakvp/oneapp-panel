import React, { useState } from 'react';
import ProfileCard from './subComponents/ProfileCard';
import EditModal from './subComponents/EditModal';
import { useGetProfile } from '../../../api/useDataController';
import PageHeading from '../../../components/pageHeding/PageHeading';
import ProfileShimmer from '../../../components/loading/shimmer/ProfileShimmer'


const Profile = () => {

    const [openBankModal, setOpenBankModal] = useState(false);
    const [openReturnModal, setOpenReturnModal] = useState(false);

    const { data, isLoading, error } = useGetProfile()

    const personalDetails = {
        'Name': data?.vendor?.name,
        'Email': data?.vendor?.email,
        'Phone Number': `${data?.vendor?.dialCode}${data?.vendor?.phone}`,
        'Address': data?.vendor?.address,
        'State': data?.vendor?.state,
        'Country': data?.vendor?.country
    };

    const companyDetails = {
        'Company Name': data?.vendor?.companyName,
        'Company Address': data?.vendor?.companyAddress,
        'Company Type': data?.vendor?.companyType,
        ...(data?.vendor?.gstNumber && { 'GST Number': data.vendor.gstNumber }),
        ...(data?.vendor?.tradeLicense && { 'Trade License': data.vendor.tradeLicense }),
        ...(data?.vendor?.dinNumber && { 'DIN Number': data.vendor.dinNumber }),
        ...(data?.vendor?.roc && { 'ROC': data.vendor.roc }),
        // 'Directors': data?.vendor?.directors?.join(', '),  
        'Directors': data?.vendor?.directors
    };

    const bankDetails = {
        _id: data?.bank?._id,
        displayData: {
            'Bank Name': data?.bank?.bank,
            'Account Holder': data?.bank?.accountHolderName,
            'Account Number': data?.bank?.accountNumber,
            // 'IFSC': data?.bank?.ifsc,
            // 'IBAN': data?.bank?.iban,
            ...(data?.bank?.ifsc && { 'IFSC': data?.bank?.ifsc }),
            ...(data?.bank?.iban && { 'IBAN': data?.bank?.iban }),
        }
    };


    return (
        <div className="font-urbanist">
            {/* <h1 className="font-[500] text-[20px] sm:text-[28px] leading-[33.6px] tracking-[-0.38px]">
                Profile
            </h1> */}
            <PageHeading title="Profile" />

            {isLoading ? (
                <ProfileShimmer />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-[31px]">
                    <ProfileCard title="Personal Details" data={personalDetails} />
                    <ProfileCard title="Company Details" data={companyDetails} />
                    <ProfileCard
                        title="Bank Details"
                        data={bankDetails?.displayData}
                        onEdit={() => setOpenBankModal(true)}
                    />
                    <div className="md:col-start-1 md:mt-4">
                        <ProfileCard
                            title="Return Policy"
                            description={data?.vendor?.returnPolicy}
                            onEdit={() => setOpenReturnModal(true)}
                        />
                    </div>
                    <div className="md:mt-4">
                        <ProfileCard
                            title="Commission"
                            commission={data?.vendor?.commission}
                        />
                    </div>
                </div>
            )}

            {openBankModal && (
                <EditModal
                    key="bank-modal"
                    open={openBankModal}
                    handleClose={() => setOpenBankModal(false)}
                    title="Edit Bank Details"
                    type="bank"
                    initialData={bankDetails}
                />
            )}

            {openReturnModal && (
                <EditModal
                    key="return-modal"
                    open={openReturnModal}
                    handleClose={() => setOpenReturnModal(false)}
                    title="Edit Return Policy"
                    type="return"
                    initialData={data?.vendor?.returnPolicy}
                />
            )}

        </div>
    );
};

export default Profile;


