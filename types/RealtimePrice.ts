// Định nghĩa kiểu dữ liệu trong model RealtimePrice của backend
export interface RealtimePrice {
    ticker: string;
    companyName: string;
    currentPrice: number;
    change: number;
    changePercent: number;
    openPrice: number;
    previousClose: number;
    volume: number;
    marketCap: number;
    updatedAt: string;
}