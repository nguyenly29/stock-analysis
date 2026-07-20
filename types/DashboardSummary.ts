// Định nghĩa kiểu dữ liệu trong model DashboardSummary của backend
export interface DashboardSummary {
    totalStocks: number;
    gainers: number;
    losers: number;
    totalVolume: number;
    totalMarketCap: number;
}