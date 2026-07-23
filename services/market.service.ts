import { MarketIndexItem } from "@/types/MarketIndexItem";
import api from "@/lib/api";
import { MarketHistory } from "@/types/MarketHistory";

export const getIndexes = async (): Promise<MarketIndexItem[]> => {
    const respone = await api.get<MarketIndexItem[]>("/Market/indexes");
    return respone.data
}

export const getIndexesHistory = async (): Promise<MarketHistory[]> => {
    const respone = await api.get<MarketHistory[]>("/Market/history");
    return respone.data;
}