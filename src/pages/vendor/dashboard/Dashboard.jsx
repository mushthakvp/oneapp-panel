import React from 'react'
import Cards from './Cards/Cards';
import Revenue from './revenue/Revenue';
import Products from './Product/Products';
import PageHeading from '../../../components/pageHeding/PageHeading';
import DashboardTopFilter from '../../../components/filters/DashboardTopFilter';

function Dashboard() {
 const [filter, setFilter] = React.useState('month');
  return (
    <div
      className="font-urbanist"
     
    >
      <div className="flex items-center justify-between">
        <PageHeading title="Dashboard" />
        <DashboardTopFilter setFilter={setFilter} />
      </div>
      {/* card section */}

      <Cards filter={filter} />
      {/* card section */}
      {/* revenueSection */}
      <Revenue />
      {/* revenueSection */}
      {/* products */}
      <Products />
      {/* products */}
    </div>
  );
}

export default Dashboard
