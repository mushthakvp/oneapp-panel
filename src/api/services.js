import { formatDate } from "../utils/dateFormate";
import { apiService } from "./axios";

export const login = async (data) => {
    try {
        const response = await apiService.post(`vendor/login`, data);
        return response;
    } catch (error) {
        console.error("Error login: ", error);
        throw error;
    }
};

export const otpVerify = async (data) => {
    try {
        const response = await apiService.post(`vendor/verify-otp`, data);
        return response;
    } catch (error) {
        console.error("Error otp verification: ", error);
        throw error;
    }
};

export const resendOtp = async (data) => {
    try {
        const response = await apiService.post(`vendor/resent-otp`, data);
        return response;
    } catch (error) {
        console.error("Error otp verification: ", error);
        throw error;
    }
};

export const signUp = async (data) => {
    try {
        const response = await apiService.post(`vendor/register`, data);
        return response;
    } catch (error) {
        console.error("Error register: ", error);
        throw error;
    }
};

export const getProfile = async (state) => {
    try {
        const response = await apiService.get(`vendor/get-profile`);
        return response;
    } catch (error) {
        console.error("Error get profile: ", error);
        throw error;
    }
}

export const updateProfile = async (payload) => {
    try {
        const response = await apiService.post(`vendor/update-profile`, payload);
        return response;
    } catch (error) {
        console.error("Error update profile: ", error);
        throw error;
    }
}

export const updateReturnPolicy = async (payload) => {
    try {
        const response = await apiService.post(`vendor/return-policy-action`, payload);
        return response;
    } catch (error) {
        console.error("Error updateReturnPolicy: ", error);
        throw error;
    }
}

export const getProducts = async (limit, page, search, section) => {
    try {
        const response = await apiService.get(`vendor/get-products?limit=${limit}&page=${page}&search=${search}&section=${section}`);
        return response;
    } catch (error) {
        console.error("Error get-products: ", error);
        throw error;
    }
}

export const getCategories = async (search) => {
    try {
        const response = await apiService.get(`vendor/get-category?search=${search}`);
        return response;
    } catch (error) {
        console.error("Error get-category: ", error);
        throw error;
    }
}

export const getSubCategories = async (search, categoryId) => {
  try {
    const response = await apiService.get(
      `/vendor/get-sub-category?search=${search}&category=${categoryId}`
    );
    return response;
  } catch (error) {
    console.error("Error get-category: ", error);
    throw error;
  }
};

export const getSections = async (search) => {
    try {
        const response = await apiService.get(`vendor/get-sections?search=${search}`);
        return response;
    } catch (error) {
        console.error("Error get-sections: ", error);
        throw error;
    }
}

export const getProductDetails = async (id) => {
    try {
        const response = await apiService.get(`vendor/get-productDetails?id=${id}`);
        return response;
    } catch (error) {
        console.error("Error get-productDetails: ", error);
        throw error;
    }
}

