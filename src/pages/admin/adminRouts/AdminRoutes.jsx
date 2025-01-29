import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../adminDashBoard/Dashboard';
import Vendors from '../vendors/Vendors';
import AdminPayouts from '../payouts/AdminPayouts';
import AdminPayoutDetails from '../payoutDetails/AdminPayoutDetails'
import DetailPage from '../vendors/vendorDetailPage/DeatilPage';
import CategoryShow from '../category/CategoryShow';
import AddCategory from '../category/AddCategory';
import SectionShow from '../section/SectionShow';
import AddSection from '../section/AddSection';
import Banner from '../banner/Banner';
import SubCategory from '../subCategory/SubCategory';
import AddSubCategory from '../subCategory/AddSubCategory';
import Clouds from '../clouds/Clouds';
import AddClouds from '../clouds/AddClouds';


function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/vendors" element={<Vendors />} />
      <Route path="/payouts" element={<AdminPayouts />} />
      <Route path="/payout-detail" element={<AdminPayoutDetails />} />
      <Route path="/vendor-detailPage" element={<DetailPage />} />
      <Route path="/category" element={<CategoryShow />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/section" element={<SectionShow />} />
      <Route path="/add-section" element={<AddSection />} />
      <Route path="/banner" element={<Banner />} />
      <Route path="/subCategory" element={<SubCategory />} />
      <Route path='/clouds' element={<Clouds />} />
      <Route path='/add-clouds' element={<AddClouds/>}/>
      <Route path="/add-subCategory" element={<AddSubCategory />} />
    </Routes>
  );
}

export default AdminRoutes
