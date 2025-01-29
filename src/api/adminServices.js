import { apiService } from "./axiosAdmin";


export const getVendors = async (status, page, limit, search) => {
    try {
        const response = await apiService.get(`admin/get-vendors?status=${status}&page=${page}&limit=${limit}&search=${search}`);
        return response;
    } catch (error) {
        console.error("Error get vendors: ", error);
        throw error;
    }
}

export const takeAction = async (data, action) => {
    try {
        const response = await apiService.post(`admin/take-action?action=${action}`, data);
        return response;
    } catch (error) {
        console.error("Error take-action: ", error);
        throw error;
    }
};

export const getVendorProducts = async (status, page, limit, search, vendorId) => {
    try {
        const response = await apiService.get(`admin/get-vendor-products?status=${status}&page=${page}&limit=${limit}&search=${search}&vendorId=${vendorId}`);
        return response;
    } catch (error) {
        console.error("Error get vendors: ", error);
        throw error;
    }
}

export const productAction = async (data) => {
    try {
        console.log("Data to be sent:", data);
        
        const response = await apiService.post(`admin/product-action`, data);
        return response;
    } catch (error) {
        console.error("Error take-product-action: ", error);
        throw error;
    }
};

export const updateCommission = async (data) => {
    try {
        const response = await apiService.post(`admin/change-commission`, data);
        return response;
    } catch (error) {
        console.error("Error change-commission: ", error);
        throw error;
    }
};
export const addAdminSection = async (data) => {
    console.log(data);
    
  try {
    const response = await apiService.post(
      `/admin/section-handle?section=${data?.status}`,
      data
    );
    return response;
  } catch (error) {
  
    throw error;
  }
};

export const getSection = async (

  page,
 
) => {
  try {
    const response = await apiService.get(
      `/admin/get-all-sections?page=${page}`
    );
    return response;
  } catch (error) {
    console.error("Error get vendors: ", error);
    throw error;
  }
};
export const getBanner = async (page) => {
  try {
    const response = await apiService.get(
      `/admin/get-all-banners?page=${page}`
    );
    return response;
  } catch (error) {
    console.error("Error get vendors: ", error);
    throw error;
  }
};
export const getCategory = async (page) => {
  try {
    const response = await apiService.get(`/admin/get-all-categories?page=${page}`);
    return response;
  } catch (error) {
    console.error("Error get vendors: ", error);
    throw error;
  }
};
export const addAdminCategory = async (data) => {
  console.log(data);

  try {
    const response = await apiService.post(
      `/admin/category-action?category=${data?.status}`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getCategoryForBanner = async () => {
  try {
    const response = await apiService.get(`/admin/get-categories`);
    return response;
  } catch (error) {
    console.error("Error get vendors: ", error);
    throw error;
  }
};
export const getSections = async (search) => {
  try {
    const response = await apiService.get(
      `/admin/get-sections?search=${search}`
    );
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};
export const getSearchProduct = async (search) => {

  try {
    const response = await apiService.get(
      `/admin/get-products?search=${search}`
    );
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};
export const getSearchCategory = async (search, sectionId) => {
  try {
    const response = await apiService.get(
      `/admin/get-categories?search=${search}&section=${sectionId}`
    );
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};
export const getSearchSubcategory = async (search, sectionId) => {
  try {
    const response = await apiService.get(
      `/admin/get-sub-categories?search=${search}&category=${sectionId}`
    );
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};
export const addAdminBanner = async (data) => {
  console.log(data);

  try {
    const response = await apiService.post(
      `/admin/banner-action?action=${data?.action}`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const getPayouts = async (page, search, status) => {
  try {
    const response = await apiService.get(
      `/admin/get-payouts?search=${search}&status=${status}&page=${page}`
    );
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};

export const getSubCategories = async (page) => {
  try {
    const response = await apiService.get(`/admin/get-all-sub-categories?page=${page}`);
    return response;
  } catch (error) {
    console.error("Error get sub categories: ", error);
    throw error;
  }
};

export const addAdminSubCategory = async (data) => {
  console.log(data);

  try {
    const response = await apiService.post(
      `/admin/subCategory-action?action=${data?.action}`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPayoutDetails = async (status, vendorId, page) => {
  try {
    const response = await apiService.get(
      `/admin/get-payout-details?status=${status}&page=${page}&vendorId=${vendorId}`
    );
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};
export const getAmountDetail = async (status, vendorId, type) => {
  try {
    const response = await apiService.get(
      `/admin/get-vendor-amount-details?status=${status}&type=${type}&vendorId=${vendorId}`
    );
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};
export const addAdminPayout = async (data) => {
  console.log(data);

  try {
    const response = await apiService.post(
      `/admin/pay-amount`,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDashboardStatistics = async (filter) => {
  try {
    const response = await apiService.get(
      `/admin/get-dashboard-stats?filter=${filter}`
    );
    return response;
  } catch (error) {
    console.error("Error get-dashboard-statistics: ", error);
    throw error;
  }
};

export const getAdminDashboardGraph = async (status) => {
  try {
    const response = await apiService.get(
      `/admin/get-graph-data?filter=${status}`
    );
    return response;
  } catch (error) {
    console.error("Error get-dashboard-graph: ", error);
    throw error;
  }
};