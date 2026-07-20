import { StockTableItem } from "@/types/StockTableItem";

export const mockStocks: StockTableItem[] = [
    {
        ticker: "FPT",
        companyName: "FPT Corporation",
        currentPrice: 124500,
        changePercent: 2.31,
        volume: 1200000,
        marketCap: 182500000000,
    },
    {
        ticker: "VCB",
        companyName: "Vietcombank",
        currentPrice: 89500,
        changePercent: -0.85,
        volume: 860000,
        marketCap: 520000000000,
    },
    {
        ticker: "HPG",
        companyName: "Hoa Phat Group",
        currentPrice: 31500,
        changePercent: 1.15,
        volume: 2100000,
        marketCap: 198000000000,
    },
    {
        ticker: "MWG",
        companyName: "Mobile World",
        currentPrice: 68200,
        changePercent: -1.42,
        volume: 970000,
        marketCap: 99000000000,
    },
];