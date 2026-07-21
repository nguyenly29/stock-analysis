"use client";

import styles from "./ChartTooltip.module.css";

interface ChartTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

export default function ChartTooltip({active,payload,label,}: ChartTooltipProps) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    const data = payload[0].payload;

    return (
        <div className={styles.tooltip}>
            <div className={styles.time}>
                {label}
            </div>

            <div className={styles.row}>
                <span>Open</span>
                <span>{data.open ?? "--"}</span>
            </div>

            <div className={styles.row}>
                <span>High</span>
                <span>{data.high ?? "--"}</span>
            </div>

            <div className={styles.row}>
                <span>Low</span>
                <span>{data.low ?? "--"}</span>
            </div>

            <div className={styles.row}>
                <span>Close</span>
                <span>{data.close ?? "--"}</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.row}>
                <span>Volume</span>
                <span>{data?.volume?.toLocaleString()??"0"}</span>
            </div>
        </div>
    );
}