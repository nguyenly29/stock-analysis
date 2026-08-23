import api from "@/lib/api";

// Ghi log
export const addActivity = async(action: string, detail: string)=>{
    await api.post('/v1/ActivityLog', {detail, action});
};

// Lấy danh sách log
export const getActivities = async (limit: number = 100) => {
    const res = await api.get(`/v1/ActivityLog?limit=${limit}`);
    return res.data;
};

// Đếm số log
export const getActivityCount = async () => {
    const res = await api.get('/v1/ActivityLog/count');
    return res.data.count;
};

// Xoa log
export const clearActivity = async() => {
    await api.delete('/v1/ActivityLog');
};