import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  otpVerify,
  resendOtp,
  signUp,
  getProfile,
  updateProfile,
  updateReturnPolicy,
  getProducts,
  getCategories,
  getSections,
  getProductDetails,
  getBrands,
  addBrands,
  getSubCategories,
  addProducts,
  updateProducts,
  getVendorDashboardStatus,
  getVendorDashboardGraph,
  getVendorDashboardProduct,
  addProductQuantity,
  getVendorCoupon,
  getVendorCouponDetails,
  getVendorOrderStatistics,
  getVendorOrders,
  getVendorOrderOverview,
  updateAsPacked,
  addCoupon,
  vendorDeleteProduct,
  getVendorRevenueDetail,
  getVendorRevenue,
  getProductReviews,
  vendorAddReturnPolicy,

} from "./services";
import { uploadFile } from "./cloudinary";
import { toast } from "react-toastify";
import { apiService } from "./axios";


export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await login(payload);
      return response;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries("adminReport");
    },
    retry: 0,
  });
};

export const useOtpVerification = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await otpVerify(payload);
      return response;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries("adminReport");
    },
    retry: 0,
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await resendOtp(payload);
      return response;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries("adminReport");
    },
    retry: 0,
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await signUp(payload);
      return response;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries("adminReport");
    },
    retry: 0,
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: async () => {
      const response = await getProfile();

      return response;
    },
    retry: 0,
    staleTime: Infinity,
    refetchOnWindowFocus: true
  });
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await updateProfile(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getProfile");
    },
    retry: 0,
  });
};

export const useUpdateReturnPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await updateReturnPolicy(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getProfile");
    },
    retry: 0,
  });
};

