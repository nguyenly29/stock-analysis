import { PriceHistoryPoint } from "@/types/PriceHistoryPoint";

export const mockHistory: PriceHistoryPoint[] = [
    { time: "09:00", open: 120, high: 122, low: 119, close: 121, volume: 120000 },
    { time: "09:05", open: 121, high: 123, low: 120, close: 122, volume: 150000 },
    { time: "09:10", open: 122, high: 124, low: 121, close: 123, volume: 180000 },
    { time: "09:15", open: 123, high: 124, low: 122, close: 122, volume: 170000 },
    { time: "09:20", open: 122, high: 125, low: 121, close: 124, volume: 220000 },
    { time: "09:25", open: 124, high: 126, low: 123, close: 125, volume: 250000 },
];