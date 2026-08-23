import { addActivity } from "@/services/activity.service";
import { getDisplayAction } from "@/utils/logMapping";
import axios from "axios";

const BASE_URL = "http://localhost:5109/api";
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// INTERCEPTOR: Tự động ghi log mỗi khi có request
const EXCLUDE_LOGS = [
    // '/realtime',
    // '/history',
    // '/summary',
    // '/top-gainers',
    // '/top-losers',
    // '/top-volume',
    '/ActivityLog/count',
    '/Auth/check',
];

api.interceptors.request.use(
    async (config) => {
        const url = config.url || "";
        const method = config.method?.toUpperCase() || "UNKNOWN";

        // Không log các API load trang
        if (EXCLUDE_LOGS.some((path) => url.includes(path))) {
            return config;
        }

        // Không log ActivityLog (tránh vòng lặp)
        if (url.includes('/ActivityLog')) {
            return config;
        }

        // Chỉ log các API có ý nghĩa với người dùng
        const displayText = getDisplayAction(url, method);

        // Chỉ log nếu displayText không phải fallback (tức là đã được map)
        if (!displayText.startsWith('Lấy dữ liệu /') && !displayText.startsWith('Gửi dữ liệu /')) {
            addActivity(`${method}`, displayText)
                .catch((err) => console.error("Log error:", err));
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

