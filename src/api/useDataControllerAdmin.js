import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getVendors,
    takeAction,
    getVendorProducts,
    productAction,
    updateCommission,
    addAdminSection,
    getSection,
    getBanner,
    getSections,
    getSearchProduct,
    getSearchCategory,
    getSearchSubcategory,
    addAdminBanner,
    getCategory,
    addAdminCategory,
    getPayouts,
    getSubCategories,
    addAdminSubCategory,
    getPayoutDetails,
    getAmountDetail,
    addAdminPayout,
    getDashboardStatistics,
    getAdminDashboardGraph,
} from "./adminServices";
import { apiService } from "./axios";


export const useGetVendors = (status, page, limit, search) => {
    return useQuery({
        queryKey: ["getVendors", status, page, limit, search],
        queryFn: async () => {
            const response = await getVendors(status, page, limit, search);
            return response;
        },
        // staleTime: Infinity,
        refetchOnWindowFocus: true,
        retry: 0,
    });
};

export const useTakeAction = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({payload, action}) => {
      const response = await takeAction(payload, action);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVendors");
    },
    retry: 0,
  });
};

export const useGetVendorProducts = (status, page, limit, search, vendorId) => {
    return useQuery({
        queryKey: ["getVendorProducts", status, page, limit, search, vendorId],
        queryFn: async () => {
            const response = await getVendorProducts(status, page, limit, search, vendorId);
            return response;
        },
      // staleTime: Infinity,
        enabled:vendorId !== undefined,
        refetchOnWindowFocus: true,
        retry: 0,
    });
};

export const useProductAction = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
        console.log("Payload:", payload);
        
      const response = await productAction(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVendorProducts");
    },
  
    retry: 0,
  });
};

export const useUpdateCommission = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({payload}) => {
      const response = await updateCommission(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getVendors");
    },
    retry: 0,
  });
};
export const useGetSection = (page) => {
  return useQuery({
    queryKey: ["getSection", page],
    queryFn: async () => {
      const response = await getSection(
    
        page,
       
      );
      return response;
    },
    // staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useAddAdminSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("Payload:", payload);
      const response = await addAdminSection(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getSection");
    },
    retry: 0,
  });
};
export const useGetCategory = (page) => {
  return useQuery({
    queryKey: ["getCategory", page],
    queryFn: async () => {
      const response = await getCategory(page);
      return response;
    },
    // staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useAddAdminCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("Payload:", payload);
      const response = await addAdminCategory(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getCategory");
    },
    retry: 0,
  });
};
export const useAddAdminBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("Payload:", payload);
      const response = await addAdminBanner(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getBanner");
    },
    retry: 0,
  });
};
export const useGetBanners = (page) => {
  return useQuery({
    queryKey: ["getBanner", page],
    queryFn: async () => {
      const response = await getBanner(page);
      return response;
    },
    // staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
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
    refetchOnWindowFocus: true,
  });
};
export const useSearchProducts = (search) => {
  
  return useQuery({
    queryKey: ["getPro", search],
    queryFn: async () => {
      const response = await getSearchProduct(search);
      return response;
    },
    staleTime: Infinity,
    retry: 1,
    refetchOnWindowFocus: true,
  });
};
export const useSearchCategory = (search, sectionId) => {
  return useQuery({
    queryKey: ["getSections", search, sectionId],
    queryFn: async () => {
      const response = await getSearchCategory(search, sectionId);
      return response;
    },
    enabled: sectionId !== "" && sectionId !== undefined,
    staleTime: Infinity,
    retry: 0,
    // refetchOnWindowFocus: true,
  });
};
export const useSearchSubcategory = (search, sectionId) => {
  
  return useQuery({
    queryKey: ["getSections", search, sectionId],
    queryFn: async () => {
      const response = await getSearchSubcategory(search, sectionId);
      return response;
    },
    enabled: sectionId !== "" && sectionId !== undefined,
    staleTime: Infinity,
    retry: 0,
    // refetchOnWindowFocus: true,
  });
};
export const useGetPayouts = (page, search, status) => {
  return useQuery({
    queryKey: ["getPayouts", page, search, status],
    queryFn: async () => {
      const response = await getPayouts(page, search, status);
      return response;
    },
    // staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const useGetSubCategory = (page) => {
  return useQuery({
    queryKey: ["getSubCategory", page],
    queryFn: async () => {
      const response = await getSubCategories(page);
      return response;
    },
    // staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const useAddAdminSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("Payload:", payload);
      const response = await addAdminSubCategory(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getSubCategory");
    },
    retry: 0,
  });
};

export const useGetPayoutDetails = (status, vendorId, page) => {
  return useQuery({
    queryKey: ["getPayouts", status, vendorId, page],
    queryFn: async () => {
      const response = await getPayoutDetails(status, vendorId, page);
      return response;
    },
    // staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useGetAmountDetails = (status, vendorId, type) => {
  return useQuery({
    queryKey: ["getPayouts", status, vendorId, type],
    queryFn: async () => {
      const response = await getAmountDetail(status, vendorId, type);
      return response;
    },
    // staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useAddPayout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("Payload:", payload);
      const response = await addAdminPayout(payload);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getPayouts");
    },
    retry: 0,
  });
};

export const useGetDashboardStatistics = (filter) => {
  return useQuery({
    queryKey: ["getDashboardStatistics", filter],
    queryFn: async () => {
      const response = await getDashboardStatistics(filter);
      return response;
    },
    // staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};

export const useGetAdminDashBoardGraph = (status) => {
  return useQuery({
    queryKey: ["getAdminDashboardGraph", status],
    queryFn: async () => {
      const response = await getAdminDashboardGraph(status);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0
  });
};
//
export const useGetAdminCloud = (page) => {
  return useQuery({
    queryKey: ["getAdminCloud", ],
    queryFn: async () => {
      const response = await apiService.get(`/admin/get-cloud-plans?page=${page}`);
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useAddClod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(`/admin/add-cloud-plan`, payload);
      return response;
    },
    onSuccess: () => {
  
      queryClient.invalidateQueries("getAdminCloud");
    },
  });
};
//
export const useGetAdminUsageHistory = (page) => {
  return useQuery({
    queryKey: ["getAdminCloudUsage"],
    queryFn: async () => {
      const response = await apiService.get(
        `/admin/get-cloud-purchase-history?page=${page}`
      );
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
////admin/get-cloud-names
export const useGetAdminCloudType = (page) => {
  return useQuery({
    queryKey: ["getAdminCloudType"],
    queryFn: async () => {
      const response = await apiService.get(
        `/admin/get-cloud-names?page=${page}`
      );
      return response;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
export const useDeleteCloud = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await apiService.post(
        `/admin/delete-cloud-plan`,
        payload
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getAdminCloud");
    },
  });
};