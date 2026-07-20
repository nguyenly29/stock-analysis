import api from "@/lib/api";
import { RealtimePrice } from "@/types/RealtimePrice";
import { StockDetail } from "@/types/StockDetail";
import { PriceHistoryPoint } from "@/types/PriceHistoryPoint";

export const getRealtimeStocks = async (): Promise<RealtimePrice[]> => {
    const response = await api.get<RealtimePrice[]>("/stocks/realtime");
    return response.data;
};

export const getStockDetail = async (
    ticker: string
): Promise<StockDetail> => {
    const response = await api.get<StockDetail>(`/stocks/${ticker}`);
    return response.data;
};

export const getStockHistory = async (
    ticker: string
): Promise<PriceHistoryPoint[]> => {
    const response = await api.get<PriceHistoryPoint[]>(`/stocks/${ticker}/history`);
    return response.data;
};