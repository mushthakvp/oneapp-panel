import React, { useState } from 'react';
import CommissionModal from '../modals/CommisionModal';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';


function TopDiv({ vendor, status }) {
  // const [vendor,setVendor]=useState(vendor1?.vendor?vendor1?.vendor:vendor1)
  const [commissionOpen, setCommissionOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [downloadError, setDownloadError] = useState(null);
  const [currentCommission, setCurrentCommission] = useState(vendor?.commission);

  const copyToClipboard = () => {
    const bankDetails = `
      Bank Name: ${vendor?.bank[0]
        ? vendor?.bank[0]?.bank || "N/A"
        : vendor?.banks[0]?.bank
      }
      Account Holder: ${vendor?.bank[0]
        ? vendor?.bank[0]?.accountHolderName || "N/A"
        : vendor?.banks[0]?.accountHolderName
      }
      Account Number: ${vendor?.bank[0]
        ? vendor?.bank[0]?.accountNumber || "N/A"
        : vendor?.banks[0]?.accountNumber
      }
      IFSC: ${vendor?.bank[0]
        ? vendor?.bank[0]?.ifsc || "N/A"
        : vendor?.banks[0]?.ifsc
      }
      IBAN: ${vendor?.bank[0]
        ? vendor?.bank[0]?.iban || "N/A"
        : vendor?.banks[0]?.iban
      }
    `;
    navigator.clipboard.writeText(bankDetails).then(() => {
      alert("Bank details copied to clipboard!");
    });
  };
  console.log(vendor);

  const handleDownload = async () => {
    try {
      // Get the Cloudinary URL
      const imageUrl = vendor?.roc ? vendor?.roc : vendor?.vendor?.roc; // Using roc instead of rocImage to match your JSX
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-urbanist">
      {/* 11111111 */}
      <div className="rounded-md border border-inputBorder p-3">
        <h1 className="text-[20px] font-[500] mb-3">Personal Details</h1>
        <table className="w-full">
          <tr className="w-full h-[44px]">
            <td className="text-start text-[12px] opacity-60 w-[50%]">Name</td>
            <td className="text-start text-[14px]">
              {vendor?.name ? vendor?.name : vendor?.vendor?.name}
            </td>
          </tr>
          <tr className="w-full h-[44px]">
            <td className="text-start text-[12px] opacity-60">Address</td>
            <td className="text-start text-[14px]">
              {vendor?.address ? vendor?.address : vendor?.vendor?.address}
            </td>
          </tr>
          <tr className="w-full h-[44px]">
            <td className="text-start text-[12px] opacity-60">Email</td>
            <td className="text-start text-[14px]">
              {vendor?.email ? vendor?.email : vendor?.vendor?.email}
            </td>
          </tr>
          <tr className="w-full h-[44px]">
            <td className="text-start text-[12px] opacity-60">Phone Number</td>
            <td className="text-start text-[14px]">
              {vendor?.dialCode}{" "}
              {vendor?.phone ? vendor?.phone : vendor?.vendor?.phone}
            </td>
          </tr>
          <tr className="w-full h-[44px]">
            <td className="text-start text-[12px] opacity-60">State</td>
            <td className="text-start text-[14px]">
              {vendor?.state ? vendor?.state : vendor?.vendor?.state}
            </td>
          </tr>
          <tr className="w-full h-[44px]">
            <td className="text-start text-[12px] opacity-60">Country</td>
            <td className="text-start text-[14px]">
              {vendor?.country ? vendor?.country : vendor?.vendor?.country}
            </td>
          </tr>
        </table>
      </div>

      {/* 22222222 */}

      <div
        className={`rounded-md border border-inputBorder p-3 bg-white relative ${isExpanded ? "z-50 shadow-lg" : "z-10"
          }`}
      >
        <h1 className="text-[20px] font-[500] mb-3">Company Details</h1>
        <table className="w-full">
          <tbody>
            <tr className="w-full h-[44px]">
              <td className="text-start text-[12px] opacity-60 w-[50%]">
                Company Name
              </td>
              <td className="text-start text-[14px]">
                {vendor?.companyName
                  ? vendor?.companyName
                  : vendor?.vendor?.companyName}
              </td>
            </tr>
            <tr className="w-full h-[44px]">
              <td className="text-start text-[12px] opacity-60">
                Company Address
              </td>
              <td className="text-start text-[14px]">
                {vendor?.companyAddress
                  ? vendor?.companyAddress
                  : vendor?.vendor?.companyAddress}
              </td>
            </tr>
            <tr className="w-full h-[44px]">
              <td className="text-start text-[12px] opacity-60">
                Company Type
              </td>
              <td className="text-start text-[14px]">
                {vendor?.companyType
                  ? vendor?.companyType
                  : vendor?.vendor?.companyType}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="border-t border-gray-200 mt-4 pt-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="text-[14px] font-medium">Other Details</span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </div>

          {isExpanded && (
            <div
              className={`absolute left-0 right-0 bg-white  rounded-b-md shadow-lg p-4 ${isExpanded ? "z-50" : "z-10"
                }`}
            >
              <table className="w-full">
                <tbody>
                  {/* <tr className="w-full h-[44px]">
                    <td className="text-start text-[12px] opacity-60 w-[50%]">
                      Director's Name
                    </td>
                    <td className="text-start text-[14px]">
                      {vendor?.directors?.join(", ")}
                    </td>
                  </tr> */}
                  {vendor?.directors?.map((director, index) => (
                    <React.Fragment key={index}>
                      <tr className="w-full h-[44px]">
                        <td className="text-start text-[12px] opacity-60 w-[50%]">
                          Director's Name
                        </td>
                        <td className="text-start text-[14px]">
                          {director.director}
                        </td>
                      </tr>
                      <tr className="w-full h-[44px]">
                        <td className="text-start text-[12px] opacity-60">
                          DIN Number
                        </td>
                        <td className="text-start text-[14px]">
                          {director.dinNumber}
                        </td>
                      </tr>
                      {/* {index !== vendor.directors.length - 1 && ( */}
                        <tr>
                          <td colSpan="2" className="border-b border-gray-200"></td>
                        </tr>
                      {/* )} */}
                    </React.Fragment>
                  ))}
                  {(vendor?.gstNumber || vendor?.vendor?.gstNumber) && (
                    <tr className="w-full h-[44px]">
                      <td className="text-start text-[12px] opacity-60">
                        GST Number
                      </td>
                      <td className="text-start text-[14px]">
                        {vendor?.gstNumber
                          ? vendor?.gstNumber
                          : vendor?.vendor?.gstNumber}
                      </td>
                    </tr>
                  )}
                  {(vendor?.tradeLicense || vendor?.vendor?.tradeLicense) && (
                    <tr className="w-full h-[44px]">
                      <td className="text-start text-[12px] opacity-60">
                        Trade License
                      </td>
                      <td className="text-start text-[14px]">
                        {vendor?.tradeLicense
                          ? vendor?.tradeLicense
                          : vendor?.vendor?.tradeLicense}
                      </td>
                    </tr>
                  )}
                  {(vendor?.dinNumber || vendor?.vendor?.dinNumber) && (
                    <tr className="w-full h-[44px]">
                      <td className="text-start text-[12px] opacity-60">
                        DIN Number
                      </td>
                      <td className="text-start text-[14px]">
                        {vendor?.dinNumber
                          ? vendor?.dinNumber
                          : vendor?.vendor?.dinNumber}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="mt-4">
                <span className="text-[12px] opacity-60">ROC</span>
                {downloadError && (
                  <p className="text-red-500 text-sm mt-1">{downloadError}</p>
                )}
                <div className="relative mt-2 border-2 border-gray-200 rounded-md">
                  <img
                    src={
                      vendor?.roc
                        ? vendor?.roc
                        : vendor?.vendor?.roc || "/api/placeholder/400/200"
                    }
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
      </div>

      {/* 33333333333333 */}
      <div className="rounded-md border border-inputBorder p-3">
        <div className="flex items-center justify-between">
          <h1 className="text-[20px] font-[500] mb-3">Bank Details</h1>
        </div>

        <table className="w-full">
          <tr className="w-full h-[44px]">
            <td className="text-start text-[12px] opacity-60 w-[50%]">
              Bank Name
            </td>
            <td className="text-start text-[14px]">
              {vendor?.bank?.length > 0
                ? vendor?.bank[0]?.bank
                : vendor?.banks[0]?.bank}
            </td>
          </tr>
          <tr className="w-full h-[44px]">
            <td className="text-start text-[12px] opacity-60">
              Account Holder
            </td>
            <td className="text-start text-[14px]">
              {vendor?.bank?.length > 0
                ? vendor?.bank[0]?.accountHolderName
                : vendor?.banks[0]?.accountHolderName}
            </td>
          </tr>
          <tr className="w-full h-[44px]">
            <td className="text-start text-[12px] opacity-60">
              Account Number
            </td>
            <td className="text-start text-[14px]">
              {vendor?.bank?.length > 0
                ? vendor?.bank[0]?.accountNumber
                : vendor?.banks[0]?.accountNumber}
            </td>
          </tr>
          {vendor?.bank?.length > 0 ? (
            <tr className="w-full h-[44px]">
              <td className="text-start text-[12px] opacity-60">IFSC</td>
              <td className="text-start text-[14px]">{vendor?.bank[0].ifsc}</td>
            </tr>
          ) : (
            <tr className="w-full h-[44px]">
              <td className="text-start text-[12px] opacity-60">IFSC</td>
              <td className="text-start text-[14px]">
                {vendor?.banks[0].ifsc}
              </td>
            </tr>
          )}
          {vendor?.bank?.length ? (
            <tr className="w-full h-[44px]">
              <td className="text-start text-[12px] opacity-60">Iban</td>
              <td className="text-start text-[14px]">
                {vendor?.bank[0]?.iban}
              </td>
            </tr>
          ) : (
            <tr className="w-full h-[44px]">
              <td className="text-start text-[12px] opacity-60">Iban</td>
              <td className="text-start text-[14px]">
                {vendor?.banks[0]?.iban}
              </td>
            </tr>
          )}
        </table>
      </div>

      {/* 444444444 */}
      {status === "Rejected" && (
        <div className="rounded-md border border-inputBorder p-3">
          <span className="flex items-center justify-between text-[20px] font-[500]">
            Reason
          </span>
          <p className="text-[14px] font-[500] mt-[14px]">
            {vendor?.rejectedReason}
          </p>
        </div>
      )}

      {/* 555555555555555555 */}
      {vendor?.returnPolicy && (
        <div className="rounded-md border border-inputBorder p-3">
          <h1 className="text-[20px] font-[500] mb-3">Return Policy</h1>
          <p className="text-[14px] font-[500] mt-[14px] break-words">
            {vendor?.returnPolicy}
          </p>
        </div>
      )}

      {/* 6666666 */}
      {(status === "Approved" || status === "Blocked") && (
        <div className="rounded-md border border-inputBorder p-3">
          <span className="flex items-center justify-between text-[20px] font-[500]">
            Commission
            <svg
              onClick={() => setCommissionOpen(true)}
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="15"
                cy="15"
                r="14.7"
                fill="#1c1c840f"
                stroke="#1c1c840f"
                stroke-width="0.6"
              />
              <path
                d="M19.8181 12.9838L17.0163 10.182M19.8181 12.9838L16.3169 16.4849C15.8555 16.9463 15.2955 17.3105 14.6525 17.4214C14.0034 17.5334 13.1977 17.5707 12.8135 17.1865C12.4294 16.8023 12.4666 15.9966 12.5786 15.3475C12.6895 14.7045 13.0537 14.1445 13.5151 13.6831L17.0163 10.182M19.8181 12.9838C19.8181 12.9838 21.9193 10.8825 20.5184 9.48156C19.1175 8.08066 17.0163 10.182 17.0163 10.182M20.9076 14.9538C20.9076 19.5067 19.5067 20.9076 14.9538 20.9076C10.4009 20.9076 9 19.5067 9 14.9538C9 10.4009 10.4009 9 14.9538 9"
                stroke="white"
                stroke-width="0.740474"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <p className="text-[20px] font-[500] mt-[14px] opacity-70">
            {currentCommission}%
          </p>
        </div>
      )}

      {/* 7777777 */}
      {status === "Blocked" && (
        <div className="rounded-md border border-inputBorder p-3">
          <h1 className="text-[20px] font-[500] mb-3">Reason</h1>
          <p className="mt-2 text-[12px] font-[400] opacity-60">
            {vendor?.blockReason}
          </p>
        </div>
      )}

      <CommissionModal
        isOpen={commissionOpen}
        setIsOpen={setCommissionOpen}
        vendor={vendor}
        currentCommission={currentCommission}
        setCurrentCommission={setCurrentCommission}
      />
    </div>
  );
}

export default TopDiv
