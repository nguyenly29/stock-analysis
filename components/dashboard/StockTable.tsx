"use client";

import { useState } from "react";
import styles from "./StockTable.module.css";
import StockTableRow from "./StockTableRow";
import { mockStocks } from "@/data/mock-stocks";

export default function StockTable() {
    const [isLive, setIsLive] = useState(true);
    const [lastUpdate] = useState<Date | null>(null);
    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h2>Stock Market</h2>
                    <p className={styles.lastUpdate}>
                        Last update:
                        {" "}
                        {lastUpdate
                            ? lastUpdate.toLocaleTimeString()
                            : "--:--:--"}
                    </p>
                </div>
                <div className={styles.livePanel}>
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
                </div>
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
                        {mockStocks.map((stock) => (
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