// Định nghĩa kiểu dữ liệu trong model StockDetail của backend
export interface StockDetail {
    ticker: string;
    companyName: string;
    sector: string;         // nganh nghe
    exchange: string;       // san giao dich

    currentPrice: number;   // gia hien tai
    openPrice: number;      // gia mo 
    previousClose: number;  // gia dong
    change: number;         // thay doi
    changePercent: number;  // phan tram thay doi
    volume: number;         // khoi luong
    

    website: string;
    description: string;
}