"use client";

import { mockHistory } from "@/data/mock-history";
import styles from "./MarketOverview.module.css";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import ChartTooltip from "./ChartTooltip";
export default function MarketOverview() {
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2>Market Overview</h2>

                <div className={styles.filter}>
                    <button className={styles.active}>1D</button>
                    <button>1W</button>
                    <button>1M</button>
                    <button>1Y</button>
                </div>
            </div>

            <div className={styles.chartContainer} style={{outline:"none"}}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockHistory} margin={{top:10,right:20,left:10,bottom:10}}>
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