export const useGetProducts = (limit, page, search, section) => {


  return useQuery({
    queryKey: ["getProducts", limit, page, search, section],
    queryFn: async () => {
      const response = await getProducts(limit, page, search || '', section || '');
      return response;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    // keepPreviousData: fa
  });
}

export const useGetCategories = (search) => {
  return useQuery({
    queryKey: ["getCategories", search],
    queryFn: async () => {
      const response = await getCategories(search);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true
  });
}

export const useGetSubCategories = (search, categoryId) => {

  return useQuery({
    queryKey: ["getCategories", search, categoryId],
    queryFn: async () => {
      const response = await getSubCategories(search, categoryId);
      return response;
    },
    staleTime: Infinity,
    enabled: categoryId !== `` && categoryId !== null && categoryId !== undefined,
    retry: 1,
    refetchOnWindowFocus: true,
  });
};

export const useGetSections = (search) => {
  return useQuery({
    queryKey: ["getSections", search],
    queryFn: async () => {
      const response = await getSections(search);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true
  });
}

export const useGetProductDetails = (id) => {
  return useQuery({
    queryKey: ["getProductDetails", id],
    queryFn: async () => {
      const response = await getProductDetails(id);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true
  });
}

export const useImageUpload = () => {
//  alert('sdfdf')
  return useMutation({
    mutationFn: async (payload) => {
     
      
      const response = await uploadFile(payload);
      return response;
    },
  
    retry: 0,
  });
};

export const useGetBrands = (search) => {
  return useQuery({
    queryKey: ["getBrands", search],
    queryFn: async () => {
      const response = await getBrands(search);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
  });
};

export const useAddBrands = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {

      const response = await addBrands(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getBrands");
    },
    retry: 0,
  });
};

export const useAddProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await addProducts(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getBrands");
    },
    retry: 0,
  });
};
export const useUpdateProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await updateProducts(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getBrands");
    },
    retry: 0,
  });
};
export const useGetVendorDashBoardStatus = (status) => {
  return useQuery({
    queryKey: ["getVendorDashboardTop", status],
    queryFn: async () => {
      const response = await getVendorDashboardStatus(status);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useGetVendorDashBoardGraph = (status) => {
  return useQuery({
    queryKey: ["getVendorDashboardTop", status],
    queryFn: async () => {
      const response = await getVendorDashboardGraph(status);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0
  });
};
export const useGetVendorDashProducts = (page) => {
  return useQuery({
    queryKey: ["getVendorDashboardProduct", page],
    queryFn: async () => {
      const response = await getVendorDashboardProduct(page);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useAddQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await addProductQuantity(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVendorDashboardProduct");
    },
    retry: 0,
  });
};
export const useGetVendorCoupon = (page) => {
  return useQuery({
    queryKey: ["getVendorCoupon", page],
    queryFn: async () => {
      const response = await getVendorCoupon(page);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const useGetVendorCouponDetails = (page, id) => {
  return useQuery({
    queryKey: ["getVendorCouponDetails", page, id],
    queryFn: async () => {
      const response = await getVendorCouponDetails(page, id);
      return response;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const useGetVendorOrderStatistics = (status) => {
  return useQuery({
    queryKey: ["getVendorOrderStatistics", status],
    queryFn: async () => {
      const response = await getVendorOrderStatistics(status);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const useGetVendorOrders = (status, filter, page, limit,search) => {
  return useQuery({
    queryKey: ["getVendorOrders", status, filter, page, limit, search],
    queryFn: async () => {
      const response = await getVendorOrders(
        status,
        filter,
        page,
        limit,
        search
      );
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const useGetOrderOverview = (orderId) => {
  return useQuery({
    queryKey: ["getVendorOrderOverview", orderId],
    queryFn: async () => {
      const response = await getVendorOrderOverview(orderId);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const useUpdatePacked = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await updateAsPacked(payload);
      return response;
    },
    retry: 0,
  });
};
export const useAddCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await addCoupon(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVendorCoupon");
    },
  })
}
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await vendorDeleteProduct(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVendorCoupon");
    },
  });
};
export const useGetVendorRevenue = (page, status, startDate, endDate) => {
 
  return useQuery({
    queryKey: ["getVendorOrderOverview", page, status, startDate, endDate],
    queryFn: async () => {
      const response = await getVendorRevenue(page, status, startDate, endDate);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useGetVendorRevenueDetail = (page, id) => {
  return useQuery({
    queryKey: ["getVendorOrderOverview", page, id],
    queryFn: async () => {
      const response = await getVendorRevenueDetail(page, id);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const useGetProductReviews = (page, id) => {
  return useQuery({
    queryKey: ["getProductReviews", page, id],
    queryFn: async () => {
      const response = await getProductReviews(page, id);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useAddReturnPolicy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await vendorAddReturnPolicy(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVendorCoupon");
    },
  });
};
////
export const useGetVibes = (page) => {
  return useQuery({
    queryKey: ["getVibes", page],
    queryFn: async () => {
      const response = await apiService.get(`/vendor/get-vibes?page=${page}`);
      return response;
    },
    staleTime: Infinity,
    enabled:!!page,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useAddVideos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(`/vendor/add-vibes`, payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVibes");
    },
  });
};
export const useGetProductSearch = (search,page) => {
  return useQuery({
    queryKey: ["getProductReviews", search, page],
    queryFn: async () => {
      const response = await apiService.get(
        `/vendor/get-product-data?search=${search}`
      );
      return response;
    },
    staleTime: Infinity,
    enabled: !!page,

    refetchOnWindowFocus: true,
    retry: 0,
  });
};
///vendor/get-cloud-plans
export const useGetVendorCloud = (page) => {
  return useQuery({
    queryKey: ["getVendorCloud", page],
    queryFn: async () => {
      const response = await apiService.get(
        `/vendor/get-cloud-plans?page=${page}`
      );
      return response;
    },
    staleTime: Infinity,
    enabled: !!page,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
////
export const usePurchaseCloud = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/vendor/buy-cloud?paymentType=${payload?.paymentType}`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVendorCloud");
    },
  });
};
///
export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/vendor/delete-vibes`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVendorCloud");
    },
  });
};
////
export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.put(`/vendor/update-vibes`, payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVendorCloud");
    },
  });
};