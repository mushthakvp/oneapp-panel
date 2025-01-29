import React, {useState} from 'react'
import RevenueChart from './RevenueChart';
import ChartFilter from '../../../../components/filters/ChartFilter';
import { useGetAdminDashBoardGraph } from '../../../../api/useDataControllerAdmin';


function Revenue() {

  const [graphFilter, setGraphFilter] = useState("currentYear");
  const { data, isLoading, error } = useGetAdminDashBoardGraph(graphFilter);
 
  console.log("data", data);
  
  
  return (
    <div className="mt-[24px] p-5 sm:p-[26px] rounded-lg border border-naveBorder bg-containerWhite flex flex-col gap-[16px] w-full font-urbanist">
      <div className='flex items-center justify-between'>
        <h1 className="text-[18px] font-[600] leading-[21.6px]">Revenue</h1>
        <ChartFilter setFilter={setGraphFilter} />
      </div>
      <RevenueChart data={data} />
    </div>
  );
}

export default Revenue
