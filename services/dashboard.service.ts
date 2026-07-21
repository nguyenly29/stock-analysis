import api from "@/lib/api";
import { DashboardSummary } from "@/types/DashboardSummary";
import { RealtimePrice } from "@/types/RealtimePrice";

export const getSummary = async (): Promise<DashboardSummary> => {
    const response = await api.get<DashboardSummary>("/dashboard/summary");
    return response.data;
};

export const getTopGainers = async (): Promise<RealtimePrice[]> => {
    const response = await api.get<RealtimePrice[]>("/dashboard/top-gainers");
    return response.data;
};

export const getTopLosers = async (): Promise<RealtimePrice[]> => {
    const response = await api.get<RealtimePrice[]>("/dashboard/top-losers");
    return response.data;
};

export const getTopVolume = async (): Promise<RealtimePrice[]> => {
    const response = await api.get<RealtimePrice[]>("/dashboard/top-volume");
    return response.data;
};

