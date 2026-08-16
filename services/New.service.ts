import api from "@/lib/api"
import { News } from "@/types/News"

export const getNews = async(): Promise<News[]> => {
    const res = await api.get<News[]>("/News");
    return res.data
}

export const getNewsId = async(id: string): Promise<News> => {
    const res = await api.get<News>(`/News/${id}`);
    return res.data
}

export const getNewsCategory = async (category: string): Promise<News> => {
    const res = await api.get<News>(`/News/category/${category}`);
    return res.data;
}