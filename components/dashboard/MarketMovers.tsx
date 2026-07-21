"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { RealtimePrice } from "@/types/RealtimePrice";
import style from "./MarketMovers.module.css";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function MarketMovers() {
    const [gainers, setGainers] = useState<RealtimePrice[]>([]);
    const [losers, setLosers] = useState<RealtimePrice[]>([]);
    const [volumes, setVolumes] = useState<RealtimePrice[]>([]);

    const fetchData = async () => {
        try {
            const [gainersRes, losersRes, volumeRes] =
                await Promise.all([
                    api.get<RealtimePrice[]>("/Dashboard/top-gainers"),
                    api.get<RealtimePrice[]>("/Dashboard/top-losers"),
                    api.get<RealtimePrice[]>("/Dashboard/top-volume"),
                ]);

            setGainers(gainersRes.data);
            setLosers(losersRes.data);
            setVolumes(volumeRes.data);
        } catch (error) {
            console.error("Load Market Movers failed:", error);
        }
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className={style.container}>

            <h2 className={style.title}>
                Biến động thị trường
            </h2>

            <div className={style.section}>
                <div className={style.sectionTitle}>
                    Lợi nhuận
                </div>
                <div className={style.headerRow}>
                    <span>Price</span>
                    <TrendingUp size={14}/>
                </div>
                <div className={style.list}>
                    {gainers.slice(0, 5).map((item) => (
                        <div key={item.ticker} className={style.row}>
                            <span className={style.ticker}>
                                {item.ticker}
                            </span>

                            <span className={style.price}>
                                {item.currentPrice.toLocaleString("vi-VN")}
                            </span>

                            <span className={style.up}>
                                +{item.changePercent.toFixed(2)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={style.section}>
                <div className={style.sectionTitle}>
                    Thua lỗ
                </div>
                <div className={style.headerRow}>
                    <span>Price</span>
                    <TrendingDown size={14}/>
                </div>
                <div className={style.list}>
                    {losers.slice(0,5).map((item) => (
                        <div className={style.row} key={item.ticker}>
                           <span className={style.ticker}>
                                {item.ticker}
                            </span>

                            <span className={style.price}>
                                {item.currentPrice.toLocaleString("vi-VN")}
                            </span>

                            <span className={style.down}>
                                {item.changePercent.toFixed(2)}%
                            </span> 
                        </div>
                    ))}
                </div>
            </div>

            <div className={style.section}>
                <div className={style.sectionTitle}>
                    Khối lượng giao dịch
                </div>
                <div className={style.list}>
                    {volumes.slice(0, 5).map((item) => (
                        <div
                            key={item.ticker}
                            className={style.row}
                        >
                            <span className={style.ticker}>
                                {item.ticker}
                            </span>

                            <span className={style.volume}>
                                {item.volume.toLocaleString("vi-VN")}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}

type CardProps = {
    title: string;
    stocks: RealtimePrice[];
    showVolume?: boolean;
};

function MarketCard({
    title,
    stocks,
    showVolume = false,
}: CardProps) {
    return (
        <div className={style.card}>
            <h3>{title}</h3>

            <div className={style.list}>
                {stocks.map((item) => (
                    <div
                        key={item.ticker}
                        className={style.row}
                    >
                        <span className={style.ticker}>
                            {item.ticker}
                        </span>

                        <span className={style.price}>
                            {item.currentPrice.toLocaleString()}
                        </span>

                        {showVolume ? (
                            <span className={style.volume}>
                                {item.volume.toLocaleString()}
                            </span>
                        ) : (
                            <span
                                className={
                                    item.changePercent >= 0
                                        ? style.up
                                        : style.down
                                }
                            >
                                {item.changePercent >= 0 ? "+" : ""}
                                {item.changePercent.toFixed(2)}%
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}