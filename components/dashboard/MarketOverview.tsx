"use client";

import { useState, useEffect } from "react";
import styles from "./MarketOverview.module.css";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import ChartTooltip from "./ChartTooltip";
import { MarketHistory } from "@/types/MarketHistory";
import { Link } from "lucide-react";
import { getIndexes, getIndexesHistory } from "@/services/market.service";
import { MarketIndexItem } from "@/types/MarketIndexItem";
export default function MarketOverview() {
    const [history, setHistory] = useState<MarketHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [indexes, setIndexes] = useState<MarketIndexItem[]>([]);
    useEffect(() => {
    const fetchHistory = async () => {
        try {
            // const data = await api.get<MarketHistory[]>("/Market/history"); // data history
            // const indexesData =  await api.get<MarketHistory[]>("/Market/Indexes");
            // setHistory(data.data);
            // setIndexes(indexes.data);
            const historyData = await getIndexesHistory();
            const indexesData = await getIndexes();
            setHistory(historyData);
            setIndexes(indexesData);
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
        value: item.value
    }));
    const vnIndex = indexes.find(item => item.symbol === "VNINDEX");
    const isUp = (vnIndex?.change ?? 0) >= 0;
    const lineColor = isUp? "var(--color-up)": "var(--color-down)";
    console.log(chartData)
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
                <div className={styles.title}>
                    <Link size={25}/>
                    <h2>Tổng quan thị trường</h2>
                </div>

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
                            width={45}
                            axisLine={false}
                            domain={["auto", "auto"]}
                        />

                        <Tooltip  content={<ChartTooltip />} cursor={{stroke:"var(--color-up)", strokeWidth:1}}/>

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={lineColor}
                            strokeWidth={3}
                            fill="url(#priceGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>           
            </div>
        </section>
    );
}