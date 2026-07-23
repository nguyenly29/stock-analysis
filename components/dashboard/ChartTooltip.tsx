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

            <div className={styles.divider}></div>

            <div className={styles.row}>
                <span>Market Value</span>
                <span>{data?.value?.toLocaleString()??"--"}</span>
            </div>
        </div>
    );
}