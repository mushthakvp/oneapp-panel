import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeading from '../../../components/pageHeding/PageHeading'
import Buttons from './Buttons';
import Table from './Table';
import PageNation from '../../../components/pagenation/PageNation';
import Search from './vendorDetailPage/Search';
import { useGetVendors } from '../../../api/useDataControllerAdmin';


function Vendors() {

  const location = useLocation();
  // const navigate = useNavigate();

  const limit = 10;
  const [selectedButton, setSelectedButton] = useState(location?.state?.tab || "Requests");
  // const [selectedButton, setSelectedButton] = useState("Requests");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useGetVendors(selectedButton, page, limit, search);

  // useEffect(() => {
  //   if (location?.state?.tab) {
  //     setSelectedButton(location.state.tab);
  //     navigate(location.pathname, { replace: true });
  //   }
  // }, [location?.state?.tab]);

  useEffect(() => {
    setTotalPage(data?.totalPage);
  }, [data])

  useEffect(() => {
    setPage(1);
  }, [search, selectedButton]);


  return (
    <div className="font-urbanist overflow-y-auto">
      <PageHeading title="Dashboard" />
      <div className="bg-containerWhite mt-[15px] p-[22px] rounded-md min-w-[750px]">
        
        <div className="flex items-center justify-between">
          <Buttons selected={selectedButton} setSelected={setSelectedButton} />
          {(selectedButton === "Approved" || selectedButton === "Blocked") &&
            (<Search search={search} setSearch={setSearch} />)
          }
        </div>

        <Table status={selectedButton} data={data?.vendors} isLoading={isLoading} />

        {totalPage > 1 && (
          <div className="flex p-3 justify-end">
            <PageNation totalpage={totalPage} setPage={setPage} />
          </div>
        )}

      </div>
    </div>
  );
}

export default Vendors
