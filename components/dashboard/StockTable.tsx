"use client";

import { useEffect, useState } from "react";
import styles from "./StockTable.module.css";
import StockTableRow from "./StockTableRow";
import { Link } from "lucide-react";
import { RealtimePrice } from "@/types/RealtimePrice";
import { getRealtimeStocks } from "@/services/stock.service";

export default function StockTable() {
    const [isLive, setIsLive] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [stocks, setStocks] = useState<RealtimePrice[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect (() => {
        const fetchStocks = async() => {
            try {
                const data = await getRealtimeStocks();
                setStocks(data);
                if(data.length > 0){
                    setLastUpdate(new Date(data[0].updatedAt));
                }
            } catch (error){
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStocks();
    }, []);
    if(loading){
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <div className={styles.title}>
                            <Link/>
                            <h2>Thị trường chứng khoán</h2>
                        </div>
                        <div className={styles.loading}>
                            Đang tải dữ liệu...
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div>
                    <div className={styles.title}>
                        <Link/>
                        <h2>Thị trường chứng khoán</h2>
                    </div>
                    
                    <p className={styles.lastUpdate}>
                        Last update:
                        {" "}
                        {lastUpdate
                            ? lastUpdate.toLocaleTimeString()
                            : "--:--:--"}
                    </p>
                </div>
                {/* <div className={styles.livePanel}>
                    <span className={styles.liveStatus}>
                        <span
                            className={`${styles.dot} ${
                                isLive
                                    ? styles.online
                                    : styles.offline
                            }`}
                        />
                        {isLive ? "Live" : "Offline"}
                    </span>
                    <button
                        className={`${styles.toggle} ${
                            isLive
                                ? styles.toggleOn
                                : styles.toggleOff
                        }`}
                        onClick={() => setIsLive(!isLive)}
                    >
                        {isLive ? "ON" : "OFF"}
                    </button>
                </div> */}
            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Change</th>
                            <th>Volume</th>
                            <th>Market Cap</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => (
                            <StockTableRow
                                key={stock.ticker}
                                stock={stock}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}