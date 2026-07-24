// Định nghĩa kiểu dữ liệu trong model StockDetail của backend
export interface StockDetail {
    ticker: string;
    companyName: string;
    sector: string;
    exchange: string;

    currentPrice: number;
    openPrice: number;
    previousClose: number;
    change: number;
    changePercent: number;
    volume: number;
    

    website: string;
    description: string;
}