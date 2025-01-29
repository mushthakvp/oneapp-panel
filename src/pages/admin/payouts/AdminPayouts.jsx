import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeading from '../../../components/pageHeding/PageHeading'
import Tabs from '../../vendor/revenue/subComponents/Tabs';
import Table from './subComponents/Table';
import { useGetPayouts } from '../../../api/useDataControllerAdmin';
import PageNation from '../../../components/pagenation/PageNation';
import NodataWithText from '../../../components/nodata/NodataWithText';

const AdminPayouts = () => {
    const [page, setPage] = useState(1);

    const location = useLocation();
const [status, setStatus] = useState("payouts");
    const [selectedTab, setSelectedTab] = useState(location?.state?.selectedTab || 'Payouts');
    const [search, setSearch] = useState('');
const { data, isLoading, error } = useGetPayouts(page,search,status);
    const handleTabChange = (tab) => {
        setPage(1)
        setSearch('');
        if(tab === 'Payouts') {
            setStatus('payouts');
        } else if(tab === 'History') {
            setStatus('history');
        }
        setSelectedTab(tab);
    };
    console.log(data);
    console.log(error);
    

    return (
      <div className="font-urbanist">
        <PageHeading title="Payouts" />
        <div className="bg-containerWhite mt-[15px] p-[35px] rounded-md border">
          <div className="flex items-center flex-col md:flex-row gap-5 md:gap-14">
            <Tabs
              tabs={["Payouts", "History"]}
              selectedTab={selectedTab}
              onTabChange={handleTabChange}
            />
            <div className="flex items-center px-5 w-1/2 bg-[#F7F7F7] border border-inputBorder rounded-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.80296 17.2973C13.9398 17.2973 17.2934 13.9437 17.2934 9.80687C17.2934 5.67 13.9398 2.31641 9.80296 2.31641C5.66609 2.31641 2.3125 5.67 2.3125 9.80687C2.3125 13.9437 5.66609 17.2973 9.80296 17.2973Z"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.0156 15.4062L17.9523 18.3353"
                  stroke="black"
                  stroke-opacity="0.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full outline-none bg-transparent pl-3"
                placeholder="Search Vendor"
              />
            </div>
          </div>

          <Table
            loading={isLoading}
            data={data?.data}
            selectedTab={selectedTab}
          />
          {data?.totalPages > 1 && (
            <PageNation setPage={setPage} totalpage={data?.totalPages} />
                )}
                {
                    data?.data?.length===0 &&!isLoading&&<NodataWithText text="No Data Found" subText={'Payouts'}/>
                }
        </div>
      </div>
    );
}

export default AdminPayouts