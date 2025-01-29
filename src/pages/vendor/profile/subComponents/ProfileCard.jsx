import React, { useState } from 'react';
import CompanyDetails from './CompanyDetails';

const ProfileCard = ({ title, data, onEdit, description, commission }) => {
  
  const [isCompanyDetailsExpanded, setIsCompanyDetailsExpanded] = useState(false);

  const toggleCompanyDetails = () => {
    setIsCompanyDetailsExpanded((prevState) => !prevState);
  };
  
  return (
    <div className="bg-white p-7 rounded-lg border h-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-medium">{title}</h2>
        {onEdit && (
          <button onClick={onEdit}>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="14.7" fill="#2F4EFF" stroke="#2F4EFF" stroke-width="0.6" />
              <path d="M19.8181 12.9838L17.0163 10.182M19.8181 12.9838L16.3169 16.4849C15.8555 16.9463 15.2955 17.3105 14.6525 17.4214C14.0034 17.5334 13.1977 17.5707 12.8135 17.1865C12.4294 16.8023 12.4666 15.9966 12.5786 15.3475C12.6895 14.7045 13.0537 14.1445 13.5151 13.6831L17.0163 10.182M19.8181 12.9838C19.8181 12.9838 21.9193 10.8825 20.5184 9.48156C19.1175 8.08066 17.0163 10.182 17.0163 10.182M20.9076 14.9538C20.9076 19.5067 19.5067 20.9076 14.9538 20.9076C10.4009 20.9076 9 19.5067 9 14.9538C9 10.4009 10.4009 9 14.9538 9" stroke="white" stroke-width="0.740474" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {data ? (
        <div className="grid grid-cols-5 gap-4 break-words">
          {Object.entries(data).map(([key, value], index) => (
            <React.Fragment key={key}>
              {/* <div className="col-span-2 text-[12px] font-medium opacity-60">{key}</div>
              <div className="col-span-3 text-[14px]">{value}</div> */}
              {title === 'Company Details' ? (
                index < 3 && (
                  <>
                    <div className="col-span-2 text-[12px] font-medium opacity-60">{key}</div>
                    <div className="col-span-3 text-[14px]">{value}</div>
                  </>
                )
              ) : (
                <>
                  <div className="col-span-2 text-[12px] font-medium opacity-60">{key}</div>
                  <div className="col-span-3 text-[14px]">{value}</div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      ) : description ? (
        <div className="text-[12px] font-medium opacity-60">{description}</div>
      ) : commission ? (
        <div className="text-[24px] font-medium opacity-70">{commission}%</div>
      ) : <div className="text-[24px] font-medium opacity-70"></div>}

      {title === 'Company Details' && (
        <CompanyDetails
          companyDetails={{
            companyName: data?.['Company Name'],
            companyAddress: data?.['Company Address'],
            companyType: data?.['Company Type'],
            gstNumber: data?.['GST Number'],
            tradeLicense: data?.['Trade License'],
            dinNumber: data?.['DIN Number'],
            roc: data?.['ROC'],
            // directors: data?.['Directors']?.split(', '),
            directors: data?.['Directors']
          }}
        />
      )}

    </div>
  );
};

export default ProfileCard;
