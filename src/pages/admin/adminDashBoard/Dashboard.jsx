import React, {useState} from 'react'
import PageHeading from '../../../components/pageHeding/PageHeading';
import Cards from './Cards/Cards';
import Revenue from './revenue/Revenue';
import DashboardTopFilter from '../../../components/filters/DashboardTopFilter';

function Dashboard() {

  const [filter, setFilter] = useState('thisMonth');


  return (
    <div
      className="font-urbanist"
     
    >
      <div className="flex items-center justify-between">
        <PageHeading title="Dashboard" />
        <DashboardTopFilter setFilter={setFilter} />
      </div>
      <Cards filter={filter} />
      <Revenue />
    </div>
  );
}

export default Dashboard
