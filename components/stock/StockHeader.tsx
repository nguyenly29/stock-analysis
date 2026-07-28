"use client";

import styles from "./StockHeader.module.css";
import { LineChart } from "lucide-react";

export default function StockHeader() {
    return (
        <section className={styles.header}>
            <div className={styles.left}>
                <div className={styles.icon}>
                    <LineChart size={26} />
                </div>

                <div>
                    <h1 className={styles.title}>
                        Stock Market
                    </h1>

                    <p className={styles.description}>
                        Explore all listed companies, market prices and trading information.
                    </p>
                </div>
            </div>
        </section>
    );
}