export const getBrands = async (search) => {
  try {
    const response = await apiService.get(`/vendor/get-brands?search=${search}`);
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};

export const addBrands = async (payload) => {
  try {
    const response = await apiService.post(`/vendor/add-brand`, payload);
    return response;
  } catch (error) {
    console.error("Error updateReturnPolicy: ", error);
    throw error;
  }
};

export const addProducts = async (payload) => {
  try {
    const response = await apiService.post(`/vendor/add-product`, payload);
    return response;
  } catch (error) {
    console.error("Error updateReturnPolicy: ", error);
    throw error;
  }
};
export const updateProducts = async (payload) => {
  try {
    const response = await apiService.put(`/vendor/update-product`, payload);
    return response;
  } catch (error) {
    console.error("Error updateReturnPolicy: ", error);
    throw error;
  }
};
export const getVendorDashboardStatus = async (status) => {
  try {
    const response = await apiService.get(
      `/vendor/get-dashboard-stats?filter=${status}`
    );
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};
export const getVendorDashboardGraph = async (status) => {
  try {
    const response = await apiService.get(
      `/vendor/get-graph-data?filter=${status}`
    );
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};
export const getVendorDashboardProduct = async (page) => {
  try {
    const response = await apiService.get(
      `/vendor/get-below-stock-products?page=${page}`
    );
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};
export const addProductQuantity = async (payload) => {
  try {
    const response = await apiService.post(`/vendor/add-quantity`, payload);
    return response;
  } catch (error) {
    console.error("Error updateReturnPolicy: ", error);
    throw error;
  }
};
export const getVendorCoupon = async (page) => {
  try {
    const response = await apiService.get(`/vendor/get-coupon?page=${page}`);
    return response;
  } catch (error) {
    console.error("Error get-sections: ", error);
    throw error;
  }
};

export const getVendorCouponDetails = async (page, id) => {
  try {
    const response = await apiService.get(`/vendor/get-coupon-overview?page=${page}&id=${id}`);
    return response;
  } catch (error) {
    console.error("Error get-coupon-overview: ", error);
    throw error;
  }
};

export const getVendorOrderStatistics = async (status) => {
  try {
    const response = await apiService.get(
      `/vendor/get-order-stats?filter=${status}`
    );
    return response;
  } catch (error) {
    console.error("Error get-order-stats: ", error);
    throw error;
  }
};

export const addCoupon = async (payload) => {
  try {
    const response = await apiService.post(`/vendor/coupon-action`, payload);
    return response;
  } catch (error) {
    console.error("Error updateReturnPolicy: ", error);
    throw error;
  }
};

export const getVendorOrders = async (status, filter, page, limit, search) => {
  try {
    const response = await apiService.get(
      `/vendor/get-orders?filter=${filter}&status=${status}&page=${page}&limit=${limit}&search=${search}`
    );
    return response;
  } catch (error) {
    console.error("Error get-orders: ", error);
    throw error;
  }
};

export const getVendorOrderOverview = async (orderId) => {
  try {
    const response = await apiService.get(
      `/vendor/order-overview?orderId=${orderId}`
    );
    return response;
  } catch (error) {
    console.error("Error order-overview: ", error);
    throw error;
  }
};

export const updateAsPacked = async (payload) => {
  try {
      const response = await apiService.post(`vendor/mark-as-packed`, payload);
      return response;
  } catch (error) {
      console.error("Error mark-as-packed: ", error);
      throw error;
  }
}

export const vendorDeleteProduct = async (payload) => {
  try {
    const response = await apiService.post(`/vendor/delete-product`, payload);
    return response;
  } catch (error) {
    console.error("Error updateReturnPolicy: ", error);
    throw error;
  }
};

export const getVendorRevenue = async (page, status, startDate, endDate) => {
  // console.log(startDate, "{{{{{{{{{{{{{{");
  const changedStarDate = formatDate(startDate);
  const changedEndDate = formatDate(endDate);
  console.log(changedStarDate, "{{{{{{{{{{{{{{");
  // alert("huii");
  let status1 =
    status === "Completed" ? "completed" : status === "Pending" && "pending";

  try {
    const response = await apiService.get(
      `/vendor/get-revenue-stats?page=${page}&status=${status1}&startDate=${changedStarDate}&endDate=${changedEndDate}`
    );
    return response;
  } catch (error) {
    console.error("Error order-overview: ", error);
    throw error;
  }
};

export const getVendorRevenueDetail = async (page, id) => {
  try {
    const response = await apiService.get(
      `/vendor/get-revenue-over-view?page=${page}&orderId=${id}`
    );
    return response;
  } catch (error) {
    console.error("Error order-overview: ", error);
    throw error;
  }
};

export const getProductReviews = async (page, productId) => {
  try {
    const response = await apiService.get(
      `/vendor/get-product-review?id=${productId}&page=${page}`
    );
    return response;
  } catch (error) {
    console.error("Error order-overview: ", error);
    throw error;
  }
};
export const vendorAddReturnPolicy = async (payload) => {
  try {
    const response = await apiService.post(
      `/vendor/return-policy-action`,
      payload
    );
    return response;
  } catch (error) {
    console.error("Error updateReturnPolicy: ", error);
    throw error;
  }
};
