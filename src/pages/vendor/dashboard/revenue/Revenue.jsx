import React from 'react'
import RevenueChart from './RevenueChart';
import { useGetVendorDashBoardGraph } from '../../../../api/useDataController';
import ChartFilter from '../../../../components/filters/ChartFilter';

function Revenue() {
  const [grafFilter, setGrafFilter] = React.useState("currentYear");
  const { data, isLoading, error } = useGetVendorDashBoardGraph(grafFilter);
 
  
  return (
    <div className="mt-[24px] p-5 sm:p-[26px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-[16px] w-full font-urbanist">
      <div className="flex items-center justify-between">
        <h1 className="text-[18px] font-[600] leading-[21.6px]">Revenue</h1>
        <ChartFilter setFilter={setGrafFilter} />
      </div>
      <RevenueChart data={data?.data} />
    </div>
  );
}

export default Revenue
