interface LogMapping {
    url: string;
    method: string;
    display: string;
}

const LOG_MAP: LogMapping[] = [
    // ActivityLog
    { url: '/ActivityLog', method: 'GET', display: 'Xem lịch sử hoạt động' },
    { url: '/ActivityLog', method: 'POST', display: 'Ghi log hoạt động' },
    { url: '/ActivityLog', method: 'DELETE', display: 'Xoa lich su hoat dong' },
    { url: '/ActivityLog/count', method: 'GET', display: 'Dem so luong log' },

    // Auth
    { url: '/Auth/login', method: 'POST', display: 'Đăng nhập' },
    { url: '/Auth/register', method: 'POST', display: 'Đăng ký tài khoản' },
    { url: '/Auth/check', method: 'GET', display: 'Kiểm tra email' },

    // Dashboard
    { url: '/Dashboard/summary', method: 'GET', display: 'Lấy dữ liệu tổng quan' },
    { url: '/Dashboard/top-gainers', method: 'GET', display: 'Lấy top cổ phiếu tăng giá' },
    { url: '/Dashboard/top-losers', method: 'GET', display: 'Lấy top cổ phiểu giảm giá' },
    { url: '/Dashboard/top-volume', method: 'GET', display: 'Lấy top khối lượng' },

    // Market
    { url: '/Market/indexes', method: 'GET', display: 'Lấy dữ liệu chỉ số thị trường' },
    { url: '/Market/history', method: 'GET', display: 'Lấy dữ liệu lịch sử' },

    // News
    { url: '/News', method: 'GET', display: 'Lấy danh sách tin tức' },
    { url: '/News/category', method: 'GET', display: 'Lọc tin tức theo danh mục' },

    // Stocks
    { url: '/Stocks/realtime', method: 'GET', display: 'Lấy dữ liệu cổ phiếu realtime' },
];

export const getDisplayAction = (url: string, method: string): string => {
    const tickerMatch = url.match(/\/Stocks\/([^\/?]+)/);
    if (tickerMatch && !url.includes('realtime') && !url.includes('history')) {
        const ticker = tickerMatch[1];
        if (method === 'GET') {
            return `Xem chi tiết cổ phiếu ${ticker}`;
        }
        // Method another
    }

    const newsIdMatch = url.match(/\/News\/([^\/?]+)/);
    if (newsIdMatch && !url.includes('category')) {
        const id = newsIdMatch[1];
        return `Xem chi tiết tin tức ${id}`;
    }

    const categoryMatch = url.match(/\/News\/category\/([^\/?]+)/);
    if (categoryMatch) {
        const category = decodeURIComponent(categoryMatch[1]);
        return `Lọc tin tức theo danh mục "${category}"`;
    }

    const historyMatch = url.match(/\/Stocks\/([^\/?]+)\/history/);
    if (historyMatch) {
        const ticker = historyMatch[1];
        return `Xem lịch sử giá cổ phiếu ${ticker}`;
    }

    for (const item of LOG_MAP) {
        if (url === item.url || url.startsWith(item.url + '/')) {
            if (method === item.method) {
                return item.display;
            }
        }
    }

    const methodDisplay: Record<string, string> = {
        'GET': 'Lấy dữ liệu',
        'POST': 'Gửi dữ liệu',
        'DELETE': 'Xóa',
    };
    return `${methodDisplay[method] || method} ${url}`;
};