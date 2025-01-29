import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';

const CompanyDetails = ({ companyDetails }) => {

    const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
    const [downloadError, setDownloadError] = useState(null);

    const toggleAdditionalDetails = () => {
        setShowAdditionalDetails(!showAdditionalDetails);
    };

    const { companyName, companyAddress, companyType, gstNumber, tradeLicense, dinNumber, roc, directors } = companyDetails;

    const handleDownload = async () => {
        try {
            // Get the Cloudinary URL
            const imageUrl = roc; // Using roc instead of rocImage to match your JSX
            if (!imageUrl) {
                throw new Error('No image URL available');
            }

            // Fetch the image as a blob
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }

            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            // Get file extension from URL or default to jpg
            const extension = imageUrl.split('.').pop() || 'jpg';

            // Create and trigger download
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `ROC_Document.${extension}`;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            setTimeout(() => {
                window.URL.revokeObjectURL(blobUrl);
                document.body.removeChild(link);
            }, 100);

        } catch (error) {
            console.error('Download error:', error);
            setDownloadError(error.message);
        }
    };


    return (
        <div className="mt-4 border-t pt-4">
            <div className="flex justify-between items-center">
                <h3 className="text-[16px] font-medium">Other Details</h3>
                <button onClick={toggleAdditionalDetails}>
                    <svg
                        className={`transform transition-transform ${showAdditionalDetails ? 'rotate-180' : ''}`}
                        width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.4216 0.284668H1.57842C0.264145 0.284668 -0.472617 1.57184 0.339396 2.4493L5.76098 8.30814C6.39099 8.98928 7.60726 8.98928 8.23902 8.30814L13.6606 2.44759C14.4726 1.57184 13.7359 0.284668 12.4216 0.284668Z" fill="black" />
                    </svg>
                </button>
            </div>

            {showAdditionalDetails && (
                <div className="mt-4 grid grid-cols-5 gap-4 break-words">
                    {directors?.map((director, index) => (
                        <React.Fragment key={index}>
                            <div className="col-span-2 text-[12px] font-medium opacity-60">Director's Name</div>
                            <div className="col-span-3 text-[14px]">{director.director}</div>

                            <div className="col-span-2 text-[12px] font-medium opacity-60">DIN Number</div>
                            <div className="col-span-3 text-[14px]">{director.dinNumber}</div>

                            {/* {index !== directors.length - 1 && ( */}
                                <div className="col-span-5 border-b border-gray-200 my-2"></div>
                            {/* )} */}
                        </React.Fragment>
                    ))}
                    {gstNumber && (
                        <React.Fragment>
                            <div className="col-span-2 text-[12px] font-medium opacity-60">GST Number</div>
                            <div className="col-span-3 text-[14px]">{gstNumber}</div>
                        </React.Fragment>
                    )}
                    {tradeLicense && (
                        <React.Fragment>
                            <div className="col-span-2 text-[12px] font-medium opacity-60">Trade License</div>
                            <div className="col-span-3 text-[14px]">{tradeLicense}</div>
                        </React.Fragment>
                    )}
                    {/* {dinNumber && (
                        <React.Fragment>
                            <div className="col-span-2 text-[12px] font-medium opacity-60">DIN Number</div>
                            <div className="col-span-3 text-[14px]">{dinNumber}</div>
                        </React.Fragment>
                    )}
                    {directors && (
                        <React.Fragment>
                            <div className="col-span-2 text-[12px] font-medium opacity-60">Directors</div>
                            <div className="col-span-3 text-[14px]">{directors.join(', ')}</div>
                        </React.Fragment>
                    )} */}
                    {roc && (
                        <div className="col-span-5 relative">
                            <div className="mt-4">
                                <span className="text-[12px] opacity-60">ROC</span>
                                {downloadError && (
                                    <p className="text-red-500 text-sm mt-1">{downloadError}</p>
                                )}
                                <div className="relative mt-2 border-2 border-gray-200 rounded-md">
                                    <img
                                        src={roc || "/api/placeholder/400/200"}
                                        alt="ROC Document"
                                        className="w-full h-20 object-cover opacity-70"
                                    />
                                    <button
                                        onClick={handleDownload}
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <Download className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CompanyDetails;