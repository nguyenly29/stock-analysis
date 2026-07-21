"use client";

import { PriceHistoryPoint } from "@/types/PriceHistoryPoint";
import api from "@/lib/api";
import { useState, useEffect } from "react";
import styles from "./MarketOverview.module.css";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import ChartTooltip from "./ChartTooltip";
import { Volume } from "lucide-react";
export default function MarketOverview() {
    const [history, setHistory] = useState<PriceHistoryPoint[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchHistory = async () => {
        try {
            const data = await api.get<PriceHistoryPoint[]>(
                "/Stocks/VIC/history"
            );

            setHistory(data.data);
        } catch (err) {
            console.error("Cannot load chart", err);
        } finally {
            setLoading(false);
        }
    };

        fetchHistory();
    }, []);
    const chartData = history.map(item => ({
        time: new Date(item.time).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        }),
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume
    }));
    if (loading) {
        return (
            <section className={styles.container}>
                <h2>Tổng quan thị trường</h2>
                <div className={styles.loading}>
                    Đang tải dữ liệu...
                </div>
            </section>
        );
    }
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2>Tổng quan thị trường (Giả định VIC)</h2>

                <div className={styles.filter}>
                    <button className={styles.active}>1D</button>
                    <button>1W</button>
                    <button>1M</button>
                    <button>1Y</button>
                </div>
            </div>

            <div className={styles.chartContainer} style={{outline:"none"}}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{top:10,right:20,left:10,bottom:10}}>
                        <defs>
                            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00B1A4" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#00B1A4" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            stroke="#e5e7eb"
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
                            width={45}
                            axisLine={false}
                            domain={["dataMin - 1", "dataMax + 1"]}
                        />

                        <Tooltip  content={<ChartTooltip/>}/>

                        <Area
                            type="monotone"
                            dataKey="close"
                            stroke="#00B1A4"
                            strokeWidth={3}
                            fill="url(#priceGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>           
            </div>
        </section>
    );
}