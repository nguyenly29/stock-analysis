// Định nghĩa kiểu dữ liệu trong model PriceHistory của backend
export interface PriceHistoryPoint {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}