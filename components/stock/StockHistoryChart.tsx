"use client";

import { getStockHistory } from "@/services/stock.service";
import { PriceHistoryPoint } from "@/types/PriceHistoryPoint";
import { useEffect, useState } from "react";
import styles from "./StockHistoryChart.module.css";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import TooltipStockHistory from "./TooltipStockHistory";
import { Link } from "lucide-react";

interface StockHistoryChartProps {
    ticker: string;
    change: number;
    companyName: string
};

export default function StockHistoryChart({ticker, change, companyName}: StockHistoryChartProps){
    const [history, setHistory] = useState<PriceHistoryPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const historyData = await getStockHistory(ticker);
                setHistory(historyData);
            } catch(error){
                console.error(error);
                setError("Không thể tải dữ liệu.");
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [ticker]);

    const chartData = history.map(item => ({
        time: new Date(item.time).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }),
        close: item.close,
        open: item.open,
        high: item.high,
        low: item.low,
        volume: item.volume
    }));

    const isUp = change >= 0;
    const lineColor = isUp ? "var(--color-up)" : "var(--color-down)";
    if(loading) return <div style={{color:"var(--text)"}}>Đang tải dữ liệu...</div>
    if (error) {
        return <div style={{color: "var(--color-danger)"}}>{error}</div>;
    }
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Link size={25}/>
                    <h2>{companyName}</h2>
                </div>
            </div>
            <div className={styles.chartContainer} style={{outline:"none"}}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{top:10,right:20,left:10,bottom:10}}>
                        <defs>
                            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={lineColor} stopOpacity={0.35} />
                                <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            stroke="var(--color-gray)"
                            strokeDasharray="3 3"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={20}
                            padding={{left:15,right:15}}
                        />

                        <YAxis
                            tickLine={false}
                            tickMargin={20}
                            width={70}
                            axisLine={false}
                            domain={["auto", "auto"]}
                        />

                        <Tooltip  content={<TooltipStockHistory />} cursor={{stroke:lineColor, strokeWidth:1}}/>

                        <Area
                            type="monotone"
                            dataKey="close"
                            activeDot={{
                                r: 3,
                                fill: lineColor,
                                stroke: "#fff",
                                strokeWidth: 2,
                            }}
                            stroke={lineColor}
                            strokeWidth={3}
                            fill="url(#priceGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>           
            </div>
        </section>
    )
}